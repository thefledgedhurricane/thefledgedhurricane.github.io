import { ReactNode } from 'react';
import Image from 'next/image';

export function Section({ title, icon, children }: { title: string; icon?: ReactNode; children: ReactNode }) {
  return (
    <section className="mb-20">
      <div className="h-1 w-12 bg-morocco-red-600 dark:bg-morocco-red-400 mb-6" />
      <h2 className="text-2xl font-light text-gray-900 dark:text-white mb-10 flex items-center">
        {icon && <span className="mr-3 text-gray-400 dark:text-gray-600">{icon}</span>}
        {title}
      </h2>
      <div className="space-y-8">
        {children}
      </div>
    </section>
  );
}

export function Feature({ title, description, icon }: { title: string; description: string; icon?: ReactNode }) {
  return (
    <div className="flex items-start group">
      {icon && (
        <div className="flex-shrink-0 mr-4">
          <div className="w-10 h-10 flex items-center justify-center text-morocco-red-600 dark:text-morocco-red-400">
            {icon}
          </div>
        </div>
      )}
      <div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
          {title}
        </h3>
        <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
}

export function TechStack({ technologies }: { technologies: Array<{ name: string; description: string; icon?: ReactNode }> }) {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      {technologies.map((tech) => (
        <div
          key={tech.name}
          className="bg-white dark:bg-white p-6 border border-gray-200 dark:border-gray-200 hover:border-morocco-red-600 dark:hover:border-morocco-red-600 transition-colors"
        >
          <div className="flex items-center mb-4">
            {tech.icon && <span className="mr-3 text-xl text-morocco-red-600 dark:text-morocco-red-400">{tech.icon}</span>}
            <h3 className="text-base font-medium text-gray-900 dark:text-white">
              {tech.name}
            </h3>
          </div>
          <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
            {tech.description}
          </p>
        </div>
      ))}
    </div>
  );
}

export function Screenshot({ src, alt, caption }: { src: string; alt: string; caption?: string }) {
  return (
    <figure className="my-16">
      <div className="relative aspect-video overflow-hidden border border-white/10">
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
        />
      </div>
      {caption && (
        <figcaption className="text-center text-xs uppercase tracking-[0.2em] text-luxury-charcoal-400 mt-6">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

export function Timeline({ events }: { events: Array<{ date: string; title: string; description: string }> }) {
  return (
    <div className="space-y-12">
      {events.map((event, index) => (
        <div key={index} className="relative pl-12 border-l border-white/10">
          <div className="absolute -left-[5px] top-2 w-[9px] h-[9px] rounded-full bg-luxury-gold-500" />
          <div className="mb-2 text-xs uppercase tracking-[0.2em] text-luxury-gold-500">
            {event.date}
          </div>
          <h3 className="text-xl font-serif font-medium text-white mb-3">
            {event.title}
          </h3>
          <p className="text-luxury-charcoal-300 font-light leading-relaxed">
            {event.description}
          </p>
        </div>
      ))}
    </div>
  );
}

export function Challenge({ title, solution }: { title: string; solution: string }) {
  return (
    <div className="bg-luxury-charcoal-900/30 p-8 border-l-2 border-luxury-gold-500 my-8">
      <h3 className="font-serif font-medium text-white mb-4 flex items-center">
        <span className="text-luxury-gold-500 mr-3">✦</span>
        Défi : {title}
      </h3>
      <p className="text-luxury-charcoal-300 font-light leading-relaxed">
        <strong className="text-white font-medium">Solution :</strong> {solution}
      </p>
    </div>
  );
}

export function Metrics({ metrics }: { metrics: Array<{ label: string; value: string; icon?: ReactNode }> }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/10 border border-white/10">
      {metrics.map((metric, index) => (
        <div
          key={index}
          className="bg-luxury-charcoal-950 p-8 text-center group hover:bg-luxury-charcoal-900 transition-colors"
        >
          {metric.icon && (
            <div className="flex justify-center mb-4 text-luxury-charcoal-400 group-hover:text-luxury-gold-500 transition-colors">
              {metric.icon}
            </div>
          )}
          <div className="text-3xl font-serif font-medium text-white mb-2">
            {metric.value}
          </div>
          <div className="text-xs uppercase tracking-[0.2em] text-luxury-charcoal-400">
            {metric.label}
          </div>
        </div>
      ))}
    </div>
  );
}

export function Heading2({ children }: { children: ReactNode }) {
  return (
    <h2 className="text-3xl font-serif font-medium text-white mb-8 mt-16">
      {children}
    </h2>
  );
}

export function Heading3({ children }: { children: ReactNode }) {
  return (
    <h3 className="text-xl font-serif font-medium text-white mb-6 mt-12">
      {children}
    </h3>
  );
}

export function Paragraph({ children }: { children: ReactNode }) {
  return (
    <p className="text-luxury-charcoal-300 font-light leading-relaxed mb-6 text-lg">
      {children}
    </p>
  );
}

export function CodeBlock({ code, language = 'typescript', title }: { code: string; language?: string; title?: string }) {
  return (
    <div className="my-8 border border-white/10">
      {title && (
        <div className="bg-white/5 px-6 py-3 text-xs uppercase tracking-[0.2em] text-luxury-charcoal-300 border-b border-white/10">
          {title}
        </div>
      )}
      <pre className="bg-luxury-charcoal-900 p-6 overflow-x-auto">
        <code className={`language-${language} text-sm font-mono text-luxury-charcoal-100`}>{code}</code>
      </pre>
    </div>
  );
}

export function List({ items, ordered = false }: { items: string[]; ordered?: boolean }) {
  const ListTag = ordered ? 'ol' : 'ul';
  return (
    <ListTag className={`mb-8 space-y-3 ${ordered ? 'list-decimal' : 'list-disc'} list-inside text-luxury-charcoal-300 font-light leading-relaxed`}>
      {items.map((item, index) => (
        <li key={index} className="pl-2 marker:text-luxury-gold-500">{item}</li>
      ))}
    </ListTag>
  );
}

export function Callout({ type = 'info', title, children }: { type?: 'info' | 'warning' | 'success' | 'error'; title?: string; children: ReactNode }) {
  const styles = {
    info: 'border-luxury-gold-500/50 bg-luxury-gold-500/5 text-luxury-gold-100',
    warning: 'border-yellow-500/50 bg-yellow-500/5 text-yellow-100',
    success: 'border-green-500/50 bg-green-500/5 text-green-100',
    error: 'border-red-500/50 bg-red-500/5 text-red-100'
  };

  return (
    <div className={`p-6 border-l-2 mb-8 ${styles[type]}`}>
      {title && (
        <div className="font-serif font-medium mb-3 text-white">{title}</div>
      )}
      <div className="font-light text-luxury-charcoal-200">{children}</div>
    </div>
  );
}