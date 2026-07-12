'use client';

import { useState } from 'react';
import { Locale } from '@/lib/dictionaries';

export interface Event {
  id: string;
  title: string;
  description: string;
  startDate: string;
  endDate?: string;
  type: string;
  location: string;
  isVirtual: boolean;
  organizer: string;
  featured: boolean;
  details: string[];
}

interface EventsClientProps {
  dict: { events?: Record<string, string> };
  lang: Locale;
  events: Event[];
}

export default function EventsClient({ dict, lang, events }: EventsClientProps) {
  const eDict = dict.events || {};
  
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [filterType, setFilterType] = useState<string>('all');
  
  const eventTypes = ['all', ...Array.from(new Set(events.map(ev => ev.type)))];
  
  const filteredEvents = filterType === 'all' 
    ? events 
    : events.filter(ev => ev.type === filterType);

  const sortedEvents = [...filteredEvents].sort((a, b) => 
    new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
  );

  const upcomingEvents = sortedEvents.filter(ev => new Date(ev.startDate) > new Date());
  const pastEvents = sortedEvents.filter(ev => new Date(ev.startDate) <= new Date());

  const formatEventDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString(lang === 'ar' ? 'ar-EG' : lang === 'fr' ? 'fr-FR' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatEventDateMonthYear = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString(lang === 'ar' ? 'ar-EG' : lang === 'fr' ? 'fr-FR' : 'en-US', {
      year: 'numeric',
      month: 'long'
    });
  };

  if (selectedEvent) {
    return (
      <div className="min-h-screen bg-white py-32">
        <div className="max-w-4xl mx-auto px-6">
          <button
            onClick={() => setSelectedEvent(null)}
            className="mb-12 flex items-center gap-3 text-mckinsey-teal-500 hover:text-mckinsey-teal-400 transition-colors text-sm tracking-normal"
          >
            <svg className="w-4 h-4 mr-2 rotate-180 group-hover:-translate-x-1 rtl:rotate-0 rtl:group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
            </svg>
            {eDict.back_to_list || 'Retour aux Ã©vÃ©nements'}
          </button>

          <div className="bg-mckinsey-gray-50 border border-white/5 p-12">
            <div className="flex items-center gap-3 mb-8">
              <span className="px-3 py-1 bg-mckinsey-gray-100 text-mckinsey-teal-500 text-xs tracking-wider rounded border border-mckinsey-teal-500/20">
                {selectedEvent.type}
              </span>
              {selectedEvent.isVirtual && (
                <span className="px-3 py-1 bg-mckinsey-gray-100 text-mckinsey-gray-600 text-xs tracking-wider rounded border border-white/10">
                  {eDict.online || 'En ligne'}
                </span>
              )}
              {selectedEvent.featured && (
                <span className="px-3 py-1 bg-mckinsey-teal-500/10 text-mckinsey-teal-400 text-xs tracking-wider rounded border border-mckinsey-teal-500/20">
                  {eDict.featured || 'â­ En vedette'}
                </span>
              )}
            </div>

            <h1 className="text-3xl md:text-4xl font-sans font-medium text-mckinsey-navy-800 mb-6 leading-tight">
              {selectedEvent.title}
            </h1>

            <div className="flex flex-wrap items-center gap-8 text-mckinsey-gray-700 mb-8 text-sm tracking-wider">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-mckinsey-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span>
                  {formatEventDate(selectedEvent.startDate)}
                  {selectedEvent.endDate && ` - ${formatEventDate(selectedEvent.endDate)}`}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-mckinsey-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>{selectedEvent.location}</span>
              </div>
            </div>

            <p className="text-lg text-mckinsey-gray-600 mb-10 leading-relaxed font-normal border-l-2 border-mckinsey-teal-500/30 pl-6 rtl:border-l-0 rtl:border-r-2 rtl:pl-0 rtl:pr-6">
              {selectedEvent.description}
            </p>

            <div className="bg-white border border-white/5 p-8 mb-8">
              <h2 className="text-xl font-sans font-medium text-mckinsey-navy-800 mb-6">{eDict.details_label || 'DÃ©tails'}</h2>
              <ul className="space-y-4">
                {selectedEvent.details.map((detail, index) => (
                  <li key={index} className="flex items-start gap-4 text-mckinsey-gray-600 font-normal">
                    <svg className="w-5 h-5 text-mckinsey-teal-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-8 border-t border-white/5">
              <p className="text-sm text-mckinsey-gray-700 tracking-wider">
                <span className="text-mckinsey-teal-500">{eDict.organized_by || 'OrganisÃ© par :'}</span> {selectedEvent.organizer}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white py-32">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-24">
          <div className="inline-flex items-center gap-2 px-4 py-2 border border-mckinsey-teal-500/20 rounded-full text-xs tracking-normal text-mckinsey-teal-500 mb-8">
            <div className="w-1.5 h-1.5 bg-mckinsey-teal-500 rounded-full"></div>
            {eDict.badge || 'Agenda'}
          </div>
          <h1 className="text-5xl md:text-7xl font-sans font-medium text-mckinsey-navy-800 mb-8">
            {eDict.title || 'Ã‰vÃ©nements'} <span className="text-mckinsey-teal-500 italic">&amp;</span> {eDict.title_gradient || 'ConfÃ©rences'}
          </h1>
          <p className="text-xl text-mckinsey-gray-600 max-w-3xl mx-auto font-normal leading-relaxed">
            {eDict.desc || 'ConfÃ©rences, workshops et sÃ©minaires'}
          </p>
          
          {/* Filter */}
          <div className="flex justify-center gap-4 flex-wrap mt-12">
            {eventTypes.map((type) => (
              <button
                key={type}
                onClick={() => setFilterType(type)}
                className={`px-6 py-2 text-sm uppercase tracking-normal transition-all duration-300 ${
                  filterType === type
                    ? 'bg-mckinsey-teal-500 text-mckinsey-navy-800 font-medium'
                    : 'bg-transparent text-mckinsey-gray-700 hover:text-mckinsey-navy-800 border border-white/10 hover:border-mckinsey-teal-500/50'
                }`}
              >
                {type === 'all' ? (eDict.filter_all || 'Tous') : type}
              </button>
            ))}
          </div>
        </div>

        {/* Upcoming Events */}
        {upcomingEvents.length > 0 && (
          <section className="mb-20">
            <h2 className="text-3xl font-sans font-medium text-mckinsey-navy-800 mb-10 flex items-center gap-4">
              <span className="w-8 h-px bg-mckinsey-teal-500"></span>
              {eDict.upcoming || 'Ã€ venir'} ({upcomingEvents.length})
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {upcomingEvents.map((event) => (
                <article
                  key={event.id}
                  className="group bg-mckinsey-gray-50 border border-mckinsey-teal-500/30 p-8 hover:border-mckinsey-teal-500 transition-all duration-500 cursor-pointer relative overflow-hidden"
                  onClick={() => setSelectedEvent(event)}
                >
                  <div className="absolute top-0 right-0 w-24 h-24 bg-mckinsey-teal-500/5 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-150 duration-700"></div>
                  
                  <div className="flex items-center gap-3 mb-6 relative">
                    <span className="px-3 py-1 bg-mckinsey-teal-500 text-mckinsey-navy-800 text-xs tracking-wider font-medium">
                      {eDict.upcoming || 'Ã€ venir'}
                    </span>
                    <span className="px-3 py-1 bg-mckinsey-gray-100 text-mckinsey-teal-500 text-xs tracking-wider border border-mckinsey-teal-500/20">
                      {event.type}
                    </span>
                  </div>

                  <h3 className="text-2xl font-sans font-medium text-mckinsey-navy-800 mb-4 group-hover:text-mckinsey-teal-500 transition-colors">
                    {event.title}
                  </h3>

                  <p className="text-mckinsey-gray-600 mb-6 line-clamp-2 font-normal">
                    {event.description}
                  </p>

                  <div className="flex items-center gap-6 text-xs tracking-wider text-mckinsey-gray-700 border-t border-white/5 pt-6">
                    <span className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-mckinsey-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      {formatEventDate(event.startDate)}
                    </span>
                    <span className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-mckinsey-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      </svg>
                      {event.location}
                    </span>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}

        {/* Past Events */}
        <section>
          <h2 className="text-3xl font-sans font-medium text-mckinsey-navy-800 mb-10 flex items-center gap-4">
            <span className="w-8 h-px bg-mckinsey-gray-200"></span>
            {eDict.past || 'Ã‰vÃ©nements passÃ©s'} ({pastEvents.length})
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {pastEvents.map((event) => (
              <article
                key={event.id}
                className="group bg-mckinsey-gray-50 border border-white/5 p-8 hover:border-mckinsey-teal-500/30 transition-all duration-500 cursor-pointer"
                onClick={() => setSelectedEvent(event)}
              >
                <div className="flex items-center gap-3 mb-6">
                  <span className="px-3 py-1 bg-mckinsey-gray-100 text-mckinsey-gray-600 text-xs tracking-wider border border-white/10">
                    {event.type}
                  </span>
                  {event.featured && (
                    <span className="text-mckinsey-teal-500 text-xs">
                      â­
                    </span>
                  )}
                </div>

                <h3 className="text-xl font-sans font-medium text-mckinsey-navy-800 mb-3 group-hover:text-mckinsey-teal-500 transition-colors">
                  {event.title}
                </h3>

                <p className="text-mckinsey-gray-700 text-sm mb-6 line-clamp-2 font-normal">
                  {event.description}
                </p>

                <div className="text-xs tracking-wider text-mckinsey-gray-600 group-hover:text-mckinsey-teal-500/70 transition-colors">
                  {formatEventDateMonthYear(event.startDate)}
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

