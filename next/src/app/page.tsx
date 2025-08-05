import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { getFeaturedProjects, getFeaturedPublications, getFeaturedTeaching, getFeaturedEvents, urlFor } from '@/lib/sanity';
import { generateJsonLd } from '@/lib/jsonld';
import { Publication, Teaching, Event } from '@/lib/sanity-types';
import ContactForm from '@/components/ContactForm';

export const metadata: Metadata = {
  title: 'Pr. Ihababdelbasset Annaki- Academic Portfolio',
  description: 'Academic portfolio of Pr. Ihababdelbasset Annaki- Research in Computer Science, Publications, Teaching, and Educational Innovation.',
};

function HeroSection() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-white relative overflow-hidden">
      {/* Minimal geometric background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-1 h-32 bg-gradient-to-b from-blue-500/20 to-transparent rotate-45"></div>
        <div className="absolute top-1/3 right-1/3 w-1 h-24 bg-gradient-to-b from-purple-500/20 to-transparent -rotate-12"></div>
        <div className="absolute bottom-1/4 left-1/3 w-1 h-28 bg-gradient-to-b from-green-500/20 to-transparent rotate-12"></div>
      </div>
      
      <div className="max-w-6xl mx-auto px-6 text-center relative z-10">
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-full text-sm text-gray-600 mb-8">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            Disponible pour Collaboration de Recherche
          </div>
        </div>
        
        <h1 className="text-6xl md:text-8xl lg:text-9xl font-extralight text-gray-900 mb-6 tracking-tighter leading-none">
          Dr. Ihababdelbasset
          <br />
          <span className="font-bold text-black">
            ANNAKI
          </span>
        </h1>
        
        <div className="max-w-3xl mx-auto mb-16">
          <p className="text-2xl md:text-3xl text-gray-500 mb-8 font-light leading-relaxed">
            Maître de Conférences en Informatique
          </p>
          <p className="text-lg text-gray-400 leading-relaxed">
            École Supérieure de l'Éducation et de la Formation, Université Mohammed Premier Oujda
          </p>
          <p className="text-base text-gray-400 leading-relaxed mt-4">
            Spécialiste en Réalité Virtuelle, Intelligence Artificielle et Séries Temporelles appliquées aux Neurosciences et Processus Cognitifs
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-20">
          <Link
            href="/research"
            className="group bg-black hover:bg-gray-800 text-white font-medium py-4 px-12 transition-all duration-200 text-sm uppercase tracking-wider"
          >
            Portfolio Recherche
          </Link>
          
          <Link
            href="/publications"
            className="group border border-gray-300 hover:border-black text-gray-700 hover:text-black font-medium py-4 px-12 transition-all duration-200 text-sm uppercase tracking-wider"
          >
            Publications
          </Link>
        </div>
        
        <div className="flex justify-center items-center gap-12 text-xs text-gray-400 uppercase tracking-widest">
          <div>Réalité Virtuelle</div>
          <div className="w-px h-4 bg-gray-300"></div>
          <div>Intelligence Artificielle</div>
          <div className="w-px h-4 bg-gray-300"></div>
          <div>Neurosciences</div>
        </div>
      </div>
    </section>
  );
}

function AboutSection() {
  return (
    <section id="about" className="py-32 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-12 gap-16 items-start">
          <div className="lg:col-span-7">
            <div className="mb-16">
              <div className="text-sm text-gray-400 uppercase tracking-[0.2em] mb-8">
                À Propos
              </div>
              <h2 className="text-5xl md:text-6xl font-extralight text-gray-900 mb-12 leading-tight">
                Faire Progresser l'
                <span className="font-bold">Avenir</span> des 
                Neurosciences Computationnelles
              </h2>
            </div>
            
            <div className="space-y-8 text-lg text-gray-600 leading-relaxed mb-16">
              <p>
                Mes recherches se situent à l'intersection de la réalité virtuelle, de l'intelligence artificielle 
                et des neurosciences computationnelles. À travers des approches rigoureuses d'analyse de séries 
                temporelles, j'explore les processus cognitifs et leur modélisation computationnelle.
              </p>
              
              <p>
                Je me spécialise dans le développement de systèmes d'IA adaptatifs pour l'analyse de données 
                neurophysiologiques, la création d'environnements de réalité virtuelle pour l'étude des processus 
                cognitifs, et l'application de techniques d'apprentissage automatique aux neurosciences.
              </p>
            </div>
            
            <div className="grid grid-cols-3 gap-12 mb-16">
              <div>
                <div className="text-4xl font-light text-black mb-2">50+</div>
                <div className="text-sm text-gray-400 uppercase tracking-wider">Publications</div>
              </div>
              <div>
                <div className="text-4xl font-light text-black mb-2">12+</div>
                <div className="text-sm text-gray-400 uppercase tracking-wider">Années Recherche</div>
              </div>
              <div>
                <div className="text-4xl font-light text-black mb-2">5</div>
                <div className="text-sm text-gray-400 uppercase tracking-wider">Prix</div>
              </div>
            </div>
            
            <Link
              href="/about"
              className="inline-block border-b border-gray-300 hover:border-black text-gray-700 hover:text-black transition-all duration-200 text-sm uppercase tracking-wider pb-1"
            >
              Profil Complet
            </Link>
          </div>
          
          <div className="lg:col-span-5">
            <div className="relative">
              <div className="aspect-[4/5] bg-gray-200 overflow-hidden">
                {/* Placeholder for academic photo */}
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  <div className="text-center">
                    <div className="w-20 h-20 bg-white mx-auto mb-4 flex items-center justify-center">
                      <svg className="w-10 h-10 text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                      </svg>
                    </div>
                    <p className="text-xs uppercase tracking-wider">Portrait Académique</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Publications Section
