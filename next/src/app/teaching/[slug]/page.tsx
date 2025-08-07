import { notFound } from 'next/navigation';
import { client, queries, urlFor } from '@/lib/sanity';
import { Teaching } from '@/lib/sanity-types';
import { generateJsonLd } from '@/lib/jsonld';
import Image from 'next/image';
import Link from 'next/link';
import PortableTextRenderer from '@/components/PortableTextRenderer';

interface TeachingPageProps {
  params: {
    slug: string;
  };
}

async function getTeaching(slug: string): Promise<Teaching | null> {
  try {
    const teaching = await client.fetch(queries.teachingBySlug, { slug });
    return teaching;
  } catch (error) {
    console.error('Error fetching teaching:', error);
    return null;
  }
}



const teachingTypeLabels: Record<string, string> = {
  undergraduate: 'Licence',
  graduate: 'Master/Doctorat',
  workshop: 'Atelier',
  tutorial: 'Tutoriel',
  seminar: 'Séminaire',
  lab: 'Travaux pratiques',
  guest: 'Conférence invitée',
  online: 'En ligne',
  other: 'Autre'
};

const roleLabels: Record<string, string> = {
  instructor: 'Enseignant',
  ta: 'Assistant d&apos;enseignement',
  guest: 'Conférencier invité',
  lab_instructor: 'Responsable TP',
  tutor: 'Tuteur',
  co_instructor: 'Co-enseignant'
};

const levelLabels: Record<string, string> = {
  beginner: 'Débutant',
  intermediate: 'Intermédiaire',
  advanced: 'Avancé',
  mixed: 'Mixte'
};

