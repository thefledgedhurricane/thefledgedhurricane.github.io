'use client';

import Link from 'next/link';

export interface CourseCardProps {
  id: string;
  icon: string;
  title: string;
  description: string;
  difficulty: 'débutant' | 'intermédiaire' | 'avancé';
  duration: string;
  lessons: number;
  href: string;
  tags?: string[];
  progress?: number;
}

export default function CourseCard({ 
  icon, 
  title, 
  description, 
  difficulty, 
  duration, 
  lessons,
  href,
  tags = [],
  progress = 0
}: CourseCardProps) {
  const difficultyConfig = {
    'débutant': { bg: 'bg-mckinsey-gray-100', text: 'text-mckinsey-navy-800', border: 'border-white/10' },
    'intermédiaire': { bg: 'bg-mckinsey-gray-100', text: 'text-mckinsey-teal-500', border: 'border-mckinsey-teal-500/20' },
    'avancé': { bg: 'bg-mckinsey-gray-100', text: 'text-mckinsey-gray-600', border: 'border-white/10' }
  };

  const config = difficultyConfig[difficulty];

  return (
    <Link 
      href={href} 
      className="group bg-mckinsey-gray-50 border border-white/5 p-8 hover:border-mckinsey-teal-500/30 transition-all duration-500 flex flex-col h-full"
    >
      {/* Progress bar */}
      {progress > 0 && (
        <div className="absolute top-0 left-0 right-0 h-1 bg-mckinsey-gray-100">
          <div 
            className="h-full bg-mckinsey-teal-500 transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}

      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div className="w-12 h-12 flex items-center justify-center text-3xl grayscale group-hover:grayscale-0 transition-all duration-500">
            {icon}
          </div>
          <span className={`px-3 py-1 rounded text-xs uppercase tracking-wider font-medium ${config.bg} ${config.text} ${config.border} border`}>
            {difficulty}
          </span>
        </div>

        {/* Title & Description */}
        <h3 className="text-xl font-sans font-medium mb-4 text-mckinsey-navy-800 group-hover:text-mckinsey-teal-500 transition-colors">
          {title}
        </h3>
        <p className="text-mckinsey-gray-600 text-sm leading-relaxed mb-6 flex-1 font-normal">
          {description}
        </p>

        {/* Tags */}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {tags.slice(0, 4).map((tag, i) => (
              <span 
                key={i}
                className="px-2 py-1 text-xs font-medium bg-white text-mckinsey-gray-700 rounded border border-white/5"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between pt-6 border-t border-white/5">
          <div className="flex items-center gap-4 text-xs  tracking-wider text-mckinsey-gray-700">
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {duration}
            </span>
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              {lessons} leçons
            </span>
          </div>
          <span className="text-mckinsey-teal-500 font-medium text-xs  tracking-wider group-hover:translate-x-1 transition-transform flex items-center gap-1">
            Commencer
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
            </svg>
          </span>
        </div>
      </div>
    </Link>
  );
}
