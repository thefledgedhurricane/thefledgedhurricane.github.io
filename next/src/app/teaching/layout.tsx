import type { Metadata } from 'next';
import CurriculumSidebarSSR from '@/components/lms/CurriculumSidebarSSR';
import TeachingMobileUISimple from '@/components/lms/TeachingMobileUISimple';

export const metadata: Metadata = {
  title: {
    template: '%s | Formation IA',
    default: 'Formation IA',
  },
  description: 'Apprenez l\'Intelligence Artificielle avec des parcours structurés et pédagogiques.',
};

export default function TeachingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <div className="flex">
        {/* Sidebar - masqué sur mobile, fixe sur desktop */}
        <div className="hidden lg:block w-80 fixed h-screen overflow-y-auto bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700">
          <CurriculumSidebarSSR />
        </div>

        {/* Contenu principal */}
        <div className="flex-1 lg:ml-80">
          <TeachingMobileUISimple />

          {/* Contenu des pages */}
          {children}
        </div>
      </div>
    </div>
  );
}