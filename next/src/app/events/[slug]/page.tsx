import { notFound } from 'next/navigation';
import { client, queries, urlFor } from '@/lib/sanity';
import { Event } from '@/lib/sanity-types';
import { generateJsonLd } from '@/lib/jsonld';
import { PortableText } from '@portabletext/react';
import Image from 'next/image';
import Link from 'next/link';

interface EventPageProps {
  params: {
    slug: string;
  };
}

async function getEvent(slug: string): Promise<Event | null> {
  try {
    const event = await client.fetch(queries.eventBySlug, { slug });
    return event;
  } catch (error) {
    console.error('Error fetching event:', error);
    return null;
  }
}

// Portable Text components for rich content rendering
const portableTextComponents = {
  types: {
    image: ({ value }: any) => (
      <div className="my-8">
        <Image
          src={urlFor(value).width(800).height(600).url()}
          alt={value.alt || 'Event image'}
          width={800}
          height={600}
          className="rounded-lg shadow-md"
        />
        {value.caption && (
          <p className="text-sm text-gray-600 text-center mt-2 italic">
            {value.caption}
          </p>
        )}
      </div>
    ),
    codeBlock: ({ value }: any) => (
      <div className="my-6">
        <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
          <code className={`language-${value.language || 'text'}`}>
            {value.code}
          </code>
        </pre>
        {value.filename && (
          <p className="text-sm text-gray-600 mt-2">
            Fichier: <code className="bg-gray-100 px-1 rounded">{value.filename}</code>
          </p>
        )}
      </div>
    ),
  },
  block: {
    h1: ({ children }: any) => (
      <h1 className="text-3xl font-bold text-gray-900 mt-8 mb-4">{children}</h1>
    ),
    h2: ({ children }: any) => (
      <h2 className="text-2xl font-bold text-gray-900 mt-6 mb-3">{children}</h2>
    ),
    h3: ({ children }: any) => (
      <h3 className="text-xl font-semibold text-gray-900 mt-4 mb-2">{children}</h3>
    ),
    normal: ({ children }: any) => (
      <p className="text-gray-700 leading-relaxed mb-4">{children}</p>
    ),
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-4 border-blue-500 pl-4 italic text-gray-600 my-6">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }: any) => (
      <ul className="list-disc list-inside space-y-2 mb-4 text-gray-700">{children}</ul>
    ),
    number: ({ children }: any) => (
      <ol className="list-decimal list-inside space-y-2 mb-4 text-gray-700">{children}</ol>
    ),
  },
  marks: {
    strong: ({ children }: any) => <strong className="font-semibold">{children}</strong>,
    em: ({ children }: any) => <em className="italic">{children}</em>,
    code: ({ children }: any) => (
      <code className="bg-gray-100 px-1 py-0.5 rounded text-sm font-mono">{children}</code>
    ),
    link: ({ children, value }: any) => (
      <a
        href={value.href}
        target={value.blank ? '_blank' : '_self'}
        rel={value.blank ? 'noopener noreferrer' : undefined}
        className="text-blue-600 hover:text-blue-800 underline"
      >
        {children}
      </a>
    ),
  },
};

const eventTypeLabels: Record<string, string> = {
  conference: 'Conférence',
  workshop: 'Atelier',
  seminar: 'Séminaire',
  lecture: 'Cours magistral',
  presentation: 'Présentation',
  meeting: 'Réunion',
  symposium: 'Symposium',
  webinar: 'Webinaire',
  other: 'Autre'
};

const statusLabels: Record<string, string> = {
  upcoming: 'À venir',
  ongoing: 'En cours',
  completed: 'Terminé',
  cancelled: 'Annulé',
  postponed: 'Reporté'
};

const statusColors: Record<string, string> = {
  upcoming: 'bg-blue-100 text-blue-800',
  ongoing: 'bg-green-100 text-green-800',
  completed: 'bg-gray-100 text-gray-800',
  cancelled: 'bg-red-100 text-red-800',
  postponed: 'bg-yellow-100 text-yellow-800'
};

