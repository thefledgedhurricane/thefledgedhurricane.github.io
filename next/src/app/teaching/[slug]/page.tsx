import Link from 'next/link';
import { generateJsonLd, generateBreadcrumbJsonLd } from '@/lib/jsonld';
import { getCourseById } from '@/lib/lms-data';
import CourseProgressControls from '@/components/lms/CourseProgressControls';
import LessonList from '@/components/lms/LessonList';



const levelPill: Record<string, string> = {
  beginner: 'bg-green-100 text-green-700',
  intermediate: 'bg-yellow-100 text-yellow-700',
  advanced: 'bg-red-100 text-red-700',
};

export default function CoursePage({ params }: any) {
  const { slug } = params;
  const course = getCourseById(slug);
  if (!course) return (
    <main className="max-w-3xl mx-auto px-6 py-16">
      <h1 className="text-2xl font-semibold mb-4">Cours introuvable</h1>
      <Link href="/teaching" className="text-blue-600">Retour</Link>
    </main>
  );

  const jsonLd = generateJsonLd({
  type: 'WebPage',
  name: course.title,
  url: `${process.env.NEXT_PUBLIC_SITE_URL}/teaching/${course.id}`,
  description: course.description,
  });
  const breadcrumbJsonLd = generateBreadcrumbJsonLd([
    { name: 'Accueil', url: `${process.env.NEXT_PUBLIC_SITE_URL}/` },
    { name: 'Enseignement', url: `${process.env.NEXT_PUBLIC_SITE_URL}/teaching` },
    { name: course.title, url: `${process.env.NEXT_PUBLIC_SITE_URL}/teaching/${course.id}` },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      
  <main className="min-h-screen bg-white dark:bg-gray-950 transition-colors">
        {/* Hero Section */}
        <div className="bg-gray-50 dark:bg-gray-900 py-12 transition-colors">
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            {/* Breadcrumb */}
            <nav className="mb-8">
              <ol className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                <li>
                  <Link href="/" className="hover:text-gray-700 dark:hover:text-gray-200">
                    Accueil
                  </Link>
                </li>
                <li>
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                </li>
                <li>
                  <Link href="/teaching" className="hover:text-gray-700 dark:hover:text-gray-200">
                    Enseignement
                  </Link>
                </li>
                <li>
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                </li>
                <li className="text-gray-900 dark:text-white font-medium truncate">{course.title}</li>
              </ol>
            </nav>

            {/* Teaching Header */}
            <header className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100">{course.title}</h1>
                <span className={`px-3 py-1 rounded text-sm ${levelPill[course.level]}`}>{course.level}</span>
              </div>
              <p className="text-gray-700 dark:text-gray-300">{course.description}</p>
              <p className="mt-2 text-sm text-gray-500">Seuil de passage par défaut: {course.passThreshold ?? 70}%</p>
              {course.prerequisites && course.prerequisites.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {course.prerequisites.map((p) => (
                    <span key={p} className="px-2 py-1 rounded bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 text-xs">
                      Prérequis: {p}
                    </span>
                  ))}
                </div>
              )}
            </header>
          </div>
        </div>
        {/* Course Content */}
        <article className="max-w-4xl mx-auto px-6 lg:px-8 pb-16">
          <section className="mb-8">
            <CourseProgressControls courseId={course.id} totalLessons={course.lessons.length} />
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">Leçons</h2>
            <LessonList course={course} />
          </section>
        </article>

        {/* Navigation */}
        <div className="max-w-4xl mx-auto px-6 lg:px-8 pb-16">
          <div className="border-t border-gray-200 pt-8">
            <Link href="/teaching" className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium transition-colors">
              <svg className="mr-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Retour à l&apos;enseignement
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}

export async function generateMetadata({ params }: any) {
  const { slug } = params;
  const course = getCourseById(slug);
  if (!course) return { title: 'Cours introuvable' };
  const pageUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/teaching/${course.id}`;
  const ogImage = '/og-image.jpg';
  return {
    title: course.title,
    description: course.description,
    alternates: { canonical: `/teaching/${course.id}` },
    openGraph: {
      title: course.title,
      description: course.description,
      type: 'article',
      url: pageUrl,
      images: [{ url: ogImage, width: 1200, height: 630, alt: course.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: course.title,
      description: course.description,
      images: [ogImage],
    },
  } as any;
}

export async function generateStaticParams() {
  // Static from local data
  const { courses } = await import('@/lib/lms-data');
  return courses.map((c) => ({ slug: c.id }));
}