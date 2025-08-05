import { Metadata } from 'next';
import Link from 'next/link';
import { getTeaching, urlFor } from '@/lib/sanity';
import { Teaching } from '@/lib/sanity-types';
import { generateJsonLd } from '@/lib/jsonld';

export const metadata: Metadata = {
  title: 'Teaching',
  description: 'Courses, lectures, and educational content by Dr. Ihababdelbasset ANNAKI.',
  openGraph: {
    title: 'Teaching | Dr. Ihababdelbasset ANNAKI',
    description: 'Courses, lectures, and educational content.',
    type: 'website',
  },
};

interface TeachingCardProps {
  course: Teaching;
}

function TeachingCard({ course }: TeachingCardProps) {
  return (
    <article className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-4">
          <div className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
            {course.teachingType}
          </div>
          {course.level && (
            <div className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">
              {course.level}
            </div>
          )}
        </div>
        {course.featured && (
          <div className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-medium">
            Featured
          </div>
        )}
      </div>
      
      <h2 className="text-xl font-bold text-gray-900 mb-3 hover:text-primary-600 transition-colors">
        <Link href={`/teaching/${course.slug.current}`}>
          {course.title}
        </Link>
      </h2>
      
      {course.institution && (
        <div className="text-gray-600 mb-3">
          <strong>Institution:</strong> {course.institution}
        </div>
      )}
      
      {course.description && (
        <p className="text-gray-600 mb-4 line-clamp-3">
          {course.description}
        </p>
      )}
      
      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-4">
        {course.startDate && (
          <span>
            <strong>Start:</strong> {new Date(course.startDate).toLocaleDateString()}
          </span>
        )}
        {course.endDate && (
          <span>
            <strong>End:</strong> {new Date(course.endDate).toLocaleDateString()}
          </span>
        )}
        {course.studentCount && (
          <span>
            <strong>Students:</strong> {course.studentCount}
          </span>
        )}
      </div>
      
      {course.subjects && course.subjects.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-4">
          {course.subjects.map((subject: string, index: number) => (
            <span
              key={index}
              className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs"
            >
              {subject}
            </span>
          ))}
        </div>
      )}
    </article>
  );
}

export default async function TeachingPage() {
  const teaching = await getTeaching();
  
  const jsonLd = generateJsonLd({
    type: 'WebPage',
    name: 'Teaching',
    url: `${process.env.NEXT_PUBLIC_SITE_URL}/teaching`,
    description: 'Courses, lectures, and educational content by Dr. Ihababdelbasset ANNAKI.',
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <main className="min-h-screen bg-gray-50 py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Enseignement
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Découvrez mes cours, formations et activités pédagogiques dans les domaines 
              de l'Intelligence Artificielle et du développement avancé.
            </p>
          </div>
          
          {/* Teaching Grid */}
          {teaching.length > 0 ? (
            <>
              <div className="mb-8">
                <p className="text-gray-600">
                  <strong>{teaching.length}</strong> cours trouvé{teaching.length > 1 ? 's' : ''}
                </p>
              </div>
              
              {/* Featured Teaching */}
              {teaching.some(course => course.featured) && (
                <section className="mb-16">
                  <h2 className="text-3xl font-bold text-gray-900 mb-8">
                    Cours en Vedette
                  </h2>
                  <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
                    {teaching
                      .filter((course: Teaching) => course.featured)
                      .slice(0, 4)
                      .map((course: Teaching) => (
                        <TeachingCard key={course._id} course={course} />
                      ))}
                  </div>
                </section>
              )}
              
              {/* All Teaching */}
              <section>
                <h2 className="text-3xl font-bold text-gray-900 mb-8">
                  Tous les Cours
                </h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
                  {teaching.map((course: Teaching) => (
                    <TeachingCard key={course._id} course={course} />
                  ))}
                </div>
              </section>
            </>
          ) : (
            <div className="text-center py-16">
              <div className="max-w-md mx-auto">
                <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                  <svg
                    className="w-12 h-12 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 14l9-5-9-5-9 5 9 5z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
                    />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Aucun Cours</h2>
                <p className="text-gray-600">
                  Les cours apparaîtront ici une fois qu'ils seront ajoutés dans le CMS Sanity.
                </p>
              </div>
            </div>
          )}
        </div>
      </main>
    </>
  );
}