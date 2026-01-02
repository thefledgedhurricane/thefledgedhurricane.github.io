'use client';

export function MoroccanDivider({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center my-8 ${className}`}>
      <div className="flex items-center gap-3">
        <span className="text-morocco-gold-500 text-2xl">✦</span>
        <div className="h-px w-12 bg-gradient-to-r from-transparent via-morocco-red-500 to-transparent"></div>
        <span className="text-morocco-green-500 text-3xl">❋</span>
        <div className="h-px w-12 bg-gradient-to-r from-transparent via-morocco-green-500 to-transparent"></div>
        <span className="text-morocco-gold-500 text-2xl">✦</span>
      </div>
    </div>
  );
}

export function MoroccanCorner({ position = 'top-left', size = 'md' }: { 
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  size?: 'sm' | 'md' | 'lg';
}) {
  const sizes = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
  };

  const positions = {
    'top-left': 'top-0 left-0',
    'top-right': 'top-0 right-0 rotate-90',
    'bottom-left': 'bottom-0 left-0 -rotate-90',
    'bottom-right': 'bottom-0 right-0 rotate-180',
  };

  return (
    <div className={`absolute ${positions[position]} ${sizes[size]} pointer-events-none`}>
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <path
          d="M 0 0 L 40 0 Q 0 0 0 40 Z"
          fill="currentColor"
          className="text-morocco-gold-400 dark:text-morocco-gold-600 opacity-30"
        />
        <path
          d="M 0 0 L 30 0 Q 0 0 0 30 Z"
          fill="currentColor"
          className="text-morocco-red-500 dark:text-morocco-red-600 opacity-40"
        />
        <path
          d="M 0 0 L 20 0 Q 0 0 0 20 Z"
          fill="currentColor"
          className="text-morocco-green-500 dark:text-morocco-green-600 opacity-50"
        />
      </svg>
    </div>
  );
}

export function MoroccanPattern({ variant = 'zellige', className = '' }: {
  variant?: 'zellige' | 'arabesque' | 'geometric';
  className?: string;
}) {
  const patterns = {
    zellige: 'moroccan-pattern-zellige',
    arabesque: 'moroccan-pattern-arabesque',
    geometric: 'bg-[radial-gradient(circle_at_50%_50%,rgba(212,175,55,0.05)_1px,transparent_1px)] bg-[length:20px_20px]',
  };

  return (
    <div className={`absolute inset-0 ${patterns[variant]} opacity-40 pointer-events-none ${className}`} />
  );
}

export function MoroccanBadge({ children, color = 'gold' }: {
  children: React.ReactNode;
  color?: 'gold' | 'red' | 'green' | 'blue';
}) {
  const colors = {
    gold: 'bg-morocco-gold-100 text-morocco-gold-800 border-morocco-gold-300 dark:bg-morocco-gold-900/30 dark:text-morocco-gold-300 dark:border-morocco-gold-700',
    red: 'bg-morocco-red-100 text-morocco-red-800 border-morocco-red-300 dark:bg-morocco-red-900/30 dark:text-morocco-red-300 dark:border-morocco-red-700',
    green: 'bg-morocco-green-100 text-morocco-green-800 border-morocco-green-300 dark:bg-morocco-green-900/30 dark:text-morocco-green-300 dark:border-morocco-green-700',
    blue: 'bg-morocco-blue-100 text-morocco-blue-800 border-morocco-blue-300 dark:bg-morocco-blue-900/30 dark:text-morocco-blue-300 dark:border-morocco-blue-700',
  };

  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border-2 ${colors[color]}`}>
      <span className="mr-1.5">◆</span>
      {children}
      <span className="ml-1.5">◆</span>
    </span>
  );
}

export function MoroccanCard({ children, className = '', withPattern = false }: {
  children: React.ReactNode;
  className?: string;
  withPattern?: boolean;
}) {
  return (
    <div className={`relative moroccan-card overflow-hidden ${className}`}>
      {withPattern && <MoroccanPattern variant="zellige" className="opacity-20" />}
      <MoroccanCorner position="top-left" size="md" />
      <MoroccanCorner position="bottom-right" size="md" />
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}
