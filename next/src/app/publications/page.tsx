import { Metadata } from 'next';
import Link from 'next/link';
import { getPublications, urlFor } from '@/lib/sanity';
import { Publication } from '@/lib/sanity-types';
import { generateJsonLd } from '@/lib/jsonld';

export const metadata: Metadata = {
  title: 'Publications',
  description: 'Academic publications, research papers, and scholarly articles by Dr. Ihababdelbasset ANNAKI.',
  openGraph: {
    title: 'Publications | Dr. Ihababdelbasset ANNAKI',
    description: 'Academic publications, research papers, and scholarly articles.',
    type: 'website',
  },
};

interface PublicationCardProps {
  publication: Publication;
}

function PublicationCard({ publication }: PublicationCardProps) {
  return (
    <article className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-4">
          <div className="text-2xl font-bold text-primary-600">
            {new Date(publication.publishedDate).getFullYear()}
          </div>
          <div className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">
            {publication.publicationType}
          </div>
        </div>
        {publication.featured && (
          <div className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-medium">
            Featured
          </div>
        )}
      </div>
      
      <h2 className="text-xl font-bold text-gray-900 mb-3 hover:text-primary-600 transition-colors">
        <Link href={`/publications/${publication.slug.current}`}>
          {publication.title}
        </Link>
      </h2>
      
      {publication.authors && publication.authors.length > 0 && (
        <div className="text-gray-600 mb-3">
          <strong>Authors:</strong> {publication.authors.map(author => author?.name).filter(Boolean).join(', ')}
        </div>
      )}
      
      {publication.abstract && (
        <p className="text-gray-600 mb-4 line-clamp-3">
          {publication.abstract}
        </p>
      )}
      
      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
        {publication.journal && (
          <span className="italic">{publication.journal}</span>
        )}
        {publication.openAccess && (
          <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-medium">
            Open Access
          </span>
        )}
        {publication.doi && (
          <a
            href={`https://doi.org/${publication.doi}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary-600 hover:text-primary-700 font-medium"
          >
            DOI: {publication.doi}
          </a>
        )}
      </div>
      
      {publication.keywords && publication.keywords.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-4">
          {publication.keywords.map((keyword: string, index: number) => (
            <span
              key={index}
              className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs"
            >
              {keyword}
            </span>
          ))}
        </div>
      )}
    </article>
  );
}

export default async function PublicationsPage() {
  const publications = await getPublications();
  
  const jsonLd = generateJsonLd({
    type: 'WebPage',
    name: 'Publications',
    url: `${process.env.NEXT_PUBLIC_SITE_URL}/publications`,
    description: 'Academic publications, research papers, and scholarly articles by Dr. Ihababdelbasset ANNAKI.',
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
              Publications Académiques
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Découvrez mes travaux de recherche, articles académiques et contributions scientifiques 
              dans les domaines de l&apos;Intelligence Artificielle et du d&apos;éveloppement avancé.
            </p>
          </div>
          
          {/* Publications Grid */}
          {publications.length > 0 ? (
            <>
              <div className="mb-8">
                <p className="text-gray-600">
                  <strong>{publications.length}</strong> publication{publications.length > 1 ? 's' : ''} trouvée{publications.length > 1 ? 's' : ''}
                </p>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {publications.map((publication: Publication) => (
                  <PublicationCard key={publication._id} publication={publication} />
                ))}
              </div>
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
                      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                    />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Aucune Publication</h2>
                <p className="text-gray-600">
                  Les publications apparaîtront ici une fois qu&apos;elles seront ajoutées dans le CMS Sanity.
                </p>
              </div>
            </div>
          )}
        </div>
      </main>
    </>
  );
}