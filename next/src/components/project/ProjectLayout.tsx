import Link from 'next/link';
import Image from 'next/image';
import { ReactNode } from 'react';

interface ProjectLayoutProps {
  title: string;
  description: string;
  category: 'web' | 'mobile' | 'desktop' | 'ai' | 'data' | 'other';
  status: 'planning' | 'in-progress' | 'completed' | 'on-hold' | 'cancelled';
  technologies: string[];
  year?: string;
  liveUrl?: string;
  githubUrl?: string;
  publishedAt?: string;
  featuredImage?: string;
  children: ReactNode;
}

const categoryLabels: Record<string, string> = {
  web: 'Web Development',
  mobile: 'Mobile App',
  desktop: 'Desktop Software',
  ai: 'Artificial Intelligence',
  data: 'Data Science',
  other: 'Other',
};

const statusLabels: Record<string, { label: string; color: string }> = {
  planning: { label: 'Planning', color: 'text-luxury-charcoal-400 border-luxury-charcoal-400' },
  'in-progress': { label: 'In Progress', color: 'text-luxury-gold-500 border-luxury-gold-500' },
  completed: { label: 'Completed', color: 'text-white border-white' },
  'on-hold': { label: 'On Hold', color: 'text-luxury-charcoal-500 border-luxury-charcoal-500' },
  cancelled: { label: 'Cancelled', color: 'text-red-400 border-red-400' },
};

export default function ProjectLayout({
  title,
  description,
  category,
  status,
  technologies,
  liveUrl,
  githubUrl,
  publishedAt,
  featuredImage,
  children,
}: ProjectLayoutProps) {
  return (
    <div className="min-h-screen bg-white dark:bg-white text-gray-900 dark:text-gray-900">
      {/* Back Navigation */}
      <div className="max-w-5xl mx-auto px-6 pt-8 pb-6">
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-gray-600 dark:text-gray-400 hover:text-morocco-red-600 dark:hover:text-morocco-red-400 transition-colors font-medium"
        >
          <svg className="w-4 h-4 mr-3 transform group-hover:-translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 19l-7-7 7-7" />
          </svg>
          Retour aux projets
        </Link>
      </div>

      <article className="max-w-7xl mx-auto px-6 pb-32">
        <header className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-24">
          <div className="lg:col-span-7">
            <div className="flex flex-wrap gap-4 mb-8">
              <span className="inline-block px-3 py-1.5 text-xs font-medium tracking-wider uppercase text-gray-700 dark:text-gray-700 bg-gray-100 dark:bg-gray-100 border border-gray-200 dark:border-gray-200">
                {categoryLabels[category]}
              </span>
              <span className={`inline-block px-4 py-1 text-xs font-medium tracking-[0.2em] uppercase border rounded-full ${statusLabels[status].color}`}>
                {statusLabels[status].label}
              </span>
            </div>
            
            <div className="h-1 w-12 bg-morocco-red-600 dark:bg-morocco-red-400 mb-6" />
            
            <h1 className="text-4xl md:text-5xl font-light text-gray-900 dark:text-white mb-6 leading-tight">
              {title}
            </h1>

            <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed max-w-2xl">
              {description}
            </p>
          </div>

          <div className="lg:col-span-5 flex flex-col justify-end">
            <div className="border-t border-gray-200 dark:border-gray-800 pt-8">
              <h3 className="text-xs uppercase tracking-wider text-gray-500 dark:text-gray-500 mb-4 font-medium">Technologies</h3>
              <div className="flex flex-wrap gap-2">
                {technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1.5 text-xs uppercase tracking-wider text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:border-morocco-red-600 dark:hover:border-morocco-red-400 transition-colors"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex gap-6 mt-12">
              {liveUrl && (
                <a
                  href={liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 bg-morocco-red-600 dark:bg-morocco-red-700 text-white text-xs uppercase tracking-wide hover:bg-morocco-red-700 dark:hover:bg-morocco-red-600 transition-colors font-medium"
                >
                  <span className="mr-2">◆</span>
                  Voir le site
                  <span className="ml-2">◆</span>
                </a>
              )}
              {githubUrl && (
                <a
                  href={githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white text-xs uppercase tracking-wide hover:border-morocco-red-600 dark:hover:border-morocco-red-400 transition-colors font-medium"
                >
                  Code Source
                </a>
              )}
            </div>
          </div>
        </header>

        {featuredImage && (
          <div className="mb-24 relative aspect-video w-full overflow-hidden">
            <div className="absolute inset-0 border border-white/10 z-10 pointer-events-none" />
            <Image
              src={featuredImage}
              alt={title}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-8 lg:col-start-3 prose prose-lg prose-invert max-w-none prose-headings:font-serif prose-headings:font-normal prose-p:font-light prose-p:leading-loose prose-p:text-luxury-charcoal-300 prose-strong:text-white prose-strong:font-medium">
            {children}
          </div>
        </div>
      </article>
    </div>
  );
}
