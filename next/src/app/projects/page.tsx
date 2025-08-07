import Link from 'next/link';
import Image from 'next/image';
import { getProjects, urlFor } from '@/lib/sanity';
import { Project } from '@/lib/sanity-types';

export const metadata = {
  title: 'Projets | Portfolio Académique',
  description: 'Découvrez mes projets de recherche et développement en Intelligence Artificielle, Réalité Virtuelle et Neurosciences Computationnelles.',
};

// Metadata is handled by layout.tsx for client components

const categoryLabels = {
  web: 'Web',
  mobile: 'Mobile',
  desktop: 'Desktop',
  ai: 'Intelligence Artificielle',
  data: 'Science des Données',
  other: 'Autre'
};

const statusLabels = {
  planning: 'En planification',
  'in-progress': 'En cours',
  completed: 'Terminé',
  'on-hold': 'En pause',
  cancelled: 'Annulé'
};

export default async function ProjectsPage() {
  // Fetch all projects at build time
  const projects = await getProjects();
  
  // Extract unique categories and statuses for filters
  const categories: string[] = Array.from(new Set(projects.map((p: Project) => p.category).filter(Boolean))) as string[];
  const statuses: string[] = Array.from(new Set(projects.map((p: Project) => p.status).filter(Boolean))) as string[];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Mes Projets
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Une collection de mes travaux de recherche et développement en Intelligence Artificielle, 
              Réalité Virtuelle et Neurosciences Computationnelles.
            </p>
          </div>
        </div>
      </div>

      {/* Filters - Static version */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-wrap gap-4 items-center justify-between">
            <div className="flex flex-wrap gap-4">
              {/* Category Filter */}
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-gray-700">Catégorie:</span>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 rounded-full text-sm font-medium bg-blue-600 text-white">
                    Tous
                  </span>
                  {categories.map((category) => (
                    <span
                      key={category}
                      className="px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 cursor-pointer"
                    >
                      {categoryLabels[category as keyof typeof categoryLabels] || category}
                    </span>
                  ))}
                </div>
              </div>

              {/* Status Filter */}
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-gray-700">Statut:</span>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 rounded-full text-sm font-medium bg-green-600 text-white">
                    Tous
                  </span>
                  {statuses.map((status) => (
                    <span
                      key={status}
                      className="px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 cursor-pointer"
                    >
                      {statusLabels[status as keyof typeof statusLabels] || status}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="text-sm text-gray-500">
              {projects.length} projet{projects.length !== 1 ? 's' : ''} trouv&eacute;{projects.length !== 1 ? 's' : ''}
            </div>
          </div>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project: Project) => {
              const imageUrl = project.featuredImage?.asset 
                ? urlFor(project.featuredImage).width(400).height(300).url() 
                : '/placeholder-project.jpg';

              return (
                <article key={project._id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden group">
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
                        <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                    )}
                    
                    {/* Status Badge */}
                    <div className="absolute top-3 left-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        project.status === 'completed' ? 'bg-green-100 text-green-800' :
                        project.status === 'in-progress' ? 'bg-blue-100 text-blue-800' :
                        project.status === 'planning' ? 'bg-yellow-100 text-yellow-800' :
                        project.status === 'on-hold' ? 'bg-orange-100 text-orange-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {statusLabels[project.status as keyof typeof statusLabels] || project.status}
                      </span>
                    </div>

                    {/* Featured Badge */}
                    {project.featured && (
                      <div className="absolute top-3 right-3">
                        <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-xs font-medium">
                          ⭐ En vedette
                        </span>
                      </div>
                    )}
                  </div>
                  
                  <div className="p-6">
                    <div className="mb-3">
                      <span className="inline-block px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs font-medium">
                        {categoryLabels[project.category as keyof typeof categoryLabels] || project.category}
                      </span>
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                      {project.title}
                    </h3>
                    
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {project.description}
                    </p>
                    
                    {/* Technologies */}
                    <div className="flex flex-wrap gap-1 mb-4">
                      {project.technologies?.slice(0, 4).map((tech: string, index: number) => (
                        <span
                          key={index}
                          className="bg-blue-50 text-blue-700 px-2 py-1 rounded text-xs font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.technologies && project.technologies.length > 4 && (
                        <span className="bg-gray-50 text-gray-600 px-2 py-1 rounded text-xs font-medium">
                          +{project.technologies.length - 4}
                        </span>
                      )}
                    </div>
                    
                    {/* Project Links */}
                    <div className="flex items-center justify-between">
                      <Link
                        href={`/projects/${project.slug.current}`}
                        className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
                      >
                        Voir le projet
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
                      
                      <div className="flex items-center space-x-2">
                        {project.liveUrl && (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                            title="Voir en direct"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                          </a>
                        )}
                        {project.githubUrl && (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                            title="Voir sur GitHub"
                          >
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                            </svg>
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
      </div>

      {/* Back to Home */}
      <div className="bg-white border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <Link
              href="/"
              className="inline-flex items-center text-gray-600 hover:text-gray-900 font-medium"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Retour à l'accueil
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}