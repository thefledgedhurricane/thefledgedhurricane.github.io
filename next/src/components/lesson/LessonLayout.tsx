import Link from 'next/link';
import { ReactNode } from 'react';

interface LessonLayoutProps {
  title: string;
  description: string;
  difficulty?: string;
  estimatedTime?: string;
  courseId: string;
  lessonId: string;
  children: ReactNode;
  prevLesson?: { id: string; title: string };
  nextLesson?: { id: string; title: string };
}

export default function LessonLayout({
  title,
  description,
  difficulty,
  estimatedTime,
  courseId,
  children,
  prevLesson,
  nextLesson,
}: LessonLayoutProps) {
  return (
    <div className="min-h-screen bg-white dark:bg-white">
      {/* Header */}
      <div className="relative bg-white dark:bg-white border-b border-gray-200 dark:border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link
            href={`/teaching/${courseId}`}
            className="inline-flex items-center text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 mb-4"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Retour au cours
          </Link>
          
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            {title}
          </h1>
          
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-4">
            {description}
          </p>
          
          <div className="flex flex-wrap gap-3 text-sm">
            {difficulty && (
              <span className="inline-flex items-center px-3 py-1.5 text-xs font-medium text-gray-700 dark:text-gray-700 bg-gray-100 dark:bg-gray-100 border border-gray-200 dark:border-gray-200">
                <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                {difficulty}
              </span>
            )}
            {estimatedTime && (
              <span className="inline-flex items-center px-3 py-1.5 text-xs font-medium text-gray-700 dark:text-gray-700 bg-gray-100 dark:bg-gray-100 border border-gray-200 dark:border-gray-200">
                <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {estimatedTime}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="prose prose-lg dark:prose-invert max-w-none">
          {children}
        </div>

        {/* Navigation */}
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-200">
          <div className="flex justify-between items-center">
            {prevLesson ? (
              <Link
                href={`/teaching/${courseId}/lesson/${prevLesson.id}`}
                className="inline-flex items-center px-4 py-2 bg-white border border-gray-200 text-gray-700 hover:border-mckinsey-navy-600 transition-all"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                <div className="text-left">
                  <div className="text-xs text-gray-500 dark:text-gray-400">Précédent</div>
                  <div className="font-medium">{prevLesson.title}</div>
                </div>
              </Link>
            ) : (
              <div />
            )}

            {nextLesson ? (
              <Link
                href={`/teaching/${courseId}/lesson/${nextLesson.id}`}
                className="inline-flex items-center px-4 py-2 bg-morocco-red-600 dark:bg-morocco-red-600 text-white dark:text-white hover:bg-morocco-red-700 dark:hover:bg-morocco-red-700 transition-all"
              >
                <div className="text-right">
                  <div className="text-xs opacity-80">Suivant</div>
                  <div className="font-medium">{nextLesson.title}</div>
                </div>
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            ) : (
              <div />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
