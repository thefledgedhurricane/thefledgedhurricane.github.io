import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    template: '%s | Espace Enseignement',
    default: 'Espace Enseignement — Dr. Ihababdelbasset ANNAKI',
  },
  description: 'Apprenez la programmation, l\'algorithmique et l\'intelligence artificielle avec des parcours structurés.',
};

export default function TeachingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Layout simplifié sans sidebar */}
      {children}
    </div>
  );
}