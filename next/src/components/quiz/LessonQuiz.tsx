'use client';

import { useState, useEffect } from 'react';
import QuizEngine from './QuizEngine';
import { getQuizzesForCourse } from '@/lib/quiz-data';
import type { QuizConfig } from './QuizEngine';

interface LessonQuizProps {
  courseId: string;
  lessonId: string;
  className?: string;
}

export default function LessonQuiz({ courseId, lessonId, className = '' }: LessonQuizProps) {
  const [availableQuizzes, setAvailableQuizzes] = useState<QuizConfig[]>([]);
  const [selectedQuiz, setSelectedQuiz] = useState<QuizConfig | null>(null);
  const [completedQuizzes, setCompletedQuizzes] = useState<Set<string>>(new Set());

  useEffect(() => {
    // Charger les quiz pour ce cours
    const quizzes = getQuizzesForCourse(courseId);
    const lessonQuizzes = quizzes.filter(quiz => quiz.lessonId === lessonId);
    setAvailableQuizzes(lessonQuizzes);

    // Charger les quiz complétés depuis localStorage
    const completed = new Set<string>();
    lessonQuizzes.forEach(quiz => {
      const score = localStorage.getItem(`quiz_${quiz.id}_score`);
      if (score && parseInt(score) >= quiz.passingScore) {
        completed.add(quiz.id);
      }
    });
    setCompletedQuizzes(completed);
  }, [courseId, lessonId]);

  const handleQuizComplete = (score: number, passed: boolean) => {
    if (selectedQuiz) {
      // Sauvegarder le score
      localStorage.setItem(`quiz_${selectedQuiz.id}_score`, score.toString());
      localStorage.setItem(`quiz_${selectedQuiz.id}_passed`, passed.toString());
      
      if (passed) {
        setCompletedQuizzes(prev => {
          const newSet = new Set(prev);
          newSet.add(selectedQuiz.id);
          return newSet;
        });
      }
    }
  };

  const startQuiz = (quiz: QuizConfig) => {
    setSelectedQuiz(quiz);
  };

  const backToQuizList = () => {
    setSelectedQuiz(null);
  };

  if (availableQuizzes.length === 0) {
    return null; // Pas de quiz pour cette leçon
  }

  if (selectedQuiz) {
    return (
      <div className={className}>
        <button
          onClick={backToQuizList}
          className="mb-4 text-blue-600 hover:text-blue-800 flex items-center"
        >
          ← Retour aux quiz
        </button>
        <QuizEngine 
          quiz={selectedQuiz} 
          onComplete={handleQuizComplete}
        />
      </div>
    );
  }

  return (
    <div className={`bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg border border-blue-200 ${className}`}>
      <div className="flex items-center mb-4">
        <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center mr-3">
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-gray-900">Quiz d&apos;Évaluation</h3>
      </div>
      
      <p className="text-gray-600 mb-6">
        Testez vos connaissances avec {availableQuizzes.length} quiz interactif{availableQuizzes.length > 1 ? 's' : ''} 
        pour cette leçon.
      </p>

      <div className="space-y-4">
        {availableQuizzes.map((quiz) => {
          const isCompleted = completedQuizzes.has(quiz.id);
          const score = localStorage.getItem(`quiz_${quiz.id}_score`);
          
          return (
            <div 
              key={quiz.id}
              className={`p-4 rounded-lg border-2 transition-all ${
                isCompleted 
                  ? 'border-green-200 bg-green-50' 
                  : 'border-gray-200 bg-white hover:border-blue-300'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center mb-2">
                    <h4 className="font-medium text-gray-900 mr-2">{quiz.title}</h4>
                    {isCompleted && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        ✓ Réussi {score && `(${score}%)`}
                      </span>
                    )}
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-3">{quiz.description}</p>
                  
                  <div className="flex items-center space-x-4 text-xs text-gray-500">
                    <span>📝 {quiz.questions.length} questions</span>
                    <span>🎯 {quiz.passingScore}% requis</span>
                    {quiz.timeLimit && <span>⏱️ {quiz.timeLimit} min</span>}
                    <span>🔄 {quiz.allowRetry ? 'Tentatives illimitées' : '1 tentative'}</span>
                  </div>
                </div>
                
                <button
                  onClick={() => startQuiz(quiz)}
                  className={`ml-4 px-4 py-2 rounded-lg font-medium transition-colors ${
                    isCompleted
                      ? 'bg-green-600 hover:bg-green-700 text-white'
                      : 'bg-blue-600 hover:bg-blue-700 text-white'
                  }`}
                >
                  {isCompleted ? 'Refaire' : 'Commencer'}
                </button>
              </div>
            </div>
          );
        })}
      </div>
      
      <div className="mt-6 p-4 bg-blue-100 rounded-lg">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <svg className="w-5 h-5 text-blue-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div className="ml-3">
            <h4 className="text-sm font-medium text-blue-900">💡 Conseils pour réussir</h4>
            <ul className="mt-2 text-sm text-blue-800 space-y-1">
              <li>• Relisez attentivement le contenu de la leçon avant de commencer</li>
              <li>• Utilisez les indices disponibles si vous êtes bloqué</li>
              <li>• Prenez votre temps pour bien comprendre chaque question</li>
              <li>• N&apos;hésitez pas à refaire le quiz pour améliorer votre score</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}