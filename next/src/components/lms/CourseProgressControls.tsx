'use client';

import { useEffect, useState, useCallback } from 'react';
import ProgressBar from './ProgressBar';
import { getCourseCompletionPercent, resetCourseProgress } from '@/lib/lms-storage';

export default function CourseProgressControls({
  courseId,
  totalLessons,
}: {
  courseId: string;
  totalLessons: number;
}) {
  const [percent, setPercent] = useState(0);

  const refresh = useCallback(() => {
    try {
      setPercent(getCourseCompletionPercent(courseId, totalLessons));
    } catch {
      setPercent(0);
    }
  }, [courseId, totalLessons]);

  useEffect(() => {
    refresh();
    // Optional: if you later dispatch custom events, you can listen here.
  }, [refresh]);

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-xl font-semibold">Progression</h2>
        <button
          onClick={() => {
            resetCourseProgress(courseId);
            refresh();
          }}
          className="px-3 py-1 text-sm border rounded hover:bg-gray-50 dark:hover:bg-gray-800"
        >
          Réinitialiser
        </button>
      </div>
      <ProgressBar percent={percent} />
    </div>
  );
}