export default async function EventPage({ params }: EventPageProps) {
  const event = await getEvent(params.slug);
  
  if (!event) {
    notFound();
  }

  const jsonLd = generateJsonLd({
    type: 'WebPage',
    name: event.title,
    url: `${process.env.NEXT_PUBLIC_SITE_URL}/events/${event.slug.current}`,
    description: event.description || '',
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
                  <Link href="/events" className="hover:text-gray-700">
                    Événements
                  </Link>
                </li>
                <li>
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                </li>
                <li className="text-gray-900 font-medium truncate">
                  {event.title}
                </li>
              </ol>
            </nav>

            {/* Event Header */}
            <header className="mb-8">
              <div className="flex items-center space-x-4 mb-6">
                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                  {eventTypeLabels[event.eventType] || event.eventType}
                </span>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusColors[event.status] || 'bg-gray-100 text-gray-800'}`}>
                  {statusLabels[event.status] || event.status}
                </span>
                {event.featured && (
                  <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium">
                    En vedette
                  </span>
                )}
                {event.location?.isVirtual && (
                  <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">
                    Virtuel
                  </span>
                )}
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                {event.title}
              </h1>
              
              {event.description && (
                <div className="bg-blue-50 p-6 rounded-lg mb-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-3">Description</h2>
                  <p className="text-gray-700 leading-relaxed">
                    {event.description}
                  </p>
                </div>
              )}
              
              {/* Event Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                <div className="space-y-3">
                  <div>
                    <span className="font-semibold text-gray-900">Date: </span>
                    <span className="text-gray-600">
                      {new Date(event.startDate).toLocaleDateString('fr-FR', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </span>
                  </div>
                  
                  {event.endDate && (
                    <div>
                      <span className="font-semibold text-gray-900">Fin: </span>
                      <span className="text-gray-600">
                        {new Date(event.endDate).toLocaleDateString('fr-FR', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </span>
                    </div>
                  )}
                  
                  {event.location && (
                    <div>
                      <span className="font-semibold text-gray-900">Lieu: </span>
                      <span className="text-gray-600">
                        {event.location.isVirtual ? 'Événement virtuel' : 
                         [event.location.venue, event.location.city, event.location.country]
                           .filter(Boolean).join(', ')}
                      </span>
                    </div>
                  )}
                  
                  {event.organizer && (
                    <div>
                      <span className="font-semibold text-gray-900">Organisateur: </span>
                      <span className="text-gray-600">{event.organizer}</span>
                    </div>
                  )}
                </div>
                
                <div className="space-y-3">
                  {event.registrationUrl && (
                    <div>
                      <span className="font-semibold text-gray-900">Inscription: </span>
                      <span className="text-blue-600 font-medium">Disponible</span>
                    </div>
                  )}
                  
                  {event.website && (
                    <div>
                      <span className="font-semibold text-gray-900">Site web: </span>
                      <a
                        href={event.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 underline"
                      >
                        Voir le site
                      </a>
                    </div>
                  )}
                  
                  {event.registrationUrl && (
                    <div>
                      <a
                        href={event.registrationUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                      >
                        S'inscrire
                        <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </header>
          </div>
        </div>

        {/* Featured Image */}
        {event.featuredImage && (
          <div className="max-w-6xl mx-auto px-6 lg:px-8 -mt-8 mb-12">
            <div className="relative aspect-video rounded-lg overflow-hidden shadow-xl">
              <Image
                src={urlFor(event.featuredImage).width(1200).height(675).url()}
                alt={event.featuredImage.alt || event.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        )}

        {/* Event Content */}
        <article className="max-w-4xl mx-auto px-6 lg:px-8 pb-16">
          {event.content && (
            <div className="prose prose-lg max-w-none mb-12">
              <PortableText
                value={event.content}
                components={portableTextComponents}
              />
            </div>
          )}
          
          {/* Speakers */}
          {event.speakers && event.speakers.length > 0 && (
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Intervenants</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {event.speakers.map((speaker: any, index: number) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-start space-x-4">
                      {speaker.image && (
                        <div className="flex-shrink-0">
                          <Image
                            src={urlFor(speaker.image).width(60).height(60).url()}
                            alt={speaker.name}
                            width={60}
                            height={60}
                            className="rounded-full"
                          />
                        </div>
                      )}
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{speaker.name}</h4>
                        {speaker.title && (
                          <p className="text-sm text-gray-600 mb-1">{speaker.title}</p>
                        )}
                        {speaker.organization && (
                          <p className="text-sm text-gray-500">{speaker.organization}</p>
                        )}
                        {speaker.bio && (
                          <p className="text-sm text-gray-700 mt-2">{speaker.bio}</p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Tags */}
          {event.tags && event.tags.length > 0 && (
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Mots-clés</h3>
              <div className="flex flex-wrap gap-2">
                {event.tags.map((tag: string, index: number) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200 transition-colors"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
          
          {/* External Links */}
          {event.website && (
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Liens externes</h3>
              <a
                href={event.website}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-blue-600 hover:text-blue-800 underline"
              >
                Site web de l'événement
                <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
          )}
        </article>

        {/* Navigation */}
        <div className="max-w-4xl mx-auto px-6 lg:px-8 pb-16">
          <div className="border-t border-gray-200 pt-8">
            <Link
              href="/events"
              className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium transition-colors"
            >
              <svg className="mr-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Retour aux événements
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}

export async function generateMetadata({ params }: EventPageProps) {
  const event = await getEvent(params.slug);
  
  if (!event) {
    return {
      title: 'Événement non trouvé',
    };
  }

  return {
    title: event.title,
    description: event.description || `Événement organisé par Dr. Ihababdelbasset ANNAKI`,
    openGraph: {
      title: event.title,
      description: event.description || '',
      type: 'article',
      images: event.featuredImage ? [{
        url: urlFor(event.featuredImage).width(1200).height(630).url(),
        width: 1200,
        height: 630,
        alt: event.featuredImage.alt || event.title,
      }] : [],
    },
  };
}

export async function generateStaticParams() {
  try {
    const events = await client.fetch(`*[_type == "event"]{ slug }`);
    return events.map((event: any) => ({
      slug: event.slug.current,
    }));
  } catch (error) {
    console.error('Error generating static params for events:', error);
    return [];
  }
}