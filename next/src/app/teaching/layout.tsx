import type { Metadata } from 'next';
import CurriculumSidebar from '@/components/lms/CurriculumSidebar';

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
          <CurriculumSidebar className="h-full" />
        </div>

        {/* Contenu principal */}
        <div className="flex-1 lg:ml-80">
          {/* Bouton mobile pour ouvrir le sidebar */}
          <div className="lg:hidden sticky top-0 z-40 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 px-4 py-3">
            <button 
              id="mobile-sidebar-toggle"
              className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
              onClick={() => {
                const sidebar = document.getElementById('mobile-sidebar');
                if (sidebar) {
                  sidebar.classList.toggle('hidden');
                }
              }}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              <span className="font-medium">Parcours & Navigation</span>
            </button>
          </div>

          {/* Sidebar mobile */}
          <div 
            id="mobile-sidebar"
            className="lg:hidden hidden fixed inset-0 z-50 bg-white dark:bg-gray-900"
          >
            <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-lg font-semibold">Parcours de formation</h2>
              <button 
                onClick={() => {
                  const sidebar = document.getElementById('mobile-sidebar');
                  if (sidebar) {
                    sidebar.classList.add('hidden');
                  }
                }}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <CurriculumSidebar className="h-full overflow-y-auto" />
          </div>

          {/* Contenu des pages */}
          {children}
        </div>
      </div>
    </div>
  );
}