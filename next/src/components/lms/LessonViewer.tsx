'use client';

import { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import type { LessonWithContent, Course } from '@/lib/lms-data';
import { markLessonCompleted } from '@/lib/lms-storage';
import Quiz from './Quiz';
import LessonNavigation from './LessonNavigation';
import dynamic from 'next/dynamic';
import mermaid from 'mermaid';

// Démos montées dynamiquement pour éviter SSR
const Demos: Record<string, any> = {
  'kmeans': dynamic(() => import('./demos/KMeansDemo'), { ssr: false }),
  'regression': dynamic(() => import('./demos/RegressionDemo'), { ssr: false }),
  'astar': dynamic(() => import('./demos/AStarDemo'), { ssr: false }),
  'ai-history': dynamic(() => import('./demos/AIHistoryDemo'), { ssr: false }),
  'supervised-learning': dynamic(() => import('./demos/SupervisedLearningDemo'), { ssr: false }),
  'clustering': dynamic(() => import('./demos/ClusteringDemo'), { ssr: false }),
  // New lightweight demos referenced in lesson Markdown
  'symbolic-reasoning': dynamic(() => import('./demos/SymbolicReasoningDemo'), { ssr: false }),
  'statistical-learning': dynamic(() => import('./demos/StatisticalLearningDemo'), { ssr: false }),
  'use-cases': dynamic(() => import('./demos/UseCasesDemo'), { ssr: false }),
  'solutions': dynamic(() => import('./demos/SolutionsDemo'), { ssr: false }),
};

export default function LessonViewer({
  courseId,
  course,
  lesson,
}: {
  courseId: string;
  course: Course;
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
    // Handle Mermaid diagrams and interactive demos
    if (loading || !content) return;

    const container = document.getElementById('lesson-html');
    if (!container) return;

    // Initialize Mermaid once
    try {
      mermaid.initialize({
        startOnLoad: false,
        theme: 'default',
        securityLevel: 'loose',
        fontFamily: 'system-ui, -apple-system, Segoe UI, Roboto, sans-serif',
      });
    } catch (e) {
      // ignore init race
    }

    // Handle Mermaid diagrams: render inline graph definitions inside elements with [data-mermaid]
    const mermaidElements = Array.from(container.querySelectorAll('[data-mermaid]')) as HTMLElement[];
    mermaidElements.forEach((el, i) => {
      const raw = (el.textContent || '').trim();
      const uid = `mermaid-${Math.random().toString(36).slice(2, 9)}-${i}`;

      const holder = document.createElement('div');
      holder.className = 'my-6 flex justify-center';
      holder.innerHTML = `
        <div class="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border w-full overflow-auto">
          <div id="${uid}" class="min-h-12"></div>
        </div>`;
      el.replaceWith(holder);

      if (!raw) {
        const target = holder.querySelector(`#${uid}`) as HTMLElement | null;
        if (target) target.innerHTML = '<div class="text-red-600 text-sm">Aucun contenu Mermaid détecté.</div>';
        return;
      }

      mermaid
        .render(uid, raw)
        .then(({ svg }) => {
          const target = holder.querySelector(`#${uid}`) as HTMLElement | null;
          if (target) target.innerHTML = svg;
        })
        .catch((err) => {
          const target = holder.querySelector(`#${uid}`) as HTMLElement | null;
          if (target)
            target.innerHTML = `<div class="text-red-600 text-sm">Erreur Mermaid: ${String(err).slice(0, 200)}</div>`;
        });
    });

    // Handle demo placeholders
    const demoPlaceholders = container.querySelectorAll('[data-demo], [data-interactive-demo]');
    const roots: any[] = [];

    demoPlaceholders.forEach((placeholder) => {
      const el = placeholder as HTMLElement;
      const demoId = el.dataset.demo || el.dataset.interactiveDemo;
      if (!demoId || !Demos[demoId]) return;

      const Comp = Demos[demoId];
      const mount = document.createElement('div');
      el.appendChild(mount);

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

      <LessonNavigation course={course} currentLesson={lesson} />
    </div>
  );
}
