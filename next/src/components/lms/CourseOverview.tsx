'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, 
  BookOpen, 
  Clock, 
  BarChart, 
  CheckCircle2, 
  PlayCircle, 
  ChevronDown, 
  ChevronUp,
  FileText,
  Award
} from 'lucide-react';
import FadeIn from '@/components/FadeIn';
import LessonView from './LessonView';

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
  completed?: boolean;
  content?: string | { component: () => React.ReactNode };
  details?: string;
  type?: 'video' | 'text' | 'interactive' | 'quiz';
  interactiveCategory?: 'algorithms' | 'dataStructures' | 'graphs' | 'math' | 'all';
  interactiveId?: string;
  exercises?: Exercise[];
  quiz?: QuizQuestion[];
  cheatSheet?: string;
}

interface CourseOverviewProps {
  title: string;
  description: string;
  level: string;
  duration: string;
  lessonCount: number;
  lessons: Lesson[];
  objectives: string[];
  prerequisites?: string[];
  backLink?: string;
  syllabusOnly?: boolean;
}

export default function CourseOverview({
  title,
  description,
  level,
  duration,
  lessonCount,
  lessons,
  objectives,
  prerequisites,
  backLink = "/teaching",
  syllabusOnly = false
}: CourseOverviewProps) {
  const [activeTab, setActiveTab] = useState<'content' | 'details'>('content');
  const [expandedLessonId, setExpandedLessonId] = useState<string | number | null>(null);
  const [currentLessonId, setCurrentLessonId] = useState<string | number | null>(null);

  const toggleLesson = (id: string | number) => {
    setExpandedLessonId(expandedLessonId === id ? null : id);
  };

  const startLesson = (id: string | number) => {
    setCurrentLessonId(id);
    window.scrollTo(0, 0);
  };

  const handleNextLesson = () => {
    if (!currentLessonId) return;
    const currentIndex = lessons.findIndex(l => l.id === currentLessonId);
    if (currentIndex < lessons.length - 1) {
      setCurrentLessonId(lessons[currentIndex + 1].id);
      window.scrollTo(0, 0);
    }
  };

  const handlePrevLesson = () => {
    if (!currentLessonId) return;
    const currentIndex = lessons.findIndex(l => l.id === currentLessonId);
    if (currentIndex > 0) {
      setCurrentLessonId(lessons[currentIndex - 1].id);
      window.scrollTo(0, 0);
    }
  };

  if (currentLessonId) {
    const currentLesson = lessons.find(l => l.id === currentLessonId);
    const currentIndex = lessons.findIndex(l => l.id === currentLessonId);
    
    if (currentLesson) {
      return (
        <LessonView
          courseTitle={title}
          lesson={currentLesson}
          allLessons={lessons}
          onBack={() => setCurrentLessonId(null)}
          onNext={handleNextLesson}
          onPrev={handlePrevLesson}
          hasNext={currentIndex < lessons.length - 1}
          hasPrev={currentIndex > 0}
        />
      );
    }
  }

  return (
    <main className="min-h-screen bg-white selection:bg-mckinsey-teal-100 selection:text-mckinsey-navy-900">
      {/* Header Section */}
      <div className="relative bg-mckinsey-navy-900 text-white overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-mckinsey-teal-500 rounded-full blur-3xl mix-blend-screen animate-blob" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500 rounded-full blur-3xl mix-blend-screen animate-blob animation-delay-2000" />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 py-16 lg:py-24">
          <FadeIn>
            <Link 
              href={backLink} 
              className="inline-flex items-center text-mckinsey-teal-300 hover:text-white mb-8 transition-colors group"
            >
              <ArrowLeft className="w-4 h-4 mr-2 transform group-hover:-translate-x-1 transition-transform" />
              Retour aux cours
            </Link>
            
            <div className="flex flex-col lg:flex-row lg:items-start gap-8 mb-12">
              <div className="flex-1">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full text-xs font-medium text-mckinsey-teal-200 mb-6 border border-white/10">
                  <span className="w-1.5 h-1.5 bg-mckinsey-teal-400 rounded-full animate-pulse" />
                  Module de Formation
                </div>
                <h1 className="text-4xl lg:text-5xl font-light text-white mb-6 tracking-tight">
                  {title}
                </h1>
                <p className="text-xl text-mckinsey-gray-300 max-w-2xl leading-relaxed font-light">
                  {description}
                </p>
              </div>
              
              {/* Quick Stats */}
              <div className="flex flex-wrap gap-4 lg:flex-col lg:min-w-[200px]">
                <div className="flex items-center gap-3 px-4 py-3 bg-white/5 rounded-xl border border-white/10 backdrop-blur-sm">
                  <BookOpen className="w-5 h-5 text-mckinsey-teal-400" />
                  <div>
                    <div className="text-sm text-mckinsey-gray-400">Leçons</div>
                    <div className="font-medium text-white">{lessonCount} chapitres</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 px-4 py-3 bg-white/5 rounded-xl border border-white/10 backdrop-blur-sm">
                  <Clock className="w-5 h-5 text-mckinsey-teal-400" />
                  <div>
                    <div className="text-sm text-mckinsey-gray-400">Durée</div>
                    <div className="font-medium text-white">{duration}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 px-4 py-3 bg-white/5 rounded-xl border border-white/10 backdrop-blur-sm">
                  <BarChart className="w-5 h-5 text-mckinsey-teal-400" />
                  <div>
                    <div className="text-sm text-mckinsey-gray-400">Niveau</div>
                    <div className="font-medium text-white">{level}</div>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Tabs */}
            <div className="flex gap-8 border-b border-gray-200 mb-8">
              <button
                onClick={() => setActiveTab('content')}
                className={`pb-4 px-2 font-medium text-sm tracking-wide transition-all relative ${
                  activeTab === 'content' 
                    ? 'text-mckinsey-navy-900' 
                    : 'text-gray-500 hover:text-mckinsey-navy-700'
                }`}
              >
                PROGRAMME
                {activeTab === 'content' && (
                  <div className="absolute bottom-0 left-0 w-full h-0.5 bg-mckinsey-teal-500" />
                )}
              </button>
              <button
                onClick={() => setActiveTab('details')}
                className={`pb-4 px-2 font-medium text-sm tracking-wide transition-all relative ${
                  activeTab === 'details' 
                    ? 'text-mckinsey-navy-900' 
                    : 'text-gray-500 hover:text-mckinsey-navy-700'
                }`}
              >
                DÉTAILS & PRÉREQUIS
                {activeTab === 'details' && (
                  <div className="absolute bottom-0 left-0 w-full h-0.5 bg-mckinsey-teal-500" />
                )}
              </button>
            </div>

            <FadeIn>
              {activeTab === 'content' ? (
                <div className="space-y-4">
                  {lessons.map((lesson, index) => (
                    <div 
                      key={lesson.id} 
                      className={`group bg-white rounded-xl border transition-all duration-300 overflow-hidden ${
                        expandedLessonId === lesson.id 
                          ? 'border-mckinsey-teal-200 shadow-lg ring-1 ring-mckinsey-teal-100' 
                          : 'border-gray-200 hover:border-mckinsey-teal-200 hover:shadow-md'
                      }`}
                    >
                      <div 
                        className="p-5 cursor-pointer flex items-center gap-4"
                        onClick={() => toggleLesson(lesson.id)}
                      >
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-medium text-sm transition-colors ${
                          expandedLessonId === lesson.id
                            ? 'bg-mckinsey-teal-500 text-white'
                            : 'bg-gray-50 text-gray-500 group-hover:bg-mckinsey-teal-50 group-hover:text-mckinsey-teal-600'
                        }`}>
                          {index + 1}
                        </div>
                        
                        <div className="flex-1">
                          <h3 className={`font-medium text-lg transition-colors ${
                            expandedLessonId === lesson.id ? 'text-mckinsey-navy-900' : 'text-gray-900 group-hover:text-mckinsey-teal-700'
                          }`}>
                            {lesson.title}
                          </h3>
                          <div className="flex items-center gap-4 mt-1 text-sm text-gray-500">
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {lesson.duration}
                            </span>
                            {lesson.content && typeof lesson.content === 'string' && (
                              <span className="hidden sm:inline-block text-gray-400">• {lesson.content}</span>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          {expandedLessonId === lesson.id ? (
                            <ChevronUp className="w-5 h-5 text-mckinsey-teal-500" />
                          ) : (
                            <ChevronDown className="w-5 h-5 text-gray-400 group-hover:text-mckinsey-teal-500" />
                          )}
                        </div>
                      </div>
                      
                      {expandedLessonId === lesson.id && lesson.details && (
                        <div className="px-5 pb-6 pt-2 bg-gray-50/50 border-t border-gray-100">
                          <div className="prose prose-sm max-w-none prose-headings:text-mckinsey-navy-900 prose-p:text-gray-600 prose-strong:text-mckinsey-navy-800 prose-li:text-gray-600">
                            <div className="whitespace-pre-wrap leading-relaxed">
                              {lesson.details}
                            </div>
                          </div>
                          {!syllabusOnly && (
                            <div className="mt-6 flex justify-end">
                              <button 
                                onClick={(e) => {
                                  e.stopPropagation();
                                  startLesson(lesson.id);
                                }}
                                className="inline-flex items-center px-4 py-2 bg-mckinsey-navy-900 text-white text-sm font-medium rounded-lg hover:bg-mckinsey-navy-800 transition-colors shadow-sm hover:shadow"
                              >
                                <PlayCircle className="w-4 h-4 mr-2" />
                                Commencer la leçon
                              </button>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-8">
                  {prerequisites && prerequisites.length > 0 && (
                    <div className="bg-white rounded-xl p-8 border border-gray-200 shadow-sm">
                      <h3 className="text-lg font-medium text-mckinsey-navy-900 mb-6 flex items-center gap-2">
                        <CheckCircle2 className="w-5 h-5 text-mckinsey-teal-500" />
                        Prérequis
                      </h3>
                      <ul className="space-y-4">
                        {prerequisites.map((req, i) => (
                          <li key={i} className="flex items-start gap-3 text-gray-600">
                            <div className="w-1.5 h-1.5 rounded-full bg-mckinsey-teal-400 mt-2 flex-shrink-0" />
                            {req}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  <div className="bg-white rounded-xl p-8 border border-gray-200 shadow-sm">
                    <h3 className="text-lg font-medium text-mckinsey-navy-900 mb-6 flex items-center gap-2">
                      <FileText className="w-5 h-5 text-mckinsey-teal-500" />
                      Méthodologie
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      Ce cours alterne entre théorie fondamentale et exercices pratiques. 
                      Chaque module est conçu pour renforcer vos compétences étape par étape, 
                      avec des projets concrets pour valider vos acquis.
                    </p>
                  </div>
                </div>
              )}
            </FadeIn>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm sticky top-8">
              <h3 className="text-lg font-medium text-mckinsey-navy-900 mb-6">Objectifs du cours</h3>
              <ul className="space-y-4">
                {objectives.map((obj, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-gray-600">
                    <Award className="w-4 h-4 text-mckinsey-teal-500 mt-0.5 flex-shrink-0" />
                    {obj}
                  </li>
                ))}
              </ul>
              
              {!syllabusOnly && (
                <div className="mt-8 pt-6 border-t border-gray-100">
                  <button 
                    onClick={() => startLesson(lessons[0].id)}
                    className="w-full py-3 px-4 bg-mckinsey-teal-600 text-white font-medium rounded-lg hover:bg-mckinsey-teal-700 transition-colors shadow-sm hover:shadow-md flex items-center justify-center gap-2"
                  >
                    <PlayCircle className="w-4 h-4" />
                    Commencer le cours
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
