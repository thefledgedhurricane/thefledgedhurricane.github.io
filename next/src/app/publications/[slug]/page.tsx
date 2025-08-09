import { notFound } from 'next/navigation';
import { client, queries, urlFor } from '@/lib/sanity';
import { Publication } from '@/lib/sanity-types';
import { generateJsonLd } from '@/lib/jsonld';
import Image from 'next/image';
import Link from 'next/link';
import PortableTextRenderer from '@/components/PortableTextRenderer';

interface PublicationPageProps {
  params: {
    slug: string;
  };
}

async function getPublication(slug: string): Promise<Publication | null> {
  try {
    const publication = await client.fetch(queries.publicationBySlug, { slug });
    return publication;
  } catch (error) {
    console.error('Error fetching publication:', error);
    return null;
  }
}



export default async function PublicationPage({ params }: PublicationPageProps) {
  const { slug } = params;
  const publication = await getPublication(slug);
  
  if (!publication) {
    notFound();
  }

  const jsonLd = generateJsonLd({
    type: 'WebPage',
    name: publication.title,
    url: `${process.env.NEXT_PUBLIC_SITE_URL}/publications/${publication.slug.current}`,
    description: publication.abstract || '',
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
  <main className="min-h-screen bg-white dark:bg-gray-950 transition-colors">
        {/* Hero Section */}
        <div className="bg-gray-50 dark:bg-gray-900 py-16 transition-colors">
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
                  <Link href="/publications" className="hover:text-gray-700 dark:hover:text-gray-200">
                    Publications
                  </Link>
                </li>
                <li>
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                </li>
                <li className="text-gray-900 dark:text-white font-medium truncate">
                  {publication.title}
                </li>
              </ol>
            </nav>

            {/* Publication Header */}
            <header className="mb-8">
              <div className="flex items-center space-x-4 mb-6">
                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                  {publication.publicationType}
                </span>
                {publication.featured && (
                  <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium">
                    En vedette
                  </span>
                )}
                {publication.openAccess && (
                  <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                    Accès libre
                  </span>
                )}
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                {publication.title}
              </h1>
              
              {publication.abstract && (
                <div className="bg-blue-50 p-6 rounded-lg mb-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-3">Résumé</h2>
                  <p className="text-gray-700 leading-relaxed">
                    {publication.abstract}
                  </p>
                </div>
              )}
              
              {/* Publication Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                {publication.authors && publication.authors.length > 0 && (
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Auteurs</h3>
                    <div className="space-y-1">
                      {publication.authors.map((author, index) => (
                        <div key={index} className="text-gray-600">
                          {author?.name || 'Auteur inconnu'}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                <div className="space-y-3">
                  {publication.journal && (
                    <div>
                      <span className="font-semibold text-gray-900">Journal: </span>
                      <span className="text-gray-600 italic">{publication.journal}</span>
                    </div>
                  )}
                  
                  <div>
                    <span className="font-semibold text-gray-900">Date de publication: </span>
                    <span className="text-gray-600">
                      {new Date(publication.publishedDate).toLocaleDateString('fr-FR', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </span>
                  </div>
                  
                  {publication.doi && (
                    <div>
                      <span className="font-semibold text-gray-900">DOI: </span>
                      <a
                        href={`https://doi.org/${publication.doi}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 underline"
                      >
                        {publication.doi}
                      </a>
                    </div>
                  )}
                  
                  {publication.language && (
                    <div>
                      <span className="font-semibold text-gray-900">Langue: </span>
                      <span className="text-gray-600">{publication.language}</span>
                    </div>
                  )}
                </div>
              </div>
            </header>
          </div>
        </div>

        {/* Featured Image */}
        {publication.featuredImage && (
          <div className="max-w-6xl mx-auto px-6 lg:px-8 -mt-8 mb-12">
            <div className="relative aspect-video rounded-lg overflow-hidden shadow-xl">
              <Image
                src={urlFor(publication.featuredImage).width(1200).height(675).url()}
                alt={publication.featuredImage.alt || publication.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        )}

        {/* Publication Content */}
        <article className="max-w-4xl mx-auto px-6 lg:px-8 pb-16">
          {publication.content && (
            <div className="prose prose-lg max-w-none mb-12">
              <PortableTextRenderer content={publication.content} />
            </div>
          )}
          
          {/* Keywords */}
          {publication.keywords && publication.keywords.length > 0 && (
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Mots-clés</h3>
              <div className="flex flex-wrap gap-2">
                {publication.keywords.map((keyword: string, index: number) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200 transition-colors"
                  >
                    {keyword}
                  </span>
                ))}
              </div>
            </div>
          )}
          
          {/* External Links */}
          {publication.urls && Object.keys(publication.urls).some(key => publication.urls![key as keyof typeof publication.urls]) && (
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Liens externes</h3>
              <div className="space-y-2">
                {Object.entries(publication.urls).map(([key, url]) => {
                  if (!url) return null;
                  const linkLabels: Record<string, string> = {
                    pdf: 'PDF',
                    publisher: 'Éditeur',
                    arxiv: 'arXiv',
                    github: 'GitHub',
                    dataset: 'Données'
                  };
                  return (
                    <a
                      key={key}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-blue-600 hover:text-blue-800 underline mr-4"
                    >
                      {linkLabels[key] || key}
                      <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  );
                }).filter(Boolean)}
              </div>
            </div>
          )}
        </article>

        {/* Navigation */}
        <div className="max-w-4xl mx-auto px-6 lg:px-8 pb-16">
          <div className="border-t border-gray-200 pt-8">
            <Link
              href="/publications"
              className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium transition-colors"
            >
              <svg className="mr-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Retour aux publications
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}

export async function generateMetadata({ params }: PublicationPageProps) {
  const { slug } = await params;
  const publication = await getPublication(slug);
  
  if (!publication) {
    return {
      title: 'Publication non trouvée',
    };
  }

  return {
    title: publication.title,
    description: publication.abstract || `Publication académique par ${publication.authors?.[0]?.name || 'Dr. Ihababdelbasset ANNAKI'}`,
    openGraph: {
      title: publication.title,
      description: publication.abstract || '',
      type: 'article',
      publishedTime: publication.publishedDate,
      authors: publication.authors?.map(author => author?.name).filter(Boolean) || ['Dr. Ihababdelbasset ANNAKI'],
      images: publication.featuredImage ? [{
        url: urlFor(publication.featuredImage).width(1200).height(630).url(),
        width: 1200,
        height: 630,
        alt: publication.featuredImage.alt || publication.title,
      }] : [],
    },
  };
}

export async function generateStaticParams() {
  try {
    const publications = await client.fetch(`*[_type == "publication"]{ slug }`);
    return publications.map((publication: any) => ({
      slug: publication.slug.current,
    }));
  } catch (error) {
    console.error('Error generating static params for publications:', error);
    return [];
  }
}