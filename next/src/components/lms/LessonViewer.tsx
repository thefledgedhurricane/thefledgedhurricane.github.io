'use client';

import { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import type { LessonWithContent } from '@/lib/lms-data';
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
  lesson: LessonWithContent;
}) {
  const [content, setContent] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mark as completed on view
    markLessonCompleted(courseId, lesson.id);
  }, [courseId, lesson.id]);

  useEffect(() => {
    async function loadContent() {
      setLoading(true);
      try {
        if (lesson.preloadedContent) {
          // Use pre-loaded content from server
          setContent(lesson.preloadedContent);
        } else if (lesson.html) {
          // Fallback to inline HTML
          setContent(lesson.html);
        } else {
          setContent('<p>Contenu non disponible</p>');
        }
      } catch (error) {
        console.error('Error loading lesson content:', error);
        setContent('<p>Erreur de chargement du contenu</p>');
      } finally {
        setLoading(false);
      }
    }

    loadContent();
  }, [lesson.preloadedContent, lesson.html]);

  useEffect(() => {
    // monter les démos référencées par des placeholders <div data-demo="id"></div>
    if (loading || !content) return;

    const container = document.getElementById('lesson-html');
    if (!container) return;

    const demoPlaceholders = container.querySelectorAll('[data-demo]');
    const roots: any[] = [];

    demoPlaceholders.forEach((placeholder) => {
      const demoId = (placeholder as HTMLElement).dataset.demo;
      if (!demoId || !Demos[demoId]) return;

      const Comp = Demos[demoId];
      const mount = document.createElement('div');
      placeholder.appendChild(mount);

      const root = createRoot(mount);
      root.render(<Comp />);
      roots.push(root);
    });

    return () => {
      // Cleanup: unmount all demo roots
      roots.forEach(root => {
        try {
          root.unmount();
        } catch (e) {
          // ignore cleanup errors
        }
      });
    };
  }, [content, loading]);

  return (
    <div className="space-y-8">
      {/* Contenu de la leçon */}
      <div
        id="lesson-html"
        className="prose prose-gray dark:prose-invert max-w-none"
      >
        {loading ? (
          <div className="flex justify-center items-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <span className="ml-2">Chargement du contenu...</span>
          </div>
        ) : (
          <div dangerouslySetInnerHTML={{ __html: content }} />
        )}
      </div>

      {lesson.quiz && lesson.quiz.length > 0 && (
        <Quiz
          courseId={courseId}
          lessonId={lesson.id}
          questions={lesson.quiz}
        />
      )}
    </div>
  );
}
