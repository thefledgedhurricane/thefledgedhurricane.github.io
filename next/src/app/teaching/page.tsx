import { Metadata } from 'next';
import { generateJsonLd } from '@/lib/jsonld';
import { courses } from '@/lib/lms-data';
import Link from 'next/link';
import CourseCard from '@/components/lms/CourseCard';

export const metadata: Metadata = {
  title: 'LMS — Enseignement',
  description: 'Apprenez via un LMS 100% front-end: cours, leçons, quiz et progression locale.',
  openGraph: {
    title: 'LMS — Enseignement | Dr. Ihababdelbasset ANNAKI',
    description: 'Cours interactifs, leçons et quiz côté client (localStorage).',
    type: 'website',
  },
};

export default async function TeachingPage() {
  
  const jsonLd = generateJsonLd({
    type: 'WebPage',
  name: 'LMS — Enseignement',
  url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://thefledgedhurricane.github.io'}/teaching`,
  description: 'Cours interactifs, leçons et quiz côté client (localStorage).',
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
  <main className="min-h-screen bg-gray-50 dark:bg-gray-950 py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-6">
              LMS — Enseignement
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Apprenez via une plateforme LMS 100% front-end: cours, leçons, quiz et suivi de progression local.
            </p>
          </div>
          
          {/* Catégories (accès avant les cours) */}
          <section>
            <div className="mb-6 text-gray-600 dark:text-gray-300">
              <p>
                Explorez par catégorie avant d&apos;accéder aux cours. <strong>{courses.length}</strong> cours au total.
              </p>
            </div>

            {/* Grille de catégories */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from(new Map(
                courses
                  .filter(c => !!c.category)
                  .map(c => [
                    (c.category as string)
                      .toLowerCase()
                      .normalize('NFD')
                      .replace(/[\u0300-\u036f]/g, '')
                      .replace(/[^a-z0-9]+/g, '-')
                      .replace(/(^-|-$)/g, ''),
                    c.category as string
                  ])
              ).entries()).map(([slug, label]) => {
                const count = courses.filter(c => c.category && (
                  (c.category as string)
                    .toLowerCase()
                    .normalize('NFD')
                    .replace(/[\u0300-\u036f]/g, '')
                    .replace(/[^a-z0-9]+/g, '-')
                    .replace(/(^-|-$)/g, '')
                ) === slug).length;
                return (
                  <Link key={slug} href={`/teaching/category/${slug}`} className="block p-5 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 hover:shadow-md transition-shadow">
                    <div className="text-sm text-gray-500 mb-1">Catégorie</div>
                    <div className="text-xl font-semibold text-gray-900 dark:text-gray-100">{label}</div>
                    <div className="text-sm text-gray-500">{count} cours</div>
                  </Link>
                );
              })}
            </div>
          </section>

          {/* Tous les cours */}
          <section className="mt-12">
            <h2 className="text-2xl font-semibold mb-4">Tous les cours</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
              {courses.map((c) => (
                <CourseCard key={c.id} course={c} />
              ))}
            </div>
          </section>
        </div>
      </main>
    </>
  );
}