interface PublicationsSectionProps {
  publications: Publication[];
}

function PublicationsSection({ publications }: PublicationsSectionProps) {
  return (
    <section id="publications" className="py-32 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-24">
          <div className="text-sm text-gray-400 uppercase tracking-[0.2em] mb-8">
            Recherche Récente
          </div>
          <h2 className="text-5xl md:text-6xl font-extralight text-gray-900 mb-12 leading-tight max-w-4xl">
            <span className="font-bold">Publications</span> Sélectionnées
          </h2>
        </div>
        
        <div className="grid gap-12">
          {publications.slice(0, 3).map((publication, index) => (
            <div key={publication._id} className="group border-b border-gray-200 pb-12 last:border-b-0">
              <div className="grid lg:grid-cols-12 gap-8 items-start">
                <div className="lg:col-span-2">
                  <div className="text-xs text-gray-400 uppercase tracking-[0.2em] mb-2">
                    {String(index + 1).padStart(2, '0')}
                  </div>
                  <div className="text-sm text-gray-500">
                    {new Date(publication.publishedDate).getFullYear()}
                  </div>
                  <div className="text-xs text-gray-400 uppercase mt-2">
                    {publication.publicationType}
                  </div>
                </div>
                
                <div className="lg:col-span-10">
                  <h3 className="text-2xl font-light text-black mb-4 group-hover:text-gray-600 transition-colors duration-200">
                    <Link href={`/publications/${publication.slug.current}`}>
                      {publication.title}
                    </Link>
                  </h3>
                  
                  {publication.abstract && (
                    <p className="text-gray-600 leading-relaxed mb-4 line-clamp-3">
                      {publication.abstract}
                    </p>
                  )}
                  
                  <div className="flex flex-wrap items-center gap-4 text-sm">
                    {publication.journal && (
                      <span className="text-gray-500 italic">{publication.journal}</span>
                    )}
                    {publication.openAccess && (
                      <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs uppercase tracking-wider">
                        Accès Libre
                      </span>
                    )}
                    {publication.doi && (
                      <Link 
                        href={`https://doi.org/${publication.doi}`}
                        className="text-blue-600 hover:text-blue-800 transition-colors"
                        target="_blank"
                      >
                        DOI
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-16">
          <Link
            href="/publications"
            className="inline-block border-b border-gray-300 hover:border-black text-gray-700 hover:text-black transition-all duration-200 text-sm uppercase tracking-wider pb-1"
          >
            Voir Toutes les Publications
          </Link>
        </div>
      </div>
    </section>
  );
}

// Teaching Section
interface TeachingSectionProps {
  teaching: Teaching[];
}

function TeachingSection({ teaching }: TeachingSectionProps) {
  return (
    <section id="teaching" className="py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-24">
          <div className="text-sm text-gray-400 uppercase tracking-[0.2em] mb-8">
            Enseignement Académique
          </div>
          <h2 className="text-5xl md:text-6xl font-extralight text-gray-900 mb-12 leading-tight max-w-4xl">
            Expérience <span className="font-bold">Pédagogique</span>
          </h2>
        </div>
        
        <div className="grid md:grid-cols-2 gap-x-12 gap-y-16">
          {teaching.slice(0, 4).map((course, index) => (
            <div key={course._id} className="group">
              <div className="mb-6">
                <div className="text-xs text-gray-400 uppercase tracking-[0.2em] mb-3">
                  {String(index + 1).padStart(2, '0')}
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-2xl font-light text-black group-hover:text-gray-600 transition-colors duration-200">
                    {course.title}
                  </h3>
                  {course.current && (
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  )}
                </div>
                {course.courseCode && (
                  <div className="text-sm text-gray-500 mb-2">{course.courseCode}</div>
                )}
                <div className="text-sm text-gray-400">
                  {course.institution} • {course.semester}
                </div>
              </div>
              
              {course.description && (
                <p className="text-gray-600 leading-relaxed text-sm mb-4">
                  {course.description}
                </p>
              )}
              
              {course.technologies && course.technologies.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {course.technologies.slice(0, 3).map((tech, techIndex) => (
                    <span key={techIndex} className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                      {tech}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
        
        <div className="text-center mt-16">
          <Link
            href="/teaching"
            className="inline-block border-b border-gray-300 hover:border-black text-gray-700 hover:text-black transition-all duration-200 text-sm uppercase tracking-wider pb-1"
          >
            Voir Tous les Cours
          </Link>
        </div>
      </div>
    </section>
  );
}

// Events Section
interface EventsSectionProps {
  events: Event[];
}

function EventsSection({ events }: EventsSectionProps) {
  return (
    <section id="events" className="py-32 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-24">
          <div className="text-sm text-gray-400 uppercase tracking-[0.2em] mb-8">
            Événements Académiques
          </div>
          <h2 className="text-5xl md:text-6xl font-extralight text-gray-900 mb-12 leading-tight max-w-4xl">
            Conférences & <span className="font-bold">Événements</span>
          </h2>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.slice(0, 6).map((event, index) => (
            <div key={event._id} className="group bg-white p-8 hover:shadow-lg transition-shadow duration-300">
              <div className="mb-6">
                <div className="text-xs text-gray-400 uppercase tracking-[0.2em] mb-3">
                  {String(index + 1).padStart(2, '0')}
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <span className={`px-2 py-1 rounded text-xs uppercase tracking-wider ${
                    event.status === 'upcoming' ? 'bg-blue-100 text-blue-700' :
                    event.status === 'ongoing' ? 'bg-green-100 text-green-700' :
                    'bg-gray-100 text-gray-600'
                  }`}>
                    {event.status === 'upcoming' ? 'À venir' : 
                     event.status === 'ongoing' ? 'En cours' : 
                     event.status === 'completed' ? 'Terminé' : event.status}
                  </span>
                  <span className="text-xs text-gray-400 uppercase">
                    {event.eventType}
                  </span>
                </div>
              </div>
              
              <h3 className="text-xl font-light text-black mb-4 group-hover:text-gray-600 transition-colors duration-200">
                <Link href={`/events/${event.slug.current}`}>
                  {event.title}
                </Link>
              </h3>
              
              <div className="text-sm text-gray-500 mb-4">
                <div>{new Date(event.startDate).toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}</div>
                {event.location?.venue && (
                  <div className="mt-1">{event.location.venue}</div>
                )}
              </div>
              
              {event.description && (
                <p className="text-gray-600 leading-relaxed text-sm line-clamp-3">
                  {event.description}
                </p>
              )}
            </div>
          ))}
        </div>
        
        <div className="text-center mt-16">
          <Link
            href="/events"
            className="inline-block border-b border-gray-300 hover:border-black text-gray-700 hover:text-black transition-all duration-200 text-sm uppercase tracking-wider pb-1"
          >
            Voir Tous les Événements
          </Link>
        </div>
      </div>
    </section>
  );
}

import { Project } from '@/lib/sanity-types';

interface FeaturedProjectsProps {
  projects: Project[];
}

function FeaturedProjects({ projects }: FeaturedProjectsProps) {
  const featuredProjects = projects.filter((p: Project) => p.featured).slice(0, 3);

  if (featuredProjects.length === 0) {
    return null;
  }

  return (
    <section className="section-padding">
      <div className="container-max">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Projets Sélectionnés
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Une sélection de mes travaux récents qui illustrent mes compétences et ma créativité.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProjects.map((project: Project) => {
            const imageUrl = project.featuredImage?.asset ? urlFor(project.featuredImage).width(400).height(300).url() : '/placeholder-project.jpg';
            
            return (
              <article key={project._id} className="card overflow-hidden group">
                <div className="relative aspect-video overflow-hidden">
                  {imageUrl ? (
                    <Image
                      src={imageUrl}
                      alt={project.featuredImage?.alt || project.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                      <span className="text-gray-500">Aucune image</span>
                    </div>
                  )}
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-2">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies?.slice(0, 3).map((tech: string, index: number) => (
                      <span
                        key={index}
                        className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <Link
                    href={`/projects/${project.slug.current}`}
                    className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium"
                  >
                    Voir le Projet
                    <svg
                      className="ml-1 w-4 h-4 transition-transform group-hover:translate-x-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
        
        <div className="text-center mt-12">
          <Link href="/projects" className="btn-primary">
            Voir Tous les Projets
          </Link>
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section id="contact" className="py-32 bg-black text-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-16">
            <h2 className="text-5xl md:text-6xl font-extralight mb-12 leading-tight">
              Faisons Progresser 
              <span className="font-bold">l'Informatique</span> 
              Ensemble
            </h2>
            
            <p className="text-xl text-gray-400 leading-relaxed max-w-2xl mx-auto">
              Intéressé par une collaboration, des partenariats de recherche ou une consultation académique ? 
              Je suis toujours ouvert aux conversations significatives sur l'avenir de la technologie et de l'éducation.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-20">
            <Link
              href="/contact"
              className="bg-white hover:bg-gray-100 text-black font-medium py-4 px-12 transition-all duration-200 text-sm uppercase tracking-wider"
            >
              Commencer une Conversation
            </Link>
            
            <Link
              href="/cv"
              className="border border-gray-600 hover:border-white text-white hover:text-white font-medium py-4 px-12 transition-all duration-200 text-sm uppercase tracking-wider"
            >
              Télécharger CV
            </Link>
          </div>
          
          <div className="flex justify-center items-center gap-12 text-xs text-gray-500 uppercase tracking-widest">
            <div className="flex items-center gap-2">
              <div className="w-1 h-1 bg-green-500 rounded-full"></div>
              Ouvert à la Collaboration
            </div>
            <div className="w-px h-4 bg-gray-700"></div>
            <div>Partenariats Internationaux</div>
            <div className="w-px h-4 bg-gray-700"></div>
            <div>Consultation Académique</div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default async function HomePage() {
  const [projects, publications, teaching, events] = await Promise.all([
    getFeaturedProjects(),
    getFeaturedPublications(),
    getFeaturedTeaching(),
    getFeaturedEvents()
  ]);
  
  const jsonLd = generateJsonLd({
    type: 'Person',
    name: 'Pr. Ihababdelbasset Annaki',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://localhost:3000',
    description: 'Academic portfolio of Pr. Ihababdelbasset Annaki- Research in Computer Science, Publications, Teaching, and Educational Innovation.',
    jobTitle: 'Computer Science Researcher',
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <HeroSection />
      <AboutSection />
      <PublicationsSection publications={publications} />
      <TeachingSection teaching={teaching} />
      <EventsSection events={events} />
      <FeaturedProjects projects={projects} />
      <CTASection />
    </>
  );
}