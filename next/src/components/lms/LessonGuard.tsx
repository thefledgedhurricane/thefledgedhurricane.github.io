'use client';

import Link from 'next/link';
import type { Course, LessonWithContent } from '@/lib/lms-data';
import { getCourseProgress, PASS_THRESHOLD } from '@/lib/lms-storage';
import LessonViewer from './LessonViewer';

export default function LessonGuard({ course, lesson }: { course: Course; lesson: LessonWithContent }) {
  const progress = getCourseProgress(course.id);
  const lessons = course.lessons.map(l => l.id);
  const idx = lessons.indexOf(lesson.id);
  const prevId = idx > 0 ? lessons[idx - 1] : undefined;
  const defaultThreshold = course.passThreshold ?? PASS_THRESHOLD;
  const needed = prevId ? (course.lessons.find(l => l.id === prevId)?.passThreshold ?? defaultThreshold) : undefined;
  const prevScore = prevId ? (progress.quizScores[prevId] ?? 0) : undefined;
  const unlocked = idx <= 0 || (prevScore !== undefined && needed !== undefined && prevScore >= needed);

  if (!unlocked) {
    return (
      <main className="max-w-3xl mx-auto px-6 py-16">
        <h1 className="text-2xl font-semibold mb-4">Leçon verrouillée</h1>
        <p className="mb-2 text-gray-600">Vous devez obtenir au moins {needed}% au quiz de la leçon précédente pour déverrouiller celle-ci.</p>
        <p className="mb-6 text-gray-600">Score actuel: {prevScore}%</p>
        <div className="flex gap-3">
          <Link href={`/teaching/${course.id}`} className="px-4 py-2 border rounded">← Retour au cours</Link>
          {prevId && (
            <Link href={`/teaching/${course.id}/lesson/${prevId}`} className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded">Aller au quiz précédent</Link>
          )}
        </div>
      </main>
    );
  }

  return (
    <LessonViewer courseId={course.id} lesson={lesson} />
  );
}
