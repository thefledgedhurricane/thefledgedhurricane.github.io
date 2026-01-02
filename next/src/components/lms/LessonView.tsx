'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, 
  ChevronRight, 
  ChevronLeft, 
  Menu, 
  X, 
  CheckCircle2, 
  PlayCircle,
  BookOpen,
  MessageSquare,
  Code,
  Brain,
  FileText,
  HelpCircle
} from 'lucide-react';
import FadeIn from '@/components/FadeIn';
import InteractiveDemo from '@/components/interactive/InteractiveDemo';

interface Exercise {
  id: string;
  title: string;
  description: string;
  solution?: string;
}

interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
}

interface Lesson {
  id: string | number;
  title: string;
  duration: string;
  content?: string | { component: () => React.ReactNode }; // Support both Markdown and JSX
  type?: 'video' | 'text' | 'interactive' | 'quiz';
  interactiveCategory?: 'algorithms' | 'dataStructures' | 'graphs' | 'math' | 'all';
  interactiveId?: string;
  exercises?: Exercise[];
  quiz?: QuizQuestion[];
  cheatSheet?: string;
}

interface LessonViewProps {
  courseTitle: string;
  lesson: Lesson;
  allLessons: Lesson[];
  onBack: () => void;
  onNext: () => void;
  onPrev: () => void;
  hasNext: boolean;
  hasPrev: boolean;
}

