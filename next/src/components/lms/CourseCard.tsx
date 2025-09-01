'use client';

import Link from 'next/link';
import ProgressBar from './ProgressBar';
import { getCourseCompletionPercent } from '@/lib/lms-storage';
import type { Course } from '@/lib/lms-data';

export default function CourseCard({ course }: { course: Course }) {
  const pct = getCourseCompletionPercent(course.id, course.lessons.length);
  const pill =
    course.level === 'beginner' ? 'bg-green-100 text-green-700' :
    course.level === 'intermediate' ? 'bg-yellow-100 text-yellow-700' :
    'bg-red-100 text-red-700';

  return (
    <article className="bg-white dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <span className={`px-2 py-1 text-xs rounded ${pill}`}>{course.level}</span>
        {course.category && (
          <Link
            href={`/teaching/category/${(course.category as string)
              .toLowerCase()
              .normalize('NFD')
              .replace(/[\u0300-\u036f]/g, '')
              .replace(/[^a-z0-9]+/g, '-')
              .replace(/(^-|-$)/g, '')}`}
            className="px-2 py-1 text-xs rounded bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            {course.category}
          </Link>
        )}
      </div>

      <h3 className="text-xl font-semibold mb-2">
        <Link href={`/teaching/${course.id}`}>{course.title}</Link>
      </h3>
      <p className="text-gray-600 dark:text-gray-300 mb-4">{course.description}</p>

      <div className="mb-2 text-sm text-gray-500">
        {course.lessons.length} leçon(s)
        {typeof course.estimatedHours === 'number' && (
          <span className="ml-2">• ~{course.estimatedHours} h</span>
        )}
      </div>
      {course.prerequisites && course.prerequisites.length > 0 && (
        <div className="mb-3 flex flex-wrap gap-2">
          {course.prerequisites.slice(0, 3).map((p) => (
            <span key={p} className="inline-block px-2 py-1 rounded bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 text-xs">
              Prérequis: {p}
            </span>
          ))}
          {course.prerequisites.length > 3 && (
            <span className="text-xs text-gray-500">+{course.prerequisites.length - 3} autres</span>
          )}
        </div>
      )}
      <ProgressBar percent={pct} />
      <div className="mt-4">
        <Link
          href={`/teaching/${course.id}`}
          className="inline-block px-4 py-2 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded"
        >
          Continuer
        </Link>
      </div>
    </article>
  );
}
