import type { Metadata } from 'next';

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
      {/* Layout simplifié sans sidebar */}
      {children}
    </div>
  );
}