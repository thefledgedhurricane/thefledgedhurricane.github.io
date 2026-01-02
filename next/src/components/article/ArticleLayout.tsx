import Link from 'next/link';
import Image from 'next/image';
import { ReactNode } from 'react';

interface ArticleLayoutProps {
  title: string;
  description: string;
  author?: {
    name: string;
    avatar?: string;
    role?: string;
  };
  publishedAt: string;
  readingTime?: number;
  category?: string;
  tags?: string[];
  heroImage?: string;
  children: ReactNode;
}

export default function ArticleLayout({
  title,
  description,
  author = { name: 'Auteur', role: 'Développeur' },
  publishedAt,
  readingTime,
  category,
  tags = [],
  heroImage,
  children,
}: ArticleLayoutProps) {
  return (
    <div className="min-h-screen bg-white dark:bg-white text-gray-900 dark:text-gray-900">
      {/* Back Navigation */}
      <div className="max-w-4xl mx-auto px-6 pt-8 pb-6">
        <Link
          href="/posts"
          className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-gray-600 dark:text-gray-400 hover:text-morocco-red-600 dark:hover:text-morocco-red-400 transition-colors font-medium"
        >
          <svg className="w-4 h-4 mr-3 transform group-hover:-translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 19l-7-7 7-7" />
          </svg>
          Retour au Journal
        </Link>
      </div>

      <article className="max-w-4xl mx-auto px-6 pb-32">
        <header className="mb-20 text-center">
          {category && (
            <div className="mb-8">
              <span className="inline-block px-3 py-1.5 text-xs font-medium tracking-wider uppercase text-gray-700 dark:text-gray-700 bg-gray-100 dark:bg-gray-100 border border-gray-200 dark:border-gray-200">
                {category}
              </span>
            </div>
          )}
          
          <div className="h-1 w-12 bg-morocco-red-600 dark:bg-morocco-red-400 mb-8 mx-auto" />
          
          <h1 className="text-4xl md:text-5xl font-light text-gray-900 dark:text-white mb-8 leading-tight">
            {title}
          </h1>

          <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed max-w-2xl mx-auto mb-12">
            {description}
          </p>

          <div className="flex items-center justify-center gap-8 text-sm text-gray-600 dark:text-gray-400 border-y border-gray-200 dark:border-gray-800 py-6 max-w-2xl mx-auto">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-200 flex items-center justify-center text-gray-700 dark:text-gray-700 text-lg">
                {author.name.charAt(0)}
              </div>
              <div className="text-left">
                <div className="font-medium text-gray-900 dark:text-white text-xs uppercase tracking-wide">{author.name}</div>
                <div className="text-xs text-gray-500 dark:text-gray-500">{author.role}</div>
              </div>
            </div>
            
            <div className="h-8 w-px bg-gray-200 dark:bg-gray-200" />
            
            <div className="text-left">
              <div className="font-medium text-gray-900 dark:text-white tracking-wide uppercase text-xs">
                {new Date(publishedAt).toLocaleDateString('fr-FR', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </div>
              {readingTime && <div className="text-xs opacity-60 tracking-wider uppercase">{readingTime} MIN READ</div>}
            </div>
          </div>
        </header>

        {heroImage && (
          <div className="mb-20 relative aspect-video w-full overflow-hidden">
            <div className="absolute inset-0 border border-white/10 z-10 pointer-events-none" />
            <Image
              src={heroImage}
              alt={title}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        <div className="prose prose-lg prose-invert max-w-none prose-headings:font-serif prose-headings:font-normal prose-p:font-light prose-p:leading-loose prose-p:text-luxury-charcoal-300 prose-strong:text-white prose-strong:font-medium">
          {children}
        </div>

        {tags.length > 0 && (
          <div className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-800">
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1.5 text-xs uppercase tracking-wider text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-700 hover:border-morocco-red-600 dark:hover:border-morocco-red-400 transition-colors"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        )}
      </article>
    </div>
  );
}
