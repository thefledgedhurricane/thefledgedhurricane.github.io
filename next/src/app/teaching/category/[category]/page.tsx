import Link from 'next/link';
import { generateJsonLd, generateBreadcrumbJsonLd } from '@/lib/jsonld';
import { courses } from '@/lib/lms-data';
import CourseCard from '@/components/lms/CourseCard';

interface PageProps {
  params: Promise<{ category: string }>;
}

function slugifyCategory(cat: string) {
  const normalized = cat
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
  return normalized
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

export default async function CategoryPage({ params }: PageProps) {
  const { category } = await params;
  const uniqueCategories = Array.from(
    new Map(
      courses
        .filter((c) => !!c.category)
        .map((c) => [slugifyCategory(c.category as string), c.category as string])
    ).entries()
  );
  const match = uniqueCategories.find(([slug]) => slug === category);
  const categoryLabel = match ? match[1] : undefined;

  const filtered = courses.filter((c) => c.category && slugifyCategory(c.category) === category);

  const pageTitle = categoryLabel ? `Catégorie: ${categoryLabel}` : 'Catégorie';
  const pageUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/teaching/category/${category}`;

  const jsonLd = generateJsonLd({ type: 'WebPage', name: pageTitle, url: pageUrl, description: `Cours de la catégorie ${categoryLabel ?? category}` });
  const breadcrumbJsonLd = generateBreadcrumbJsonLd([
    { name: 'Accueil', url: `${process.env.NEXT_PUBLIC_SITE_URL}/` },
    { name: 'Enseignement', url: `${process.env.NEXT_PUBLIC_SITE_URL}/teaching` },
    { name: pageTitle, url: pageUrl },
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <main className="min-h-screen bg-gray-50 dark:bg-gray-950 py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="mb-8 text-sm text-gray-500 dark:text-gray-400">
            <Link href="/" className="hover:underline">Accueil</Link>
            <span className="mx-2">/</span>
            <Link href="/teaching" className="hover:underline">Enseignement</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-700 dark:text-gray-300">{pageTitle}</span>
          </nav>

          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-6">{pageTitle}</h1>
          {filtered.length === 0 ? (
            <div className="text-gray-600 dark:text-gray-300">Aucun cours dans cette catégorie.</div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
              {filtered.map((c) => (
                <CourseCard key={c.id} course={c} />
              ))}
            </div>
          )}

          <div className="mt-10">
            <Link href="/teaching" className="text-blue-600 hover:text-blue-800">← Retour aux catégories</Link>
          </div>
        </div>
      </main>
    </>
  );
}

export async function generateStaticParams() {
  const { courses } = await import('@/lib/lms-data');
  const slugs = Array.from(
    new Set(
      courses
        .filter((c) => !!c.category)
        .map((c) => c.category as string)
        .map((s) => s
          .toLowerCase()
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '')
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)/g, '')
        )
    )
  );
  return slugs.map((category) => ({ category }));
}
