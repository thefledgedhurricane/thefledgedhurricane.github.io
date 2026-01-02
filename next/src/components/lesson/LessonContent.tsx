'use client';

import { ReactNode } from 'react';
import { CheckCircle2, AlertCircle, Code2, Lightbulb } from 'lucide-react';

interface CodeBlockProps {
  code: string;
  language?: string;
}

export function CodeBlock({ code, language = 'plaintext' }: CodeBlockProps) {
  return (
    <div className="my-6 rounded-xl overflow-hidden border border-gray-200">
      <div className="bg-gray-900 px-4 py-2 flex items-center justify-between">
        <span className="text-xs text-gray-400 font-mono uppercase">{language}</span>
      </div>
      <pre className="bg-gray-900 text-gray-100 p-6 overflow-x-auto">
        <code className="text-sm font-mono">{code}</code>
      </pre>
    </div>
  );
}

interface SectionProps {
  title: string;
  children: ReactNode;
}

export function Section({ title, children }: SectionProps) {
  return (
    <section className="mb-8">
      <h2 className="text-2xl font-light text-mckinsey-navy-900 mb-4 pb-2 border-b border-gray-200">
        {title}
      </h2>
      <div className="space-y-4">
        {children}
      </div>
    </section>
  );
}

interface ParagraphProps {
  children: ReactNode;
}

export function Paragraph({ children }: ParagraphProps) {
  return (
    <p className="text-gray-700 leading-relaxed text-lg">
      {children}
    </p>
  );
}

interface BulletListProps {
  items: string[];
}

export function BulletList({ items }: BulletListProps) {
  return (
    <ul className="space-y-3 ml-6">
      {items.map((item, idx) => (
        <li key={idx} className="flex items-start gap-3">
          <span className="w-1.5 h-1.5 rounded-full bg-mckinsey-teal-500 mt-2.5 flex-shrink-0" />
          <span className="text-gray-700">{item}</span>
        </li>
      ))}
    </ul>
  );
}

interface CalloutProps {
  type: 'info' | 'warning' | 'success' | 'tip';
  children: ReactNode;
}

export function Callout({ type, children }: CalloutProps) {
  const styles = {
    info: 'bg-blue-50 border-blue-200 text-blue-900',
    warning: 'bg-amber-50 border-amber-200 text-amber-900',
    success: 'bg-emerald-50 border-emerald-200 text-emerald-900',
    tip: 'bg-purple-50 border-purple-200 text-purple-900'
  };

  const icons = {
    info: AlertCircle,
    warning: AlertCircle,
    success: CheckCircle2,
    tip: Lightbulb
  };

  const Icon = icons[type];

  return (
    <div className={`my-6 p-6 rounded-xl border-l-4 ${styles[type]}`}>
      <div className="flex items-start gap-3">
        <Icon className="w-5 h-5 mt-0.5 flex-shrink-0" />
        <div className="flex-1">
          {children}
        </div>
      </div>
    </div>
  );
}

interface ExampleBoxProps {
  title: string;
  children: ReactNode;
}

export function ExampleBox({ title, children }: ExampleBoxProps) {
  return (
    <div className="my-6 bg-gray-50 rounded-xl border border-gray-200 overflow-hidden">
      <div className="px-6 py-3 bg-white border-b border-gray-200 flex items-center gap-2">
        <Code2 className="w-4 h-4 text-mckinsey-teal-600" />
        <span className="font-medium text-mckinsey-navy-900">{title}</span>
      </div>
      <div className="p-6">
        {children}
      </div>
    </div>
  );
}

interface SubSectionProps {
  title: string;
  children: ReactNode;
}

export function SubSection({ title, children }: SubSectionProps) {
  return (
    <div className="my-6">
      <h3 className="text-xl font-medium text-mckinsey-navy-900 mb-3">
        {title}
      </h3>
      <div className="space-y-3">
        {children}
      </div>
    </div>
  );
}

export function Highlight({ children }: { children: ReactNode }) {
  return (
    <span className="font-semibold text-mckinsey-navy-900 bg-mckinsey-teal-50 px-1 py-0.5 rounded">
      {children}
    </span>
  );
}

export function InlineCode({ children }: { children: ReactNode }) {
  return (
    <code className="px-2 py-0.5 bg-gray-100 text-mckinsey-navy-900 rounded text-sm font-mono">
      {children}
    </code>
  );
}
