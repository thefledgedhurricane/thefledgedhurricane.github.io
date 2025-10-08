'use client';

import type { Course, LessonWithContent } from '@/lib/lms-data';
import LessonViewer from './LessonViewer';

export default function LessonGuard({ course, lesson }: { course: Course; lesson: LessonWithContent }) {
  // Accès libre: plus de verrouillage basé sur un score de quiz.
  return <LessonViewer courseId={course.id} course={course} lesson={lesson} />;
}