export default function LessonView({
  courseTitle,
  lesson,
  allLessons,
  onBack,
  onNext,
  onPrev,
  hasNext,
  hasPrev
}: LessonViewProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState<'theory' | 'exercises' | 'quiz' | 'cheatsheet'>('theory');
  const [selectedQuizAnswers, setSelectedQuizAnswers] = useState<Record<string, number>>({});
  const [showQuizResults, setShowQuizResults] = useState(false);
  const [expandedSolution, setExpandedSolution] = useState<string | null>(null);

  const handleQuizSubmit = () => {
    setShowQuizResults(true);
  };

  const resetQuiz = () => {
    setSelectedQuizAnswers({});
    setShowQuizResults(false);
  };

  return (
    <div className="flex h-screen bg-white overflow-hidden">
      {/* Sidebar - Lesson Navigation */}
      <div 
        className={`fixed inset-y-0 left-0 z-50 w-80 bg-mckinsey-navy-900 text-white transform transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:relative lg:translate-x-0 border-r border-mckinsey-navy-800`}
      >
        <div className="flex flex-col h-full">
          <div className="p-6 border-b border-mckinsey-navy-800">
            <button 
              onClick={onBack}
              className="flex items-center text-sm text-mckinsey-teal-300 hover:text-white transition-colors mb-4"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Retour au cours
            </button>
            <h2 className="text-lg font-light text-white leading-tight">
              {courseTitle}
            </h2>
          </div>

          <div className="flex-1 overflow-y-auto py-4">
            {allLessons.map((l, idx) => (
              <button
                key={l.id}
                onClick={() => {
                  // Logic to switch lesson would go here if we lifted state up further
                  // For now, we just show the active state
                }}
                className={`w-full px-6 py-4 flex items-start gap-3 text-left transition-colors ${
                  l.id === lesson.id 
                    ? 'bg-mckinsey-teal-900/30 border-l-4 border-mckinsey-teal-500' 
                    : 'hover:bg-mckinsey-navy-800 border-l-4 border-transparent'
                }`}
              >
                <div className={`mt-0.5 w-5 h-5 rounded-full flex items-center justify-center text-xs border ${
                  l.id === lesson.id 
                    ? 'border-mckinsey-teal-500 text-mckinsey-teal-500' 
                    : 'border-gray-600 text-gray-500'
                }`}>
                  {idx + 1}
                </div>
                <div>
                  <div className={`text-sm font-medium ${
                    l.id === lesson.id ? 'text-white' : 'text-gray-400'
                  }`}>
                    {l.title}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">{l.duration}</div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 bg-gray-50">
        {/* Top Bar */}
        <header className="bg-white border-b border-gray-200 px-6 py-4 pt-20 lg:pt-4 flex items-center justify-between sticky top-0 z-40">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="lg:hidden p-2 text-gray-500 hover:bg-gray-100 rounded-lg"
            >
              <Menu className="w-6 h-6" />
            </button>
            <h1 className="text-xl font-medium text-mckinsey-navy-900 truncate">
              {lesson.title}
            </h1>
          </div>
          
          {/* Tabs Navigation */}
          <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-lg">
            <button
              onClick={() => setActiveTab('theory')}
              className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all ${
                activeTab === 'theory' 
                  ? 'bg-white text-mckinsey-navy-900 shadow-sm' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <span className="flex items-center gap-2">
                <BookOpen className="w-4 h-4" />
                <span className="hidden sm:inline">Cours</span>
              </span>
            </button>
            <button
              onClick={() => setActiveTab('exercises')}
              className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all ${
                activeTab === 'exercises' 
                  ? 'bg-white text-mckinsey-navy-900 shadow-sm' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <span className="flex items-center gap-2">
                <Code className="w-4 h-4" />
                <span className="hidden sm:inline">Exercices</span>
              </span>
            </button>
            <button
              onClick={() => setActiveTab('quiz')}
              className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all ${
                activeTab === 'quiz' 
                  ? 'bg-white text-mckinsey-navy-900 shadow-sm' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <span className="flex items-center gap-2">
                <HelpCircle className="w-4 h-4" />
                <span className="hidden sm:inline">Quiz</span>
              </span>
            </button>
            <button
              onClick={() => setActiveTab('cheatsheet')}
              className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all ${
                activeTab === 'cheatsheet' 
                  ? 'bg-white text-mckinsey-navy-900 shadow-sm' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <span className="flex items-center gap-2">
                <FileText className="w-4 h-4" />
                <span className="hidden sm:inline">Aide-mémoire</span>
              </span>
            </button>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto p-6 lg:p-12">
          <div className="max-w-4xl mx-auto">
            <FadeIn>
              {/* Lesson Content */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden mb-8 min-h-[60vh]">
                <div className="p-8 lg:p-12">
                  
                  {activeTab === 'theory' && (
                    <>
                      {/* Type Badge */}
                      <div className="mb-6">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600 uppercase tracking-wider">
                          {lesson.type || 'Leçon théorique'}
                        </span>
                      </div>

                      {/* Content Rendering */}
                      <div className="prose prose-lg max-w-none prose-headings:text-mckinsey-navy-900 prose-p:text-gray-600 prose-a:text-mckinsey-teal-600">
                        {typeof lesson.content === 'object' && 'component' in lesson.content ? (
                          <div>{lesson.content.component()}</div>
                        ) : (
                          <div className="whitespace-pre-wrap font-light leading-relaxed">
                            {lesson.content}
                          </div>
                        )}
                      </div>

                      {/* Interactive Component Injection */}
                      {lesson.type === 'interactive' && (
                        <div className="mt-12 border-t border-gray-100 pt-8">
                          <h3 className="text-xl font-medium text-mckinsey-navy-900 mb-6 flex items-center gap-2">
                            <PlayCircle className="w-6 h-6 text-mckinsey-teal-500" />
                            Démonstration Interactive
                          </h3>
                          <div className="bg-gray-50 rounded-xl border border-gray-200 p-1">
                            <InteractiveDemo 
                              category={lesson.interactiveCategory || 'all'} 
                              className="!bg-transparent !shadow-none"
                            />
                          </div>
                        </div>
                      )}
                    </>
                  )}

                  {activeTab === 'exercises' && (
                    <div className="space-y-8">
                      <h2 className="text-2xl font-light text-mckinsey-navy-900 mb-6">Exercices Pratiques</h2>
                      {lesson.exercises && lesson.exercises.length > 0 ? (
                        lesson.exercises.map((ex, idx) => (
                          <div key={ex.id} className="border border-gray-200 rounded-xl p-6 hover:border-mckinsey-teal-200 transition-colors">
                            <div className="flex items-start gap-4">
                              <div className="w-8 h-8 rounded-full bg-mckinsey-teal-50 text-mckinsey-teal-600 flex items-center justify-center font-medium flex-shrink-0">
                                {idx + 1}
                              </div>
                              <div className="flex-1">
                                <h3 className="text-lg font-medium text-mckinsey-navy-900 mb-2">{ex.title}</h3>
                                <p className="text-gray-600 mb-4">{ex.description}</p>
                                
                                {ex.solution && (
                                  <div className="mt-4">
                                    <button 
                                      onClick={() => setExpandedSolution(expandedSolution === ex.id ? null : ex.id)}
                                      className="text-sm font-medium text-mckinsey-teal-600 hover:text-mckinsey-teal-700 flex items-center gap-2"
                                    >
                                      {expandedSolution === ex.id ? 'Masquer la solution' : 'Voir la solution'}
                                    </button>
                                    {expandedSolution === ex.id && (
                                      <div className="mt-3 p-4 bg-gray-900 rounded-lg text-gray-300 font-mono text-sm overflow-x-auto">
                                        <pre>{ex.solution}</pre>
                                      </div>
                                    )}
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="text-center py-12 text-gray-500">
                          Aucun exercice disponible pour cette leçon.
                        </div>
                      )}
                    </div>
                  )}

                  {activeTab === 'quiz' && (
                    <div className="space-y-8">
                      <h2 className="text-2xl font-light text-mckinsey-navy-900 mb-6">Quiz de validation</h2>
                      {lesson.quiz && lesson.quiz.length > 0 ? (
                        <div className="space-y-8">
                          {lesson.quiz.map((q, qIdx) => (
                            <div key={q.id} className="space-y-4">
                              <h3 className="text-lg font-medium text-mckinsey-navy-900">
                                {qIdx + 1}. {q.question}
                              </h3>
                              <div className="space-y-2">
                                {q.options.map((option, oIdx) => {
                                  const isSelected = selectedQuizAnswers[q.id] === oIdx;
                                  const isCorrect = q.correctAnswer === oIdx;
                                  const showResult = showQuizResults;
                                  
                                  let buttonClass = "w-full text-left p-4 rounded-lg border transition-all ";
                                  
                                  if (showResult) {
                                    if (isCorrect) buttonClass += "bg-green-50 border-green-200 text-green-800";
                                    else if (isSelected && !isCorrect) buttonClass += "bg-red-50 border-red-200 text-red-800";
                                    else buttonClass += "bg-white border-gray-200 text-gray-500 opacity-50";
                                  } else {
                                    if (isSelected) buttonClass += "bg-mckinsey-teal-50 border-mckinsey-teal-200 text-mckinsey-teal-800";
                                    else buttonClass += "bg-white border-gray-200 hover:border-mckinsey-teal-200 hover:bg-gray-50";
                                  }

                                  return (
                                    <button
                                      key={oIdx}
                                      disabled={showResult}
                                      onClick={() => setSelectedQuizAnswers({...selectedQuizAnswers, [q.id]: oIdx})}
                                      className={buttonClass}
                                    >
                                      <div className="flex items-center justify-between">
                                        <span>{option}</span>
                                        {showResult && isCorrect && <CheckCircle2 className="w-5 h-5 text-green-600" />}
                                        {showResult && isSelected && !isCorrect && <X className="w-5 h-5 text-red-600" />}
                                      </div>
                                    </button>
                                  );
                                })}
                              </div>
                              {showQuizResults && q.explanation && (
                                <div className="p-4 bg-blue-50 text-blue-800 rounded-lg text-sm">
                                  <strong>Explication :</strong> {q.explanation}
                                </div>
                              )}
                            </div>
                          ))}
                          
                          <div className="pt-6 border-t border-gray-100 flex justify-end gap-4">
                            {showQuizResults ? (
                              <button 
                                onClick={resetQuiz}
                                className="px-6 py-2 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50"
                              >
                                Recommencer
                              </button>
                            ) : (
                              <button 
                                onClick={handleQuizSubmit}
                                disabled={Object.keys(selectedQuizAnswers).length < lesson.quiz.length}
                                className="px-6 py-2 bg-mckinsey-navy-900 text-white font-medium rounded-lg hover:bg-mckinsey-navy-800 disabled:opacity-50 disabled:cursor-not-allowed"
                              >
                                Vérifier les réponses
                              </button>
                            )}
                          </div>
                        </div>
                      ) : (
                        <div className="text-center py-12 text-gray-500">
                          Aucun quiz disponible pour cette leçon.
                        </div>
                      )}
                    </div>
                  )}

                  {activeTab === 'cheatsheet' && (
                    <div className="space-y-6">
                      <h2 className="text-2xl font-light text-mckinsey-navy-900 mb-6">Aide-mémoire</h2>
                      {lesson.cheatSheet ? (
                        <div className="prose prose-sm max-w-none bg-yellow-50 p-8 rounded-xl border border-yellow-100 text-yellow-900 prose-headings:text-yellow-900 prose-strong:text-yellow-900 prose-code:bg-yellow-100 prose-code:text-yellow-800">
                          <div className="whitespace-pre-wrap font-mono text-sm">
                            {lesson.cheatSheet}
                          </div>
                        </div>
                      ) : (
                        <div className="text-center py-12 text-gray-500">
                          Aucun aide-mémoire disponible pour cette leçon.
                        </div>
                      )}
                    </div>
                  )}

                </div>
              </div>

              {/* Navigation Footer */}
              <div className="flex items-center justify-between gap-4">
                <button
                  onClick={onPrev}
                  disabled={!hasPrev}
                  className={`flex items-center px-6 py-3 rounded-xl border font-medium transition-all ${
                    hasPrev 
                      ? 'bg-white border-gray-200 text-gray-700 hover:border-mckinsey-teal-500 hover:text-mckinsey-teal-600 shadow-sm hover:shadow' 
                      : 'bg-gray-50 border-transparent text-gray-400 cursor-not-allowed'
                  }`}
                >
                  <ChevronLeft className="w-5 h-5 mr-2" />
                  Précédent
                </button>

                <button
                  onClick={onNext}
                  disabled={!hasNext}
                  className={`flex items-center px-6 py-3 rounded-xl font-medium transition-all shadow-sm hover:shadow-md ${
                    hasNext
                      ? 'bg-mckinsey-navy-900 text-white hover:bg-mckinsey-navy-800'
                      : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  Suivant
                  <ChevronRight className="w-5 h-5 ml-2" />
                </button>
              </div>
            </FadeIn>
          </div>
        </main>
      </div>
    </div>
  );
}
