import { Metadata } from 'next';
import Link from 'next/link';
import { getEvents, urlFor } from '@/lib/sanity';
import { Event } from '@/lib/sanity-types';
import { generateJsonLd } from '@/lib/jsonld';

export const metadata: Metadata = {
  title: 'Events',
  description: 'Conferences, workshops, and academic events by Dr. Ihababdelbasset ANNAKI.',
  openGraph: {
    title: 'Events | Dr. Ihababdelbasset ANNAKI',
    description: 'Conferences, workshops, and academic events.',
    type: 'website',
  },
};

interface EventCardProps {
  event: Event;
}

function EventCard({ event }: EventCardProps) {
  const isUpcoming = new Date(event.startDate) > new Date();
  const isPast = new Date(event.endDate || event.startDate) < new Date();
  
  return (
  <article className="bg-white dark:bg-gray-900 p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100 dark:border-gray-800">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-4">
          <div className={`px-3 py-1 rounded-full text-sm font-medium ${
            isUpcoming ? 'bg-green-100 text-green-700' :
            isPast ? 'bg-gray-100 text-gray-700' :
            'bg-blue-100 text-blue-700'
          }`}>
            {event.eventType}
          </div>
          <div className={`px-3 py-1 rounded-full text-sm font-medium ${
            isUpcoming ? 'bg-yellow-100 text-yellow-700' :
            isPast ? 'bg-gray-100 text-gray-500' :
            'bg-blue-100 text-blue-700'
          }`}>
            {isUpcoming ? 'À venir' : isPast ? 'Passé' : 'En cours'}
          </div>
        </div>
        {event.featured && (
          <div className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-medium">
            En vedette
          </div>
        )}
      </div>
      
  <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3 hover:text-primary-600 transition-colors">
        <Link href={`/events/${event.slug.current}`}>
          {event.title}
        </Link>
      </h2>
      
      {event.description && (
        <p className="text-gray-600 mb-4 line-clamp-3">
          {event.description}
        </p>
      )}
      
      <div className="space-y-2 text-sm text-gray-600 mb-4">
        <div className="flex items-center space-x-2">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span>
            {new Date(event.startDate).toLocaleDateString('fr-FR', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
            {event.endDate && event.endDate !== event.startDate && (
              <> - {new Date(event.endDate).toLocaleDateString('fr-FR', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}</>
            )}
          </span>
        </div>
        
        {event.location && (
          <div className="flex items-center space-x-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span>
              {event.location.isVirtual ? 'Virtuel' : 
                [event.location.venue, event.location.city, event.location.country]
                  .filter(Boolean)
                  .join(', ')
              }
            </span>
          </div>
        )}
        
        {event.organizer && (
          <div className="flex items-center space-x-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
            <span>{event.organizer}</span>
          </div>
        )}
      </div>
      

      
      {event.tags && event.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-4">
          {event.tags.map((tag: string, index: number) => (
            <span
              key={index}
              className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
      
      {(event.website || event.registrationUrl) && (
        <div className="flex space-x-4 mt-6 pt-4 border-t border-gray-100">
          {event.website && (
            <a
              href={event.website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-600 hover:text-primary-700 text-sm font-medium"
            >
              Site web →
            </a>
          )}
          {event.registrationUrl && isUpcoming && (
            <a
              href={event.registrationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-600 hover:text-green-700 text-sm font-medium"
            >
              S&apos;inscrire →
            </a>
          )}
        </div>
      )}
    </article>
  );
}

export default async function EventsPage() {
  const events = await getEvents();
  
  // Sort events by date (upcoming first, then past events)
  const sortedEvents = events.sort((a: Event, b: Event) => {
    const dateA = new Date(a.startDate);
    const dateB = new Date(b.startDate);
    const now = new Date();
    
    const aIsUpcoming = dateA > now;
    const bIsUpcoming = dateB > now;
    
    if (aIsUpcoming && !bIsUpcoming) return -1;
    if (!aIsUpcoming && bIsUpcoming) return 1;
    
    if (aIsUpcoming && bIsUpcoming) {
      return dateA.getTime() - dateB.getTime(); // Upcoming: earliest first
    } else {
      return dateB.getTime() - dateA.getTime(); // Past: most recent first
    }
  });
  
  const upcomingEvents = sortedEvents.filter((event: Event) => new Date(event.startDate) > new Date());
  const pastEvents = sortedEvents.filter((event: Event) => new Date(event.endDate || event.startDate) < new Date());
  
  const jsonLd = generateJsonLd({
    type: 'WebPage',
    name: 'Events',
    url: `${process.env.NEXT_PUBLIC_SITE_URL}/events`,
    description: 'Conferences, workshops, and academic events by Dr. Ihababdelbasset ANNAKI.',
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
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-6">
              Événements
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Découvrez mes participations aux conférences, ateliers et événements académiques 
              dans les domaines de l&apos;Intelligence Artificielle et de la recherche.
            </p>
          </div>
          
          {/* Events Content */}
          {events.length > 0 ? (
            <>
              <div className="mb-8">
                <p className="text-gray-600">
                  <strong>{events.length}</strong> événement{events.length > 1 ? 's' : ''} trouvé{events.length > 1 ? 's' : ''}
                  {upcomingEvents.length > 0 && (
                    <> • <strong>{upcomingEvents.length}</strong> à venir</>
                  )}
                  {pastEvents.length > 0 && (
                    <> • <strong>{pastEvents.length}</strong> passé{pastEvents.length > 1 ? 's' : ''}</>
                  )}
                </p>
              </div>
              
              {/* Featured Events */}
              {events.some((event: Event) => event.featured) && (
                <section className="mb-16">
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-8">
                    Événements en Vedette
                  </h2>
                  <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
                    {events
                      .filter((event: Event) => event.featured)
                      .slice(0, 4)
                      .map((event: Event) => (
                        <EventCard key={event._id} event={event} />
                      ))}
                  </div>
                </section>
              )}
              
              {/* Upcoming Events */}
              {upcomingEvents.length > 0 && (
                <section className="mb-16">
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-8">
                    Événements à Venir
                  </h2>
                  <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
                    {upcomingEvents.map((event: Event) => (
                      <EventCard key={event._id} event={event} />
                    ))}
                  </div>
                </section>
              )}
              
              {/* Past Events */}
              {pastEvents.length > 0 && (
                <section>
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-8">
                    Événements Passés
                  </h2>
                  <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
                    {pastEvents.map((event: Event) => (
                      <EventCard key={event._id} event={event} />
                    ))}
                  </div>
                </section>
              )}
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
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">Aucun Événement</h2>
                <p className="text-gray-600">
                  Les événements apparaîtront ici une fois qu&apos;ils seront ajoutés dans le CMS Sanity.
                </p>
              </div>
            </div>
          )}
        </div>
      </main>
    </>
  );
}