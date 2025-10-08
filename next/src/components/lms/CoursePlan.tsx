import Link from 'next/link';
import type { Course } from '@/lib/lms-data';

export default function CoursePlan({ course }: { course: Course }) {
  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold mb-4">Plan du cours</h2>
      <ul className="space-y-3">
        {course.lessons.map((lesson, idx) => (
          <li key={lesson.id} className="p-4 border border-gray-200 dark:border-gray-800 rounded-lg flex items-center justify-between">
            <div>
              <span className="font-medium">{idx + 1}. {lesson.title}</span>
              {lesson.durationMinutes && (
                <span className="ml-2 text-sm text-gray-500">~{lesson.durationMinutes} min</span>
              )}
            </div>
            <Link
              href={`/teaching/${course.id}/lesson/${lesson.id}`}
              className="px-4 py-2 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded"
            >
              Accéder
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}