'use client';
import { useState } from 'react';

interface Event {
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

const events: Event[] = [
  {
    id: 'icdta-2023',
    title: 'ICDTA 2023 - Digital Technologies and Applications',
    description: 'Conférence internationale sur les technologies numériques et leurs applications. Présentation de mes travaux sur le clustering temporal pour la modélisation du comportement humain.',
    startDate: '2023-01-27',
    endDate: '2023-01-28',
    type: 'Conférence',
    location: 'Fès, Maroc',
    isVirtual: false,
    organizer: 'IEEE',
    featured: true,
    details: [
      'Présentation: "Joint Unsupervised Deep Temporal Clustering for Modeling Human Behavior"',
      'Session: AI & Machine Learning Track',
      'Publication dans Lecture Notes in Networks and Systems',
      'Plus de 200 participants internationaux'
    ]
  },
  {
    id: 'icoa-2022',
    title: 'ICOA 2022 - Optimization and Applications',
    description: 'Conférence sur les algorithmes d\'optimisation et applications. Discussion sur l\'utilisation de DBSCAN pour l\'analyse de navigation spatiale.',
    startDate: '2022-04-20',
    endDate: '2022-04-21',
    type: 'Conférence',
    location: 'Oujda, Maroc',
    isVirtual: false,
    organizer: 'Université Mohammed Premier',
    featured: true,
    details: [
      'Présentation: "Computational Analysis Using DBSCAN"',
      'Session spéciale sur l\'IA en neuropsychologie',
      'Networking avec chercheurs internationaux',
      'Prix de la meilleure présentation étudiante'
    ]
  },
  {
    id: 'icdta-2021',
    title: 'ICDTA 2021 - Digital Technologies and Applications',
    description: 'Première présentation publique du VR Magic Carpet et analyse computationnelle des trajectoires de navigation humaine.',
    startDate: '2021-01-29',
    endDate: '2021-01-30',
    type: 'Conférence',
    location: 'Fès, Maroc',
    isVirtual: false,
    organizer: 'IEEE',
    featured: true,
    details: [
      'Présentation: "Computational Analysis of Human Navigation Trajectories"',
      'Démonstration live du système VR',
      '9 citations à ce jour',
      'Session interactive avec retours d\'experts'
    ]
  },
  {
    id: 'workshop-ml-2024',
    title: 'Workshop Machine Learning pour Débutants',
    description: 'Atelier pratique d\'introduction au Machine Learning avec Python, Scikit-learn et PyTorch.',
    startDate: '2024-03-15',
    type: 'Workshop',
    location: 'ENSA Oujda, Maroc',
    isVirtual: false,
    organizer: 'LARSA Lab',
    featured: false,
    details: [
      'Introduction aux concepts fondamentaux du ML',
      'TP pratiques avec Jupyter Notebooks',
      'Projet fil rouge: prédiction et classification',
      '50+ étudiants participants'
    ]
  },
  {
    id: 'seminaire-vr-2024',
    title: 'Séminaire: VR en Neuropsychologie',
    description: 'Séminaire de recherche sur l\'utilisation de la réalité virtuelle pour l\'évaluation neuropsychologique.',
    startDate: '2024-05-20',
    type: 'Séminaire',
    location: 'Université Mohammed Premier',
    isVirtual: false,
    organizer: 'Faculté des Sciences',
    featured: true,
    details: [
      'Présentation du VR Magic Carpet',
      'Résultats de 3 ans de recherche',
      'Discussion avec professeurs et doctorants',
      'Perspectives de collaboration'
    ]
  },
  {
    id: 'webinar-python-2024',
    title: 'Webinar: Python pour la Data Science',
    description: 'Séminaire en ligne gratuit sur l\'utilisation de Python pour l\'analyse de données.',
    startDate: '2024-11-10',
    type: 'Webinar',
    location: 'En ligne',
    isVirtual: true,
    organizer: 'Dr. Annaki',
    featured: false,
    details: [
      'Pandas et NumPy pour la manipulation de données',
      'Visualisation avec Matplotlib et Seaborn',
      'Introduction au Machine Learning avec Scikit-learn',
      'Session Q&A interactive'
    ]
  }
];

export default function EventsPage() {
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [filterType, setFilterType] = useState<string>('all');
  
  const eventTypes = ['all', ...Array.from(new Set(events.map(e => e.type)))];
  
  const filteredEvents = filterType === 'all' 
    ? events 
    : events.filter(e => e.type === filterType);

  const sortedEvents = [...filteredEvents].sort((a, b) => 
    new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
  );

  const upcomingEvents = sortedEvents.filter(e => new Date(e.startDate) > new Date());
  const pastEvents = sortedEvents.filter(e => new Date(e.startDate) <= new Date());

  if (selectedEvent) {
    return (
      <div className="min-h-screen bg-white py-32">
        <div className="max-w-4xl mx-auto px-6">
          <button
            onClick={() => setSelectedEvent(null)}
            className="mb-12 flex items-center gap-3 text-mckinsey-teal-500 hover:text-mckinsey-teal-400 transition-colors text-sm  tracking-normal"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
            </svg>
            Retour aux événements
          </button>

          <div className="bg-mckinsey-gray-50 border border-white/5 p-12">
            <div className="flex items-center gap-3 mb-8">
              <span className="px-3 py-1 bg-mckinsey-gray-100 text-mckinsey-teal-500 text-xs  tracking-wider rounded border border-mckinsey-teal-500/20">
                {selectedEvent.type}
              </span>
              {selectedEvent.isVirtual && (
                <span className="px-3 py-1 bg-mckinsey-gray-100 text-mckinsey-gray-600 text-xs  tracking-wider rounded border border-white/10">
                  En ligne
                </span>
              )}
              {selectedEvent.featured && (
                <span className="px-3 py-1 bg-mckinsey-teal-500/10 text-mckinsey-teal-400 text-xs  tracking-wider rounded border border-mckinsey-teal-500/20">
                  ⭐ En vedette
                </span>
              )}
            </div>

            <h1 className="text-3xl md:text-4xl font-sans font-medium text-mckinsey-navy-800 mb-6 leading-tight">
              {selectedEvent.title}
            </h1>

            <div className="flex flex-wrap items-center gap-8 text-mckinsey-gray-700 mb-8 text-sm  tracking-wider">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-mckinsey-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span>
                  {new Date(selectedEvent.startDate).toLocaleDateString('fr-FR', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                  {selectedEvent.endDate && ` - ${new Date(selectedEvent.endDate).toLocaleDateString('fr-FR', {
                    month: 'long',
                    day: 'numeric'
                  })}`}
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

            <p className="text-lg text-mckinsey-gray-600 mb-10 leading-relaxed font-normal border-l-2 border-mckinsey-teal-500/30 pl-6">
              {selectedEvent.description}
            </p>

            <div className="bg-white border border-white/5 p-8 mb-8">
              <h2 className="text-xl font-sans font-medium text-mckinsey-navy-800 mb-6">Détails</h2>
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
              <p className="text-sm text-mckinsey-gray-700  tracking-wider">
                <span className="text-mckinsey-teal-500">Organisé par :</span> {selectedEvent.organizer}
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
          <div className="inline-flex items-center gap-2 px-4 py-2 border border-mckinsey-teal-500/20 rounded-full text-xs  tracking-normal text-mckinsey-teal-500 mb-8">
            <div className="w-1.5 h-1.5 bg-mckinsey-teal-500 rounded-full"></div>
            Agenda
          </div>
          <h1 className="text-5xl md:text-7xl font-sans font-medium text-mckinsey-navy-800 mb-8">
            Événements <span className="text-mckinsey-teal-500 italic">&</span> Conférences
          </h1>
          <p className="text-xl text-mckinsey-gray-600 max-w-3xl mx-auto font-normal leading-relaxed">
            Conférences, workshops et séminaires en Intelligence Artificielle et Réalité Virtuelle
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
                {type === 'all' ? 'Tous' : type}
              </button>
            ))}
          </div>
        </div>

        {/* Upcoming Events */}
        {upcomingEvents.length > 0 && (
          <section className="mb-20">
            <h2 className="text-3xl font-sans font-medium text-mckinsey-navy-800 mb-10 flex items-center gap-4">
              <span className="w-8 h-px bg-mckinsey-teal-500"></span>
              À venir ({upcomingEvents.length})
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
                    <span className="px-3 py-1 bg-mckinsey-teal-500 text-mckinsey-navy-800 text-xs  tracking-wider font-medium">
                      À venir
                    </span>
                    <span className="px-3 py-1 bg-mckinsey-gray-100 text-mckinsey-teal-500 text-xs  tracking-wider border border-mckinsey-teal-500/20">
                      {event.type}
                    </span>
                  </div>

                  <h3 className="text-2xl font-sans font-medium text-mckinsey-navy-800 mb-4 group-hover:text-mckinsey-teal-500 transition-colors">
                    {event.title}
                  </h3>

                  <p className="text-mckinsey-gray-600 mb-6 line-clamp-2 font-normal">
                    {event.description}
                  </p>

                  <div className="flex items-center gap-6 text-xs  tracking-wider text-mckinsey-gray-700 border-t border-white/5 pt-6">
                    <span className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-mckinsey-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      {new Date(event.startDate).toLocaleDateString('fr-FR')}
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
            Événements passés ({pastEvents.length})
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {pastEvents.map((event) => (
              <article
                key={event.id}
                className="group bg-mckinsey-gray-50 border border-white/5 p-8 hover:border-mckinsey-teal-500/30 transition-all duration-500 cursor-pointer"
                onClick={() => setSelectedEvent(event)}
              >
                <div className="flex items-center gap-3 mb-6">
                  <span className="px-3 py-1 bg-mckinsey-gray-100 text-mckinsey-gray-600 text-xs  tracking-wider border border-white/10">
                    {event.type}
                  </span>
                  {event.featured && (
                    <span className="text-mckinsey-teal-500 text-xs">
                      ⭐
                    </span>
                  )}
                </div>

                <h3 className="text-xl font-sans font-medium text-mckinsey-navy-800 mb-3 group-hover:text-mckinsey-teal-500 transition-colors">
                  {event.title}
                </h3>

                <p className="text-mckinsey-gray-700 text-sm mb-6 line-clamp-2 font-normal">
                  {event.description}
                </p>

                <div className="text-xs  tracking-wider text-mckinsey-gray-600 group-hover:text-mckinsey-teal-500/70 transition-colors">
                  {new Date(event.startDate).toLocaleDateString('fr-FR', {
                    year: 'numeric',
                    month: 'long'
                  })}
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}