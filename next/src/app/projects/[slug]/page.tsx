import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { getProject, getProjects, urlFor } from '@/lib/sanity';
import { Project } from '@/lib/sanity-types';
import PortableTextRenderer from '@/components/PortableTextRenderer';

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((project: Project) => ({
    slug: project.slug.current,
  }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const { slug } = params;
  const project = await getProject(slug);
  
  if (!project) {
    return {
      title: 'Project Not Found',
    };
  }

  // Assainir description (si une structure portable text ou trop longue est venue remplacer la description courte)
  const rawDescription: any = project.description;
  let cleanDescription: string = '';
  if (typeof rawDescription === 'string') {
    cleanDescription = rawDescription.trim();
  } else if (Array.isArray(rawDescription)) {
    // PortableText blocks -> concat spans
    cleanDescription = rawDescription
      .filter((b: any) => b._type === 'block')
      .map((b: any) => (b.children || []).map((c: any) => c.text || '').join(''))
      .join(' ')
      .trim();
  } else if (rawDescription && typeof rawDescription === 'object') {
    cleanDescription = JSON.stringify(rawDescription).slice(0, 140);
  }
  if (cleanDescription.length > 180) cleanDescription = cleanDescription.slice(0, 177) + '…';

  return {
    title: `${project.title} | Portfolio`,
    description: cleanDescription,
    openGraph: {
      title: project.title,
      description: cleanDescription,
      images: project.featuredImage?.asset ? [urlFor(project.featuredImage).width(1200).height(630).url()] : [],
    },
  };
}



export default async function ProjectPage({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const project = await getProject(slug);

  if (!project) {
    notFound();
  }

  const imageUrl = project.featuredImage?.asset 
    ? urlFor(project.featuredImage).width(800).height(600).url() 
    : '/placeholder-project.jpg';

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors">
      {/* Hero Section */}
  <div className="bg-white dark:bg-gray-900 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-8">
            <Link 
              href="/projects" 
              className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-4"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Projects
            </Link>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">{project.title}</h1>
            {(() => {
              // Extraire description brute (string ou blocks) puis résumer avant markdown avancé
              let raw = '';
              if (typeof project.description === 'string') raw = project.description;
              else if (Array.isArray(project.description)) {
                raw = project.description
                  .filter((b: any) => b._type === 'block')
                  .map((b: any) => (b.children || []).map((c: any) => c.text || '').join(''))
                  .join(' ');
              }
              // Normaliser espaces
              raw = raw.replace(/\r\n?/g, '\n');
              // Trouver la première occurrence d'un séparateur de structure (heading ou liste) même s'il est collé après un espace
              const separators = [
                /#{1,6}\s/,          // heading markdown
                /\n[-*+]\s/,        // liste
                /\n\d+\.\s/,      // liste numérotée
              ];
              let cutIndex = -1;
              for (const re of separators) {
                const m = re.exec(raw);
                if (m) {
                  const idx = m.index;
                  if (cutIndex === -1 || idx < cutIndex) cutIndex = idx;
                }
              }
              if (cutIndex > 120) { // éviter de couper trop tôt si heading très proche du début
                raw = raw.slice(0, cutIndex).trim();
              }
              // Si toujours trop long, couper au premier double saut de ligne
              if (raw.length > 260) {
                const dbl = raw.indexOf('\n\n');
                if (dbl !== -1 && dbl > 120) raw = raw.slice(0, dbl).trim();
              }
              // Nettoyer éléments markdown basiques restants
              let summary = raw
                .replace(/\*\*(.+?)\*\*/g, '$1')
                .replace(/\*(.+?)\*/g, '$1')
                .replace(/`([^`]+)`/g, '$1')
                .replace(/\[(.+?)\]\((.*?)\)/g, '$1')
                .replace(/\s{2,}/g, ' ')
                .trim();
              if (summary.length > 240) {
                const periodIdx = summary.indexOf('. ');
                if (periodIdx > 120 && periodIdx < 240) {
                  summary = summary.slice(0, periodIdx + 1);
                } else {
                  summary = summary.slice(0, 237) + '…';
                }
              }
              return (
                <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                  {summary}
                </p>
              );
            })()}
          </div>

          {/* Project Image */}
          <div className="aspect-video bg-gray-200 rounded-xl overflow-hidden mb-8">
            <Image
              src={imageUrl}
              alt={project.featuredImage?.alt || project.title}
              width={800}
              height={600}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Project Meta */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {/* Technologies */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Technologies</h3>
              <div className="flex flex-wrap gap-2">
                {project.technologies?.map((tech: string, index: number) => (
                  <span
                    key={index}
                    className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Links */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Links</h3>
              <div className="space-y-2">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-blue-600 hover:text-blue-700"
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    Live Demo
                  </a>
                )}
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-gray-700 hover:text-gray-900"
                  >
                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                    View Code
                  </a>
                )}
              </div>
            </div>

            {/* Date */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Published</h3>
              <time className="text-gray-600">
                {new Date(project.publishedAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </time>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm p-8 border border-gray-100 dark:border-gray-800 transition-colors">
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <PortableTextRenderer content={project.content} />
          </div>
        </div>
      </div>
    </div>
  );
}