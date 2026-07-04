'use client';

import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { 
  ArrowLeft, 
  ChevronRight, 
  ChevronLeft, 
  Menu, 
  X, 
  CheckCircle2, 
  PlayCircle,
  BookOpen,
  Code,
  FileText,
  HelpCircle,
  Lock,
  Copy,
  Check
} from 'lucide-react';
import FadeIn from '@/components/FadeIn';
import InteractiveDemo from '@/components/interactive/InteractiveDemo';
import Prism from 'prismjs';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-sql';
import 'prismjs/components/prism-json';

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
  notebookUrl?: string;
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
  completedLessonIds: string[];
  onSelectLesson: (lessonId: string | number) => void;
  onComplete: (lessonId: string | number, quizScore?: number) => void;
}

function MarkdownCodeBlock({ className, children }: { className?: string; children: string }) {
  const [copied, setCopied] = useState(false);
  const match = /language-(\w+)/.exec(className || '');
  const lang = match ? match[1] : '';
  const codeString = String(children).replace(/\n$/, '');

  const handleCopy = () => {
    navigator.clipboard.writeText(codeString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!lang) {
    return (
      <code className="px-2 py-0.5 bg-gray-100 text-mckinsey-navy-900 rounded font-mono text-sm">
        {children}
      </code>
    );
  }

  let highlightedHtml = '';
  try {
    const grammar = Prism.languages[lang] || Prism.languages.markup;
    highlightedHtml = Prism.highlight(codeString, grammar, lang);
  } catch (e) {
    highlightedHtml = codeString;
  }

  return (
    <div className="my-6 rounded-xl overflow-hidden border border-gray-200 shadow-sm">
      <div className="bg-gray-900 px-4 py-2.5 flex items-center justify-between border-b border-gray-800">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
          <span className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
          <span className="w-2.5 h-2.5 rounded-full bg-green-500" />
          <span className="text-xs text-gray-400 font-mono uppercase ml-2">{lang}</span>
        </div>
        <button
          onClick={handleCopy}
          className="text-gray-400 hover:text-white transition-colors p-1 rounded hover:bg-gray-800"
          title="Copier le code"
        >
          {copied ? (
            <span className="text-green-400 text-xs flex items-center gap-1">
              <Check className="w-3.5 h-3.5" /> Copié!
            </span>
          ) : (
            <Copy className="w-3.5 h-3.5" />
          )}
        </button>
      </div>
      <pre className="bg-gray-950 text-gray-100 p-5 overflow-x-auto m-0">
        <code 
          className={`language-${lang} font-mono text-sm block leading-relaxed`}
          dangerouslySetInnerHTML={{ __html: highlightedHtml }}
        />
      </pre>
    </div>
  );
}

function MarkdownImage({ src, alt }: { src?: string; alt?: string }) {
  return (
    <figure className="my-8 flex flex-col items-center bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img 
        src={src} 
        alt={alt} 
        className="max-h-[450px] w-auto object-contain rounded-lg transition-transform duration-300 hover:scale-[1.01]" 
      />
      {alt && (
        <figcaption className="mt-3 text-xs text-gray-500 font-light italic text-center max-w-lg border-t border-gray-100 pt-2 w-full">
          {alt}
        </figcaption>
      )}
    </figure>
  );
}

function MarkdownBlockquote({ children }: { children: React.ReactNode }) {
  return (
    <div className="my-6 p-5 bg-blue-50/50 border-l-4 border-mckinsey-teal-500 rounded-r-xl text-mckinsey-navy-900 text-base leading-relaxed">
      {children}
    </div>
  );
}

const markdownComponents = {
  code({ node, inline, className, children, ...props }: any) {
    if (inline) {
      return (
        <code className="px-2 py-0.5 bg-gray-100 text-mckinsey-navy-900 rounded font-mono text-sm" {...props}>
          {children}
        </code>
      );
    }
    return <MarkdownCodeBlock className={className}>{String(children)}</MarkdownCodeBlock>;
  },
  img({ src, alt }: any) {
    return <MarkdownImage src={src} alt={alt} />;
  },
  blockquote({ children }: any) {
    return <MarkdownBlockquote>{children}</MarkdownBlockquote>;
  }
};

export default function LessonView({
  courseTitle,
  lesson,
  allLessons,
  onBack,
  onNext,
  onPrev,
  hasNext,
  hasPrev,
  completedLessonIds,
  onSelectLesson,
  onComplete,
}: LessonViewProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'theory' | 'exercises' | 'quiz' | 'cheatsheet'>('theory');
  const [selectedQuizAnswers, setSelectedQuizAnswers] = useState<Record<string, number>>({});
  const [showQuizResults, setShowQuizResults] = useState(false);
  const [expandedSolution, setExpandedSolution] = useState<string | null>(null);

  useEffect(() => {
    document.body.classList.add('lms-lesson-active');

    return () => {
      document.body.classList.remove('lms-lesson-active');
    };
  }, []);

  const quizScore = lesson.quiz?.length
    ? Math.round((lesson.quiz.filter(
      (question) => selectedQuizAnswers[question.id] === question.correctAnswer,
    ).length / lesson.quiz.length) * 100)
    : 0;

  const handleQuizSubmit = () => {
    setShowQuizResults(true);
    if (lesson.quiz?.length) {
      onComplete(lesson.id, quizScore);
    }
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
            <div className="mt-4" aria-label={`${completedLessonIds.length} leçons terminées sur ${allLessons.length}`}>
              <div className="flex items-center justify-between text-xs text-gray-400 mb-2">
                <span>Progression</span>
                <span>{completedLessonIds.length}/{allLessons.length}</span>
              </div>
              <div className="h-1 rounded-full bg-white/10 overflow-hidden">
                <div
                  className="h-full rounded-full bg-mckinsey-teal-400 transition-[width] duration-500"
                  style={{ width: `${allLessons.length ? (completedLessonIds.length / allLessons.length) * 100 : 0}%` }}
                />
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto py-4">
            {allLessons.map((l, idx) => (
              <button
                key={l.id}
                onClick={() => {
                  onSelectLesson(l.id);
                  setIsSidebarOpen(false);
                }}
                aria-current={l.id === lesson.id ? 'step' : undefined}
                className={`w-full px-6 py-4 flex items-start gap-3 text-left transition-colors ${
                  l.id === lesson.id 
                    ? 'bg-mckinsey-teal-900/30 border-l-4 border-mckinsey-teal-500' 
                    : 'hover:bg-mckinsey-navy-800 border-l-4 border-transparent'
                }`}
              >
                <div className={`mt-0.5 w-5 h-5 rounded-full flex items-center justify-center text-xs border ${
                  l.id === lesson.id 
                    ? 'border-mckinsey-teal-500 text-mckinsey-teal-500' 
                    : completedLessonIds.includes(String(l.id))
                      ? 'bg-green-500 border-green-500 text-white'
                      : 'border-gray-600 text-gray-500'
                }`}>
                  {completedLessonIds.includes(String(l.id)) ? <CheckCircle2 className="w-3.5 h-3.5" /> : idx + 1}
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

      {isSidebarOpen && (
        <button
          type="button"
          className="fixed inset-0 z-40 bg-mckinsey-navy-950/50 backdrop-blur-sm lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
          aria-label="Fermer le sommaire"
        />
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 bg-gray-50">
        {/* Top Bar */}
        <header className="bg-white border-b border-gray-200 px-4 sm:px-6 py-4 flex flex-wrap items-center gap-3 sticky top-0 z-40">
          <div className="flex min-w-0 flex-1 items-center gap-3">
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="lg:hidden p-2 text-gray-500 hover:bg-gray-100 rounded-lg"
              aria-label="Ouvrir le sommaire"
              aria-expanded={isSidebarOpen}
            >
              <Menu className="w-6 h-6" />
            </button>
            <h1 className="text-xl font-medium text-mckinsey-navy-900 truncate">
              {lesson.title}
            </h1>
          </div>
          <button
            onClick={() => onComplete(lesson.id)}
            disabled={completedLessonIds.includes(String(lesson.id))}
            className="hidden md:inline-flex items-center gap-2 px-3 py-2 mr-3 text-xs font-medium rounded-lg border border-gray-200 text-gray-600 hover:border-mckinsey-teal-300 hover:text-mckinsey-teal-700 disabled:bg-green-50 disabled:text-green-700 disabled:border-green-200 transition-colors"
          >
            <CheckCircle2 className="w-4 h-4" />
            {completedLessonIds.includes(String(lesson.id)) ? 'Terminée' : 'Marquer terminée'}
          </button>
          
          {/* Tabs Navigation */}
          <div className="order-3 md:order-none w-full md:w-auto flex items-center justify-center gap-1 bg-gray-100 p-1 rounded-lg" role="tablist" aria-label="Contenu de la leçon">
            <button
              onClick={() => setActiveTab('theory')}
              role="tab"
              aria-selected={activeTab === 'theory'}
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
              role="tab"
              aria-selected={activeTab === 'exercises'}
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
              role="tab"
              aria-selected={activeTab === 'quiz'}
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
              role="tab"
              aria-selected={activeTab === 'cheatsheet'}
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
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-12">
          <div className="max-w-4xl mx-auto">
            <FadeIn>
              {/* Lesson Content */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden mb-8 min-h-[60vh]">
                <div className="p-5 sm:p-8 lg:p-12">
                  
                  {activeTab === 'theory' && (
                    <>
                      {/* Type Badge */}
                      <div className="mb-6">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600 uppercase tracking-wider">
                          {lesson.type || 'Leçon théorique'}
                        </span>
                      </div>

                      {/* Colab Notebook Integration */}
                      {lesson.notebookUrl && (
                        <div className="mb-8 p-6 bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl border border-amber-100 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                          <div className="flex items-start gap-3.5">
                            <div className="p-2.5 bg-amber-100/50 rounded-xl text-amber-700">
                              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                              </svg>
                            </div>
                            <div>
                              <h4 className="font-semibold text-amber-950 text-base">Travaux Pratiques sur Google Colab</h4>
                              <p className="text-sm text-amber-700/80 mt-0.5">
                                Pratiquez directement dans votre navigateur avec un notebook interactif clé en main.
                              </p>
                            </div>
                          </div>
                          <a
                            href={
                              lesson.notebookUrl.startsWith('http')
                                ? lesson.notebookUrl
                                : `https://colab.research.google.com/github/thefledgedhurricane/thefledgedhurricane.github.io/blob/main/next/public${lesson.notebookUrl}`
                            }
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-medium rounded-xl shadow-sm hover:shadow transition-all text-sm flex-shrink-0"
                          >
                            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                              <path d="M12.5 5.5v3.2l3 3.8-3 3.8v3.2c4.14 0 7.5-3.36 7.5-7.5S16.64 5.5 12.5 5.5zM4 12c0 4.14 3.36 7.5 7.5 7.5v-3.2l-3-3.8 3-3.8V5.5C7.36 5.5 4 8.86 4 12z" />
                            </svg>
                            Ouvrir dans Colab
                          </a>
                        </div>
                      )}

                      {/* Content Rendering */}
                      <div className="prose prose-lg max-w-none prose-headings:text-mckinsey-navy-900 prose-p:text-gray-600 prose-a:text-mckinsey-teal-600">
                        {typeof lesson.content === 'object' && 'component' in lesson.content ? (
                          <div>{lesson.content.component()}</div>
                        ) : (
                          <ReactMarkdown components={markdownComponents}>{lesson.content || ''}</ReactMarkdown>
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
                          {showQuizResults && (
                            <div className={`rounded-xl border p-5 ${
                              quizScore >= 70
                                ? 'bg-green-50 border-green-200 text-green-800'
                                : 'bg-amber-50 border-amber-200 text-amber-800'
                            }`}>
                              <div className="text-sm font-medium">Résultat du quiz</div>
                              <div className="text-3xl font-light mt-1">{quizScore}%</div>
                              <p className="text-sm mt-2">
                                {quizScore >= 70
                                  ? 'Objectif atteint — cette leçon est validée.'
                                  : 'Revoyez les explications puis réessayez. Le seuil de validation est de 70 %.'}
                              </p>
                            </div>
                          )}
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
                  onClick={() => {
                    if (!completedLessonIds.includes(String(lesson.id))) {
                      onComplete(lesson.id);
                    }
                    onNext();
                  }}
                  disabled={!hasNext || (lesson.quiz && lesson.quiz.length > 0 && !completedLessonIds.includes(String(lesson.id)))}
                  className={`flex items-center px-6 py-3 rounded-xl font-medium transition-all shadow-sm hover:shadow-md ${
                    hasNext && (!(lesson.quiz && lesson.quiz.length > 0) || completedLessonIds.includes(String(lesson.id)))
                      ? 'bg-mckinsey-navy-900 text-white hover:bg-mckinsey-navy-800'
                      : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  {lesson.quiz && lesson.quiz.length > 0 && !completedLessonIds.includes(String(lesson.id)) ? (
                    <span className="flex items-center gap-1.5">
                      <Lock className="w-4 h-4" /> Suivant (Quiz requis)
                    </span>
                  ) : (
                    'Suivant'
                  )}
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
