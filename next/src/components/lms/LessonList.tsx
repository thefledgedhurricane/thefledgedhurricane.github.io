'use client';

import Link from 'next/link';
import { useMemo } from 'react';
import type { Course } from '@/lib/lms-data';
import { getCourseProgress, isLessonUnlocked, PASS_THRESHOLD } from '@/lib/lms-storage';

export default function LessonList({ course }: { course: Course }) {
  const progress = getCourseProgress(course.id);
  const lessonIds = useMemo(() => course.lessons.map(l => l.id), [course.lessons]);
  const defaultThreshold = course.passThreshold ?? PASS_THRESHOLD;
  const getThreshold = (prevId: string) => course.lessons.find(l => l.id === prevId)?.passThreshold ?? defaultThreshold;

  return (
    <ul className="space-y-3">
      {course.lessons.map((l, idx) => {
        const unlocked = isLessonUnlocked(course.id, lessonIds, l.id, getThreshold);
        const prevId = idx > 0 ? lessonIds[idx - 1] : undefined;
        const prevScore = prevId ? (progress.quizScores[prevId] ?? 0) : undefined;
        const needed = prevId ? getThreshold(prevId) : undefined;
        return (
          <li key={l.id} className="p-4 border border-gray-200 dark:border-gray-800 rounded-lg flex items-center justify-between">
            <div>
              <div className="font-medium flex items-center gap-2">
                <span>{idx + 1}. {l.title}</span>
                {!unlocked && (
                  <span className="text-xs px-2 py-0.5 rounded bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300">Verrouillé</span>
                )}
              </div>
              {l.durationMinutes && (
                <div className="text-sm text-gray-500">~{l.durationMinutes} min</div>
              )}
              {idx > 0 && (
                <div className="text-xs text-gray-500 mt-1">
                  {unlocked ? (
                    <>Déverrouillé — score précédent: {prevScore}% (seuil {needed}%).</>
                  ) : (
                    <>Requiert ≥ {needed}% au quiz de la leçon {idx} (actuel: {prevScore}%).</>
                  )}
                </div>
              )}
            </div>
            {unlocked ? (
              <Link
                href={`/teaching/${course.id}/lesson/${l.id}`}
                className="px-4 py-2 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded"
              >
                Ouvrir
              </Link>
            ) : (
              <button disabled className="px-4 py-2 text-sm bg-gray-200 text-gray-500 rounded cursor-not-allowed">Verrouillé</button>
            )}
          </li>
        );
      })}
    </ul>
  );
}
