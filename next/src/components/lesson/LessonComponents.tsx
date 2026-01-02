import { ReactNode } from 'react';

interface SectionProps {
  id?: string;
  title: string;
  icon?: ReactNode;
  children: ReactNode;
}

export function Section({ id, title, icon, children }: SectionProps) {
  return (
    <section id={id} className="mb-12">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
        {icon && <span className="mr-3">{icon}</span>}
        {title}
      </h2>
      <div className="space-y-4">
        {children}
      </div>
    </section>
  );
}

export function SubSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="ml-4">
      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3">
        {title}
      </h3>
      <div className="space-y-3">
        {children}
      </div>
    </div>
  );
}

export function Highlight({ type = 'info', children }: { type?: 'info' | 'success' | 'warning' | 'error'; children: ReactNode }) {
  const styles = {
    info: 'bg-white dark:bg-white border-blue-200 dark:border-blue-200 text-gray-900 dark:text-gray-900',
    success: 'bg-white dark:bg-white border-green-200 dark:border-green-200 text-gray-900 dark:text-gray-900',
    warning: 'bg-white dark:bg-white border-yellow-200 dark:border-yellow-200 text-gray-900 dark:text-gray-900',
    error: 'bg-white dark:bg-white border-red-200 dark:border-red-200 text-gray-900 dark:text-gray-900',
  };

  return (
    <div className={`p-4 border ${styles[type]}`}>
      {children}
    </div>
  );
}

export function CodeBlock({ code, language = 'typescript' }: { code: string; language?: string }) {
  return (
    <div className="my-4">
      <pre className="bg-white dark:bg-white text-gray-900 dark:text-gray-900 p-4 border border-gray-200 dark:border-gray-200 overflow-x-auto">
        <code className={`language-${language}`}>{code}</code>
      </pre>
    </div>
  );
}

export function List({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2 ml-6">
      {items.map((item, i) => (
        <li key={i} className="flex items-start">
          <span className="text-blue-600 dark:text-blue-400 mr-2">•</span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export function CheckList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2">
      {items.map((item, i) => (
        <li key={i} className="flex items-start">
          <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export function KeyPoint({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="bg-white dark:bg-white p-5 border-l-2 border-morocco-red-600 dark:border-morocco-red-600">
      <h4 className="font-semibold text-gray-900 dark:text-gray-900 mb-2">{title}</h4>
      <div className="text-gray-700 dark:text-gray-700">{children}</div>
    </div>
  );
}