export default async function TeachingPage({ params }: TeachingPageProps) {
  const teaching = await getTeaching(params.slug);
  
  if (!teaching) {
    notFound();
  }

  const jsonLd = generateJsonLd({
    type: 'WebPage',
    name: teaching.title,
    url: `${process.env.NEXT_PUBLIC_SITE_URL}/teaching/${teaching.slug.current}`,
    description: teaching.description || '',
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <main className="min-h-screen bg-white">
        {/* Hero Section */}
        <div className="bg-gray-50 py-16">
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            {/* Breadcrumb */}
            <nav className="mb-8">
              <ol className="flex items-center space-x-2 text-sm text-gray-500">
                <li>
                  <Link href="/" className="hover:text-gray-700">
                    Accueil
                  </Link>
                </li>
                <li>
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                </li>
                <li>
                  <Link href="/teaching" className="hover:text-gray-700">
                    Enseignement
                  </Link>
                </li>
                <li>
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                </li>
                <li className="text-gray-900 font-medium truncate">
                  {teaching.title}
                </li>
              </ol>
            </nav>

            {/* Teaching Header */}
            <header className="mb-8">
              <div className="flex items-center space-x-4 mb-6">
                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                  {teachingTypeLabels[teaching.teachingType] || teaching.teachingType}
                </span>
                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                  {roleLabels[teaching.role] || teaching.role}
                </span>
                {teaching.featured && (
                  <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium">
                    En vedette
                  </span>
                )}
                {teaching.current && (
                  <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">
                    En cours
                  </span>
                )}
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                {teaching.title}
              </h1>
              
              {teaching.courseCode && (
                <div className="mb-4">
                  <span className="text-lg font-mono bg-gray-100 px-3 py-1 rounded">
                    {teaching.courseCode}
                  </span>
                </div>
              )}
              
              {teaching.description && (
                <div className="bg-blue-50 p-6 rounded-lg mb-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-3">Description</h2>
                  <p className="text-gray-700 leading-relaxed">
                    {teaching.description}
                  </p>
                </div>
              )}
              
              {/* Teaching Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                <div className="space-y-3">
                  <div>
                    <span className="font-semibold text-gray-900">Institution: </span>
                    <span className="text-gray-600">{teaching.institution}</span>
                  </div>
                  
                  {teaching.department && (
                    <div>
                      <span className="font-semibold text-gray-900">Département: </span>
                      <span className="text-gray-600">{teaching.department}</span>
                    </div>
                  )}
                  
                  {teaching.level && (
                    <div>
                      <span className="font-semibold text-gray-900">Niveau: </span>
                      <span className="text-gray-600">{levelLabels[teaching.level] || teaching.level}</span>
                    </div>
                  )}
                  
                  {teaching.semester && (
                    <div>
                      <span className="font-semibold text-gray-900">Semestre: </span>
                      <span className="text-gray-600">{teaching.semester}</span>
                    </div>
                  )}
                </div>
                
                <div className="space-y-3">
                  <div>
                    <span className="font-semibold text-gray-900">Période: </span>
                    <span className="text-gray-600">
                      {new Date(teaching.startDate).toLocaleDateString('fr-FR', {
                        year: 'numeric',
                        month: 'long'
                      })}
                      {teaching.endDate && (
                        <> - {new Date(teaching.endDate).toLocaleDateString('fr-FR', {
                          year: 'numeric',
                          month: 'long'
                        })}</>
                      )}
                    </span>
                  </div>
                  
                  {teaching.studentCount && (
                    <div>
                      <span className="font-semibold text-gray-900">Nombre d&apos;étudiants: </span>
                      <span className="text-gray-600">{teaching.studentCount}</span>
                    </div>
                  )}
                  
                  {teaching.language && (
                    <div>
                      <span className="font-semibold text-gray-900">Langue: </span>
                      <span className="text-gray-600">
                        {teaching.language === 'fr' ? 'Français' : 
                         teaching.language === 'en' ? 'Anglais' : 
                         teaching.language === 'es' ? 'Espagnol' : 
                         teaching.language === 'de' ? 'Allemand' : 
                         teaching.language}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </header>
          </div>
        </div>

        {/* Featured Image */}
        {teaching.featuredImage && (
          <div className="max-w-6xl mx-auto px-6 lg:px-8 -mt-8 mb-12">
            <div className="relative aspect-video rounded-lg overflow-hidden shadow-xl">
              <Image
                src={urlFor(teaching.featuredImage).width(1200).height(675).url()}
                alt={teaching.featuredImage.alt || teaching.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        )}

        {/* Teaching Content */}
        <article className="max-w-4xl mx-auto px-6 lg:px-8 pb-16">
          {teaching.content && (
            <div className="prose prose-lg max-w-none mb-12">
              <PortableTextRenderer content={teaching.content} />
            </div>
          )}
          
          {/* Subjects */}
          {teaching.subjects && teaching.subjects.length > 0 && (
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Sujets abordés</h3>
              <div className="flex flex-wrap gap-2">
                {teaching.subjects.map((subject: string, index: number) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm hover:bg-blue-200 transition-colors"
                  >
                    {subject}
                  </span>
                ))}
              </div>
            </div>
          )}
          
          {/* Technologies */}
          {teaching.technologies && teaching.technologies.length > 0 && (
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Technologies utilisées</h3>
              <div className="flex flex-wrap gap-2">
                {teaching.technologies.map((tech: string, index: number) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200 transition-colors"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}
          
          {/* Materials */}
          {teaching.materials && teaching.materials.length > 0 && (
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Matériel pédagogique</h3>
              <div className="space-y-4">
                {teaching.materials.map((material: any, index: number) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900 mb-1">{material.title}</h4>
                        <span className="inline-block px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded mb-2">
                          {material.type}
                        </span>
                        {material.description && (
                          <p className="text-gray-600 text-sm">{material.description}</p>
                        )}
                      </div>
                      {(material.file || material.url) && (
                        <a
                          href={material.url || (material.file && urlFor(material.file).url())}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="ml-4 text-blue-600 hover:text-blue-800 text-sm font-medium"
                        >
                          Télécharger
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Evaluations */}
          {teaching.evaluations && (
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Évaluations</h3>
              <div className="bg-green-50 p-6 rounded-lg">
                {teaching.evaluations.averageRating && (
                  <div className="mb-4">
                    <span className="text-2xl font-bold text-green-800">
                      {teaching.evaluations.averageRating}/5
                    </span>
                    <span className="text-green-600 ml-2">Note moyenne</span>
                    {teaching.evaluations.responseRate && (
                      <span className="text-sm text-gray-600 ml-4">
                        ({teaching.evaluations.responseRate}% de réponses)
                      </span>
                    )}
                  </div>
                )}
                {teaching.evaluations.highlights && teaching.evaluations.highlights.length > 0 && (
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Points forts</h4>
                    <ul className="list-disc list-inside space-y-1 text-gray-700">
                      {teaching.evaluations.highlights.map((highlight: string, index: number) => (
                        <li key={index}>{highlight}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          )}
          
          {/* Achievements */}
          {teaching.achievements && teaching.achievements.length > 0 && (
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Réalisations</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                {teaching.achievements.map((achievement: string, index: number) => (
                  <li key={index}>{achievement}</li>
                ))}
              </ul>
            </div>
          )}
          
          {/* Syllabus */}
          {teaching.syllabus && (
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Syllabus</h3>
              <a
                href={urlFor(teaching.syllabus).url()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <svg className="mr-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Télécharger le syllabus
              </a>
            </div>
          )}
        </article>

        {/* Navigation */}
        <div className="max-w-4xl mx-auto px-6 lg:px-8 pb-16">
          <div className="border-t border-gray-200 pt-8">
            <Link
              href="/teaching"
              className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium transition-colors"
            >
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

export async function generateMetadata({ params }: TeachingPageProps) {
  const teaching = await getTeaching(params.slug);
  
  if (!teaching) {
    return {
      title: 'Enseignement non trouvé',
    };
  }

  return {
    title: teaching.title,
    description: teaching.description || `Cours d'enseignement par Dr. Ihababdelbasset ANNAKI à ${teaching.institution}`,
    openGraph: {
      title: teaching.title,
      description: teaching.description || '',
      type: 'article',
      images: teaching.featuredImage ? [{
        url: urlFor(teaching.featuredImage).width(1200).height(630).url(),
        width: 1200,
        height: 630,
        alt: teaching.featuredImage.alt || teaching.title,
      }] : [],
    },
  };
}

export async function generateStaticParams() {
  try {
    const teachings = await client.fetch(`*[_type == "teaching"]{ slug }`);
    return teachings.map((teaching: any) => ({
      slug: teaching.slug.current,
    }));
  } catch (error) {
    console.error('Error generating static params for teaching:', error);
    return [];
  }
}