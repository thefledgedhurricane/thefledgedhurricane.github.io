'use client';

import Link from 'next/link';
import type { Course, LessonWithContent } from '@/lib/lms-data';
import { getCourseProgress } from '@/lib/lms-storage';

// Simple SVG icons
const ArrowLeftIcon = ({ className }: { className: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
  </svg>
);

const ArrowRightIcon = ({ className }: { className: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg>
);

const CheckCircleIcon = ({ className }: { className: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

interface LessonNavigationProps {
  course: Course;
  currentLesson: LessonWithContent;
}

export default function LessonNavigation({ course, currentLesson }: LessonNavigationProps) {
  const progress = getCourseProgress(course.id);
  const lessons = course.lessons;
  const currentIndex = lessons.findIndex(l => l.id === currentLesson.id);
  
  const previousLesson = currentIndex > 0 ? lessons[currentIndex - 1] : null;
  const nextLesson = currentIndex < lessons.length - 1 ? lessons[currentIndex + 1] : null;
  
  const isCurrentCompleted = progress.completedLessons.includes(currentLesson.id);
  const hasQuiz = currentLesson.quiz && currentLesson.quiz.length > 0;
  const quizScore = progress.quizScores[currentLesson.id];

  return (
    <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        
        {/* Previous Lesson */}
        <div className="flex-1">
          {previousLesson ? (
            <Link 
              href={`/teaching/${course.id}/lesson/${previousLesson.id}`}
              className="flex items-center p-4 rounded-lg bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors group"
            >
              <ArrowLeftIcon className="w-5 h-5 mr-3 text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300" />
              <div>
                <div className="text-sm text-gray-500 dark:text-gray-400">Précédent</div>
                <div className="font-medium text-gray-900 dark:text-white line-clamp-2">
                  {previousLesson.title}
                </div>
              </div>
            </Link>
          ) : (
            <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-800 opacity-50">
              <div className="text-sm text-gray-400">Première leçon</div>
            </div>
          )}
        </div>

        {/* Current Lesson Status */}
        <div className="flex flex-col items-center px-4">
          {isCurrentCompleted && (
            <div className="flex items-center text-green-600 dark:text-green-400 mb-2">
              <CheckCircleIcon className="w-5 h-5 mr-2" />
              <span className="text-sm font-medium">Terminé</span>
            </div>
          )}
          
          {hasQuiz && (
            <div className="text-center">
              <div className="text-sm text-gray-500 dark:text-gray-400">Score du quiz</div>
              <div className={`text-lg font-bold ${
                quizScore !== undefined 
                  ? quizScore >= 70 ? 'text-green-600' : 'text-yellow-600' 
                  : 'text-gray-400'
              }`}>
                {quizScore !== undefined ? `${quizScore}%` : 'Non fait'}
              </div>
            </div>
          )}
        </div>

        {/* Next Lesson */}
        <div className="flex-1 flex justify-end">
          {nextLesson ? (
            <Link 
              href={`/teaching/${course.id}/lesson/${nextLesson.id}`}
              className="flex items-center p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors group"
            >
              <div className="text-right">
                <div className="text-sm text-blue-600 dark:text-blue-400">Suivant</div>
                <div className="font-medium text-gray-900 dark:text-white line-clamp-2">
                  {nextLesson.title}
                </div>
              </div>
              <ArrowRightIcon className="w-5 h-5 ml-3 text-blue-500 group-hover:text-blue-600 dark:group-hover:text-blue-400" />
            </Link>
          ) : (
            <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-800 opacity-50">
              <div className="text-sm text-gray-400 text-right">Dernière leçon</div>
            </div>
          )}
        </div>
      </div>

      {/* Progress indicator */}
      <div className="mt-6">
        <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400 mb-2">
          <span>Progression du cours</span>
          <span>{currentIndex + 1} / {lessons.length}</span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
          <div 
            className="bg-blue-600 h-2 rounded-full transition-all duration-300 ease-out"
            style={{ width: `${((currentIndex + 1) / lessons.length) * 100}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
}
