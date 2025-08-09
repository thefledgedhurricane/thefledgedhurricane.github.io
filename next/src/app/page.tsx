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

import SmoothScroll from '@/components/SmoothScroll';

function HeroSection() {
  return (
  <section className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-950 relative overflow-hidden transition-colors">
      {/* Minimal geometric background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-1 h-32 bg-gradient-to-b from-blue-500/20 to-transparent rotate-45"></div>
        <div className="absolute top-1/3 right-1/3 w-1 h-24 bg-gradient-to-b from-purple-500/20 to-transparent -rotate-12"></div>
        <div className="absolute bottom-1/4 left-1/3 w-1 h-28 bg-gradient-to-b from-green-500/20 to-transparent rotate-12"></div>
      </div>
      
      <div className="max-w-6xl mx-auto px-6 text-center relative z-10">
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-50 dark:bg-gray-800/70 border border-gray-200 dark:border-gray-700 rounded-full text-sm text-gray-600 dark:text-gray-300 mb-8 backdrop-blur-sm">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            Disponible pour Collaboration de Recherche
          </div>
        </div>
        
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-extralight text-gray-900 dark:text-gray-100 mb-6 tracking-tighter leading-none">
          Dr. Ihababdelbasset
          <br />
          <span className="font-bold text-black dark:text-white">
            ANNAKI
          </span>
        </h1>
        
        <div className="max-w-3xl mx-auto mb-16">
          <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-gray-500 dark:text-gray-300 mb-8 font-light leading-relaxed">
            Maître de Conférences en Intelligence Artificielle et Développement Avancé
          </p>
          <p className="text-base sm:text-lg text-gray-400 dark:text-gray-400 leading-relaxed">
            École Supérieure de l&apos;Éducation et de la Formation, Université Mohammed Premier Oujda
          </p>
          <p className="text-sm sm:text-base text-gray-400 dark:text-gray-500 leading-relaxed mt-4">
            Spécialiste en Réalité Virtuelle, Intelligence Artificielle et Séries Temporelles appliquées aux Neurosciences et Processus Cognitifs
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-20">
          <Link
            href="/research"
            className="group bg-black dark:bg-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 text-white font-medium py-4 px-12 transition-all duration-200 text-sm uppercase tracking-wider"
          >
            Portfolio Recherche
          </Link>
          
          <Link
            href="/publications"
            className="group border border-gray-300 dark:border-gray-600 hover:border-black dark:hover:border-white text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white font-medium py-4 px-12 transition-all duration-200 text-sm uppercase tracking-wider"
          >
            Publications
          </Link>
        </div>
        
        <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-8 lg:gap-12 text-xs text-gray-400 dark:text-gray-500 uppercase tracking-widest">
          <div>Réalité Virtuelle</div>
          <div className="hidden sm:block w-px h-4 bg-gray-300 dark:bg-gray-700"></div>
          <div>Intelligence Artificielle</div>
          <div className="hidden sm:block w-px h-4 bg-gray-300 dark:bg-gray-700"></div>
          <div>Neurosciences</div>
        </div>
      </div>
    </section>
  );
}

function AboutSection() {
  return (
    <section id="about" className="py-32 bg-gray-50 dark:bg-gray-950 transition-colors">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-16 items-start">
          <div className="lg:col-span-7">
            <div className="mb-16">
              <div className="text-sm text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em] mb-8">
                À Propos
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extralight text-gray-900 dark:text-gray-100 mb-8 lg:mb-12 leading-tight">
                Faire Progresser l&apos;
                <span className="font-bold dark:text-white">Intelligence</span> Artificielle et le 
                Développement Avancé
              </h2>
            </div>
            
            <div className="space-y-8 text-lg text-gray-600 dark:text-gray-400 leading-relaxed mb-16">
              <p>
                Mes recherches se concentrent sur l&apos;Intelligence Artificielle et le développement avancé, 
                avec une expertise particulière dans l&apos;application de techniques d&apos;IA modernes aux défis 
                technologiques contemporains. Mon approche combine recherche académique rigoureuse et 
                expérience pratique en consulting.
              </p>
              
              <p>
                Je me spécialise dans le développement de solutions IA innovantes, l&apos;architecture de systèmes 
                avancés, et l&apos;accompagnement d&apos;entreprises dans leur transformation numérique. Mon expertise 
                couvre 6 ans de recherche académique et 2 ans d&apos;expérience en consulting technologique.
              </p>
            </div>
            
            <div className="grid grid-cols-3 gap-12 mb-16">
              <div>
                <div className="text-4xl font-light text-black dark:text-white mb-2">10</div>
                <div className="text-sm text-gray-400 dark:text-gray-500 uppercase tracking-wider">Publications</div>
              </div>
              <div>
                <div className="text-4xl font-light text-black dark:text-white mb-2">6</div>
                <div className="text-sm text-gray-400 dark:text-gray-500 uppercase tracking-wider">Années Recherche</div>
              </div>
              <div>
                <div className="text-4xl font-light text-black dark:text-white mb-2">2</div>
                <div className="text-sm text-gray-400 dark:text-gray-500 uppercase tracking-wider">Années Consulting</div>
              </div>
            </div>
            
            <Link
              href="/about"
              className="inline-block border-b border-gray-300 dark:border-gray-600 hover:border-black dark:hover:border-white text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white transition-all duration-200 text-sm uppercase tracking-wider pb-1"
            >
              Profil Complet
            </Link>
          </div>
          
          <div className="lg:col-span-5">
            <div className="relative">
              <div className="aspect-[4/5] bg-gray-100 dark:bg-gray-800 overflow-hidden shadow-sm">
                {/* Portrait académique */}
                <Image
                  src="/portrait-academique.jpg"
                  alt="Portrait académique de Dr. Ihababdelbasset Annaki"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-500"
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
                />
              </div>
              {/* Overlay décoratif optionnel */}
              <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-black/5 dark:bg-white/10 -z-10"></div>
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
    <section id="publications" className="py-32 bg-gray-50 dark:bg-gray-950 transition-colors">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-24">
          <div className="text-sm text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em] mb-8">
            Recherche Récente
          </div>
          <h2 className="text-5xl md:text-6xl font-extralight text-gray-900 dark:text-gray-100 mb-12 leading-tight max-w-4xl">
            <span className="font-bold">Publications</span> Sélectionnées
          </h2>
        </div>
        
        <div className="grid gap-12">
          {publications.slice(0, 3).map((publication, index) => (
            <div key={publication._id} className="group border-b border-gray-200 dark:border-gray-800 pb-12 last:border-b-0">
              <div className="grid lg:grid-cols-12 gap-8 items-start">
                <div className="lg:col-span-2">
                  <div className="text-xs text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em] mb-2">
                    {String(index + 1).padStart(2, '0')}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {new Date(publication.publishedDate).getFullYear()}
                  </div>
                  <div className="text-xs text-gray-400 dark:text-gray-500 uppercase mt-2">
                    {publication.publicationType}
                  </div>
                </div>
                
                <div className="lg:col-span-10">
                  <h3 className="text-2xl font-light text-black dark:text-gray-100 mb-4 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors duration-200">
                    <Link href={`/publications/${publication.slug.current}`}>
                      {publication.title}
                    </Link>
                  </h3>
                  
                  {publication.abstract && (
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4 line-clamp-3">
                      {publication.abstract}
                    </p>
                  )}
                  
                  <div className="flex flex-wrap items-center gap-4 text-sm">
                    {publication.journal && (
                      <span className="text-gray-500 dark:text-gray-400 italic">{publication.journal}</span>
                    )}
                    {publication.openAccess && (
                      <span className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded text-xs uppercase tracking-wider">
                        Accès Libre
                      </span>
                    )}
                    {publication.doi && (
                      <Link 
                        href={`https://doi.org/${publication.doi}`}
                        className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
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
            className="inline-block border-b border-gray-300 dark:border-gray-600 hover:border-black dark:hover:border-white text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white transition-all duration-200 text-sm uppercase tracking-wider pb-1"
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
  <section id="teaching" className="py-32 bg-white dark:bg-gray-950 transition-colors">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-24">
          <div className="text-sm text-gray-400 uppercase tracking-[0.2em] mb-8">
            Enseignement Académique
          </div>
          <h2 className="text-5xl md:text-6xl font-extralight text-gray-900 dark:text-gray-100 mb-12 leading-tight max-w-4xl">
            Expérience <span className="font-bold dark:text-white">Pédagogique</span>
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
                  <h3 className="text-2xl font-light text-black dark:text-gray-100 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors duration-200">
                    {course.title}
                  </h3>
                  {course.current && (
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  )}
                </div>
                {course.courseCode && (
                  <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">{course.courseCode}</div>
                )}
                <div className="text-sm text-gray-400 dark:text-gray-500">
                  {course.institution} • {course.semester}
                </div>
              </div>
              
              {course.description && (
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm mb-4">
                  {course.description}
                </p>
              )}
              
              {course.technologies && course.technologies.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {course.technologies.slice(0, 3).map((tech, techIndex) => (
                    <span key={techIndex} className="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 rounded text-xs">
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
            className="inline-block border-b border-gray-300 dark:border-gray-600 hover:border-black dark:hover:border-white text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white transition-all duration-200 text-sm uppercase tracking-wider pb-1"
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
    <section id="events" className="py-32 bg-gray-50 dark:bg-gray-950 transition-colors">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-24">
          <div className="text-sm text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em] mb-8">
            Événements Académiques
          </div>
          <h2 className="text-5xl md:text-6xl font-extralight text-gray-900 dark:text-gray-100 mb-12 leading-tight max-w-4xl">
            Conférences & <span className="font-bold">Événements</span>
          </h2>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.slice(0, 6).map((event, index) => (
            <div key={event._id} className="group bg-white dark:bg-gray-900 p-8 hover:shadow-lg transition-shadow duration-300 border border-gray-200 dark:border-gray-800">
              <div className="mb-6">
                <div className="text-xs text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em] mb-3">
                  {String(index + 1).padStart(2, '0')}
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <span className={`px-2 py-1 rounded text-xs uppercase tracking-wider ${
                    event.status === 'upcoming' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300' :
                    event.status === 'ongoing' ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300' :
                    'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300'
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
              
              <h3 className="text-xl font-light text-black dark:text-gray-100 mb-4 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors duration-200">
                <Link href={`/events/${event.slug.current}`}>
                  {event.title}
                </Link>
              </h3>
              
              <div className="text-sm text-gray-500 dark:text-gray-400 mb-4">
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
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm line-clamp-3">
                  {event.description}
                </p>
              )}
            </div>
          ))}
        </div>
        
        <div className="text-center mt-16">
          <Link
            href="/events"
            className="inline-block border-b border-gray-300 dark:border-gray-600 hover:border-black dark:hover:border-white text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white transition-all duration-200 text-sm uppercase tracking-wider pb-1"
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
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
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
        <article key={project._id} className="card overflow-hidden group bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 transition-colors">
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
          <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                    {project.title}
                  </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies?.slice(0, 3).map((tech: string, index: number) => (
                      <span
                        key={index}
            className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-2 py-1 rounded text-xs font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <Link
                    href={`/projects/${project.slug.current}`}
          className="inline-flex items-center text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium"
                  >
                    Voir le Proj&apos;et
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
              <span className="font-bold">l&apos;Informatique</span> 
              Ensemble
            </h2>
            
            <p className="text-xl text-gray-400 leading-relaxed max-w-2xl mx-auto">
              Intéressé par une collaboration, des partenariats de recherche ou une consultation académique ? 
              Je suis toujours ouvert aux conversations significatives sur l&apos;avenir de la technologie et de l&apos;éducation.
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
  <SmoothScroll />
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