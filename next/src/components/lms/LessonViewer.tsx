'use client';

import { useEffect } from 'react';
import type { Lesson } from '@/lib/lms-data';
import { markLessonCompleted } from '@/lib/lms-storage';
import Quiz from './Quiz';
import dynamic from 'next/dynamic';

// Démos montées dynamiquement pour éviter SSR
const Demos: Record<string, any> = {
  'kmeans': dynamic(() => import('./demos/KMeansDemo'), { ssr: false }),
  'regression': dynamic(() => import('./demos/RegressionDemo'), { ssr: false }),
  'astar': dynamic(() => import('./demos/AStarDemo'), { ssr: false }),
};

export default function LessonViewer({
  courseId,
  lesson,
}: {
  courseId: string;
  lesson: Lesson;
}) {
  useEffect(() => {
    // Mark as completed on view
    markLessonCompleted(courseId, lesson.id);
  }, [courseId, lesson.id]);

  useEffect(() => {
    // monter les démos référencées par des placeholders <div data-demo="id"></div>
    const container = document.getElementById('lesson-html');
    if (!container) return;
    const nodes = container.querySelectorAll('[data-demo]');
    nodes.forEach((el) => {
      const id = (el as HTMLElement).dataset.demo;
      if (!id) return;
      const Comp = Demos[id];
      if (!Comp) return;
      // Créer un wrapper et y rendre le composant via React (hydrate root)
      // Ici on remplace simplement le placeholder par le composant dynamiquement rendu.
      const mount = document.createElement('div');
      el.replaceWith(mount);
      // Utiliser React 18 createRoot dynamique pour isoler
      import('react-dom/client').then((mod) => {
        const { createRoot } = mod as typeof import('react-dom/client');
        const root = createRoot(mount);
        root.render(<Comp />);
      });
    });
  }, [lesson.id, lesson.html]);

  return (
    <div>
      <div
        id="lesson-html"
        className="prose dark:prose-invert max-w-none"
        dangerouslySetInnerHTML={{ __html: lesson.html }}
      />

      {lesson.quiz && lesson.quiz.length > 0 && (
        <Quiz
          courseId={courseId}
          lessonId={lesson.id}
          questions={lesson.quiz}
        />)
      }
    </div>
  );
}
