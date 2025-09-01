import Link from 'next/link';
import LessonViewer from '@/components/lms/LessonViewer';
import { generateJsonLd, generateBreadcrumbJsonLd } from '@/lib/jsonld';
import { getLessonById } from '@/lib/lms-data';
import LessonGuard from '@/components/lms/LessonGuard';


interface PageProps {
  params: Promise<{ slug: string; lessonId: string }>;
}

export default async function LessonPage({ params }: PageProps) {
  const { slug, lessonId } = await params;
  const result = getLessonById(slug, lessonId);
  if (!result) {
    return (
      <main className="max-w-3xl mx-auto px-6 py-16">
        <h1 className="text-2xl font-semibold mb-4">Leçon introuvable</h1>
        <Link href={`/teaching/${slug}`} className="text-blue-600">Retour au cours</Link>
      </main>
    );
  }
  const { course, lesson } = result;
  // Accès et affichage gérés côté client pour lire le score depuis localStorage

  const jsonLd = generateJsonLd({
    type: 'WebPage',
    name: `${course.title} — ${lesson.title}`,
    url: `${process.env.NEXT_PUBLIC_SITE_URL}/teaching/${course.id}/lesson/${lesson.id}`,
    description: `Leçon ${lesson.title} du cours ${course.title}`,
  });
  const breadcrumbJsonLd = generateBreadcrumbJsonLd([
    { name: 'Accueil', url: `${process.env.NEXT_PUBLIC_SITE_URL}/` },
    { name: 'Enseignement', url: `${process.env.NEXT_PUBLIC_SITE_URL}/teaching` },
    { name: course.title, url: `${process.env.NEXT_PUBLIC_SITE_URL}/teaching/${course.id}` },
    { name: lesson.title, url: `${process.env.NEXT_PUBLIC_SITE_URL}/teaching/${course.id}/lesson/${lesson.id}` },
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <main className="min-h-screen bg-white dark:bg-gray-950">
        <div className="max-w-3xl mx-auto px-6 lg:px-8 py-10">
          <nav className="mb-6 text-sm text-gray-500 dark:text-gray-400">
            <Link href="/" className="hover:underline">Accueil</Link>
            <span className="mx-2">/</span>
            <Link href="/teaching" className="hover:underline">Enseignement</Link>
            <span className="mx-2">/</span>
            <Link href={`/teaching/${course.id}`} className="hover:underline">{course.title}</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-700 dark:text-gray-300">{lesson.title}</span>
          </nav>

          <h1 className="text-3xl font-bold mb-6">{lesson.title}</h1>
          <LessonGuard course={course} lesson={lesson} />

          <div className="mt-10">
            <Link href={`/teaching/${course.id}`} className="text-blue-600 hover:text-blue-800">← Retour au cours</Link>
          </div>
        </div>
      </main>
    </>
  );
}

export async function generateStaticParams() {
  const { courses } = await import('@/lib/lms-data');
  const params: { slug: string; lessonId: string }[] = [];
  for (const c of courses) {
    for (const l of c.lessons) {
      params.push({ slug: c.id, lessonId: l.id });
    }
  }
  return params;
}
