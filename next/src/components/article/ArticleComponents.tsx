import { ReactNode } from 'react';
import Image from 'next/image';

export function Paragraph({ children }: { children: ReactNode }) {
  return <p className="mb-6 text-lg text-gray-700 dark:text-gray-300 leading-relaxed font-light">{children}</p>;
}

export function Heading2({ children, id }: { children: ReactNode; id?: string }) {
  return (
    <h2 id={id} className="text-2xl font-light text-gray-900 dark:text-white mt-16 mb-6 pb-3 border-b border-gray-200 dark:border-gray-800">
      {children}
    </h2>
  );
}

export function Heading3({ children, id }: { children: ReactNode; id?: string }) {
  return (
    <h3 id={id} className="text-2xl font-serif font-medium text-gray-900 dark:text-white mt-12 mb-6">
      {children}
    </h3>
  );
}

export function Quote({ children, author }: { children: ReactNode; author?: string }) {
  return (
    <blockquote className="border-l-2 border-gray-300 dark:border-gray-700 pl-6 py-4 my-8 italic text-lg text-gray-700 dark:text-gray-300">
      <div className="leading-relaxed">{children}</div>
      {author && <cite className="text-sm text-gray-500 dark:text-gray-500 not-italic mt-3 block uppercase tracking-wide">— {author}</cite>}
    </blockquote>
  );
}

export function CodeBlock({ code, language = 'typescript', title }: { code: string; language?: string; title?: string }) {
  return (
    <div className="my-10 border border-luxury-charcoal-200 dark:border-luxury-charcoal-800 rounded-sm overflow-hidden">
      {title && (
        <div className="bg-luxury-charcoal-50 dark:bg-luxury-charcoal-900 text-luxury-charcoal-600 dark:text-luxury-charcoal-400 px-4 py-2 text-xs uppercase tracking-widest font-mono border-b border-luxury-charcoal-200 dark:border-luxury-charcoal-800">
          {title}
        </div>
      )}
      <pre className="bg-luxury-charcoal-50 dark:bg-luxury-charcoal-950 text-luxury-charcoal-800 dark:text-luxury-charcoal-200 p-6 overflow-x-auto">
        <code className={`language-${language} font-mono text-sm`}>{code}</code>
      </pre>
    </div>
  );
}

export function InlineCode({ children }: { children: ReactNode }) {
  return (
    <code className="bg-luxury-charcoal-100 dark:bg-luxury-charcoal-900 text-luxury-gold-700 dark:text-luxury-gold-400 px-2 py-0.5 rounded-sm text-sm font-mono border border-luxury-charcoal-200 dark:border-luxury-charcoal-800">
      {children}
    </code>
  );
}

export function List({ items, ordered = false }: { items: string[]; ordered?: boolean }) {
  const Tag = ordered ? 'ol' : 'ul';
  return (
    <Tag className={`space-y-3 my-6 ${ordered ? 'list-decimal' : 'list-disc'} list-inside text-luxury-charcoal-600 dark:text-luxury-charcoal-300 marker:text-luxury-gold-500`}>
      {items.map((item, i) => (
        <li key={i} className="leading-relaxed pl-2">{item}</li>
      ))}
    </Tag>
  );
}

export function Callout({ type = 'info', title, children }: { type?: 'info' | 'warning' | 'success' | 'error'; title?: string; children: ReactNode }) {
  const styles = {
    info: 'bg-white dark:bg-white border-l-2 border-blue-600 dark:border-blue-600',
    warning: 'bg-white dark:bg-white border-l-2 border-yellow-600 dark:border-yellow-600',
    success: 'bg-white dark:bg-white border-l-2 border-green-600 dark:border-green-600',
    error: 'bg-white dark:bg-white border-l-2 border-red-600 dark:border-red-600',
  };

  const icons = {
    info: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
      </svg>
    ),
    warning: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
      </svg>
    ),
    success: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
      </svg>
    ),
    error: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
      </svg>
    ),
  };

  return (
    <div className={`my-6 p-6 ${styles[type]}`}>
      <div className="flex items-start gap-4">
        <div className={`flex-shrink-0 mt-0.5 ${type === 'info' ? 'text-blue-600 dark:text-blue-400' : type === 'warning' ? 'text-yellow-600 dark:text-yellow-400' : type === 'success' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
          {icons[type]}
        </div>
        <div className="flex-1">
          {title && (
            <h4 className="text-base font-medium text-gray-900 dark:text-white mb-2">
              {title}
            </h4>
          )}
          <div className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

export function ArticleImage({ src, alt, caption }: { src: string; alt: string; caption?: string }) {
  return (
    <figure className="my-12">
      <div className="relative aspect-video overflow-hidden bg-luxury-charcoal-100 dark:bg-luxury-charcoal-900">
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
        />
      </div>
      {caption && (
        <figcaption className="text-center text-xs uppercase tracking-widest text-luxury-charcoal-500 dark:text-luxury-charcoal-400 mt-4 font-sans">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

export function Table({ headers, rows }: { headers: string[]; rows: string[][] }) {
  return (
    <div className="my-10 overflow-x-auto border border-luxury-charcoal-200 dark:border-luxury-charcoal-800">
      <table className="min-w-full divide-y divide-luxury-charcoal-200 dark:divide-luxury-charcoal-800">
        <thead className="bg-luxury-charcoal-50 dark:bg-luxury-charcoal-900">
          <tr>
            {headers.map((header, i) => (
              <th
                key={i}
                className="px-6 py-4 text-left text-xs font-medium text-luxury-charcoal-500 dark:text-luxury-charcoal-400 uppercase tracking-widest font-sans"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white dark:bg-luxury-charcoal-950 divide-y divide-luxury-charcoal-100 dark:divide-luxury-charcoal-900">
          {rows.map((row, i) => (
            <tr key={i}>
              {row.map((cell, j) => (
                <td key={j} className="px-6 py-4 whitespace-nowrap text-sm text-luxury-charcoal-600 dark:text-luxury-charcoal-300 font-light">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
