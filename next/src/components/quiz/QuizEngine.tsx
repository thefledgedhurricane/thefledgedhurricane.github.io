'use client';

import { useState, useEffect, useCallback } from 'react';
import { saveQuizScore } from '@/lib/lms-storage';

export interface QuizQuestion {
  id: string;
  type: 'multiple-choice' | 'code-completion' | 'true-false' | 'fill-blank' | 'ordering';
  question: string;
  explanation?: string;
  code?: string; // Pour les questions de code
  options?: string[];
  correctAnswer: string | string[] | number;
  points: number;
  difficulty: 'easy' | 'medium' | 'hard';
  tags: string[];
  hints?: string[];
}

export interface QuizConfig {
  id: string;
  title: string;
  description: string;
  courseId: string;
  lessonId: string;
  questions: QuizQuestion[];
  timeLimit?: number; // en minutes
  passingScore: number; // pourcentage requis pour réussir
  allowRetry: boolean;
  shuffleQuestions: boolean;
  showCorrectAnswers: boolean;
}

interface QuizEngineProps {
  quiz: QuizConfig;
  onComplete: (score: number, passed: boolean) => void;
  className?: string;
}

export default function QuizEngine({ quiz, onComplete, className = '' }: QuizEngineProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [timeLeft, setTimeLeft] = useState(quiz.timeLimit ? quiz.timeLimit * 60 : null);
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [usedHints, setUsedHints] = useState<Record<string, number>>({});

  const currentQuestion = quiz.questions[currentQuestionIndex];
  const totalQuestions = quiz.questions.length;
  const progress = ((currentQuestionIndex + 1) / totalQuestions) * 100;

  const calculateScore = useCallback(() => {
    let totalPoints = 0;
    let earnedPoints = 0;

    quiz.questions.forEach(question => {
      totalPoints += question.points;
      const userAnswer = answers[question.id];
      
      if (userAnswer !== undefined) {
        const hintsUsed = usedHints[question.id] || 0;
        const hintPenalty = hintsUsed * 0.1; // 10% penalty per hint
        
        let questionPoints = 0;
        
        switch (question.type) {
          case 'multiple-choice':
          case 'true-false':
            if (userAnswer === question.correctAnswer) {
              questionPoints = question.points * (1 - hintPenalty);
            }
            break;
            
          case 'fill-blank':
            const correctAnswers = Array.isArray(question.correctAnswer) 
              ? question.correctAnswer 
              : [question.correctAnswer];
            const userAnswers = Array.isArray(userAnswer) ? userAnswer : [userAnswer];
            
            const correctCount = userAnswers.filter((ans: any) => 
              correctAnswers.some((correct: any) => 
                String(ans).toLowerCase().trim() === String(correct).toLowerCase().trim()
              )
            ).length;
            
            questionPoints = (correctCount / correctAnswers.length) * question.points * (1 - hintPenalty);
            break;
            
          case 'ordering':
            const correctOrder = question.correctAnswer as string[];
            const userOrder = userAnswer as string[];
            
            // Score basé sur le nombre d'éléments dans la bonne position
            let correctPositions = 0;
            for (let i = 0; i < correctOrder.length; i++) {
              if (userOrder[i] === correctOrder[i]) {
                correctPositions++;
              }
            }
            
            questionPoints = (correctPositions / correctOrder.length) * question.points * (1 - hintPenalty);
            break;
            
          case 'code-completion':
            // Pour le code, on peut faire une vérification simple ou utiliser un système plus sophistiqué
            if (String(userAnswer).toLowerCase().includes(String(question.correctAnswer).toLowerCase())) {
              questionPoints = question.points * (1 - hintPenalty);
            }
            break;
        }
        
        earnedPoints += Math.max(0, questionPoints);
      }
    });

    const percentage = totalPoints > 0 ? (earnedPoints / totalPoints) * 100 : 0;
    return Math.round(percentage);
  }, [quiz.questions, answers, usedHints]);

  const handleQuizSubmit = useCallback(() => {
    const finalScore = calculateScore();
    const passed = finalScore >= quiz.passingScore;
    
    setScore(finalScore);
    setQuizCompleted(true);
    setShowResults(true);
    
    // Sauvegarder le score
    saveQuizScore(quiz.courseId, quiz.lessonId, finalScore);
    
    onComplete(finalScore, passed);
  }, [calculateScore, quiz.passingScore, quiz.courseId, quiz.lessonId, onComplete]);

  // Timer effect
  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    if (quizStarted && timeLeft && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev && prev <= 1) {
            handleQuizSubmit();
            return 0;
          }
          return prev ? prev - 1 : 0;
        });
      }, 1000);
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [quizStarted, timeLeft, handleQuizSubmit]);

  const startQuiz = () => {
    setQuizStarted(true);
    setTimeLeft(quiz.timeLimit ? quiz.timeLimit * 60 : null);
  };

  const handleAnswer = (answer: any) => {
    setAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: answer
    }));
  };

  const showHint = (questionId: string) => {
    setUsedHints(prev => ({
      ...prev,
      [questionId]: (prev[questionId] || 0) + 1
    }));
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      handleQuizSubmit();
    }
  };

  const previousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const renderQuestion = (question: QuizQuestion) => {
    const userAnswer = answers[question.id];
    const hintsUsed = usedHints[question.id] || 0;
    const availableHints = question.hints?.length || 0;

    switch (question.type) {
      case 'multiple-choice':
        return (
          <div className="space-y-3">
            {question.options?.map((option, index) => (
              <label key={index} className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                <input
                  type="radio"
                  name={question.id}
                  value={option}
                  checked={userAnswer === option}
                  onChange={(e) => handleAnswer(e.target.value)}
                  className="text-blue-600 focus:ring-blue-500"
                />
                <span className="text-gray-700">{option}</span>
              </label>
            ))}
          </div>
        );

      case 'true-false':
        return (
          <div className="space-y-3">
            {['Vrai', 'Faux'].map((option) => (
              <label key={option} className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                <input
                  type="radio"
                  name={question.id}
                  value={option}
                  checked={userAnswer === option}
                  onChange={(e) => handleAnswer(e.target.value)}
                  className="text-blue-600 focus:ring-blue-500"
                />
                <span className="text-gray-700">{option}</span>
              </label>
            ))}
          </div>
        );

      case 'fill-blank':
        const blanks = Array.isArray(question.correctAnswer) ? question.correctAnswer.length : 1;
        return (
          <div className="space-y-3">
            {Array.from({ length: blanks }, (_, index) => (
              <div key={index}>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Réponse {blanks > 1 ? index + 1 : ''}:
                </label>
                <input
                  type="text"
                  value={Array.isArray(userAnswer) ? userAnswer[index] || '' : userAnswer || ''}
                  onChange={(e) => {
                    const newAnswer = Array.isArray(userAnswer) ? [...userAnswer] : [];
                    newAnswer[index] = e.target.value;
                    handleAnswer(blanks > 1 ? newAnswer : e.target.value);
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Tapez votre réponse..."
                />
              </div>
            ))}
          </div>
        );

      case 'code-completion':
        return (
          <div className="space-y-3">
            {question.code && (
              <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto">
                <code>{question.code}</code>
              </pre>
            )}
            <textarea
              value={userAnswer || ''}
              onChange={(e) => handleAnswer(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono"
              rows={6}
              placeholder="Complétez le code..."
            />
          </div>
        );

      default:
        return <div>Type de question non supporté</div>;
    }
  };

  if (!quizStarted) {
    return (
      <div className={`max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg ${className}`}>
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">{quiz.title}</h2>
          <p className="text-gray-600 mb-6">{quiz.description}</p>
          
          <div className="bg-blue-50 p-4 rounded-lg mb-6">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium">Questions:</span> {totalQuestions}
              </div>
              <div>
                <span className="font-medium">Score requis:</span> {quiz.passingScore}%
              </div>
              {quiz.timeLimit && (
                <div>
                  <span className="font-medium">Temps limite:</span> {quiz.timeLimit} minutes
                </div>
              )}
              <div>
                <span className="font-medium">Tentatives:</span> {quiz.allowRetry ? 'Illimitées' : '1 seule'}
              </div>
            </div>
          </div>
          
          <button
            onClick={startQuiz}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
          >
            Commencer le Quiz
          </button>
        </div>
      </div>
    );
  }

  if (showResults) {
    const passed = score >= quiz.passingScore;
    
    return (
      <div className={`max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg ${className}`}>
        <div className="text-center">
          <div className={`w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-4 ${
            passed ? 'bg-green-100' : 'bg-red-100'
          }`}>
            {passed ? (
              <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            ) : (
              <svg className="w-10 h-10 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            )}
          </div>
          
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {passed ? 'Quiz Réussi!' : 'Quiz Échoué'}
          </h2>
          
          <div className="text-3xl font-bold mb-4">
            <span className={passed ? 'text-green-600' : 'text-red-600'}>
              {score}%
            </span>
          </div>
          
          <p className="text-gray-600 mb-6">
            {passed 
              ? 'Félicitations! Vous avez atteint le score requis.'
              : `Il vous faut au moins ${quiz.passingScore}% pour réussir.`
            }
          </p>
          
          {quiz.allowRetry && !passed && (
            <button
              onClick={() => {
                setQuizStarted(false);
                setQuizCompleted(false);
                setShowResults(false);
                setCurrentQuestionIndex(0);
                setAnswers({});
                setUsedHints({});
                setScore(0);
              }}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium mr-4"
            >
              Refaire le Quiz
            </button>
          )}
          
          <button
            onClick={() => setShowResults(false)}
            className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 font-medium"
          >
            Voir les Réponses
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg ${className}`}>
      {/* Header avec progression */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <div className="text-sm text-gray-600">
            Question {currentQuestionIndex + 1} sur {totalQuestions}
          </div>
          {timeLeft !== null && (
            <div className={`text-sm font-medium ${timeLeft < 300 ? 'text-red-600' : 'text-gray-600'}`}>
              Temps restant: {formatTime(timeLeft)}
            </div>
          )}
        </div>
        
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Question */}
      <div className="mb-8">
        <div className="flex items-start justify-between mb-4">
          <h3 className="text-xl font-semibold text-gray-900 flex-1">
            {currentQuestion.question}
          </h3>
          
          <div className="flex items-center space-x-2 ml-4">
            <span className={`px-2 py-1 text-xs rounded-full ${
              currentQuestion.difficulty === 'easy' 
                ? 'bg-green-100 text-green-800'
                : currentQuestion.difficulty === 'medium'
                ? 'bg-yellow-100 text-yellow-800'
                : 'bg-red-100 text-red-800'
            }`}>
              {currentQuestion.difficulty}
            </span>
            <span className="text-sm text-gray-500">
              {currentQuestion.points} pts
            </span>
          </div>
        </div>

        {/* Hints */}
        {currentQuestion.hints && currentQuestion.hints.length > 0 && (
          <div className="mb-4">
            <button
              onClick={() => showHint(currentQuestion.id)}
              disabled={(usedHints[currentQuestion.id] || 0) >= currentQuestion.hints.length}
              className="text-sm text-blue-600 hover:text-blue-800 disabled:text-gray-400 disabled:cursor-not-allowed"
            >
              💡 Indice ({(usedHints[currentQuestion.id] || 0)} / {currentQuestion.hints.length} utilisés)
            </button>
            
            {(usedHints[currentQuestion.id] || 0) > 0 && (
              <div className="mt-2 p-3 bg-yellow-50 border-l-4 border-yellow-400 rounded">
                <p className="text-sm text-yellow-800">
                  {currentQuestion.hints[Math.min((usedHints[currentQuestion.id] || 1) - 1, currentQuestion.hints.length - 1)]}
                </p>
              </div>
            )}
          </div>
        )}

        {renderQuestion(currentQuestion)}
      </div>

      {/* Navigation */}
      <div className="flex justify-between items-center">
        <button
          onClick={previousQuestion}
          disabled={currentQuestionIndex === 0}
          className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          ← Précédent
        </button>

        <div className="text-sm text-gray-500">
          Question {currentQuestionIndex + 1} / {totalQuestions}
        </div>

        <button
          onClick={currentQuestionIndex === totalQuestions - 1 ? handleQuizSubmit : nextQuestion}
          disabled={!answers[currentQuestion.id]}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {currentQuestionIndex === totalQuestions - 1 ? 'Terminer' : 'Suivant →'}
        </button>
      </div>
    </div>
  );
}