'use client';

import { useEffect, useRef } from 'react';

interface InteractiveDemoProps {
  type: string;
  children: React.ReactNode;
}

export default function InteractiveDemo({ type, children }: InteractiveDemoProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initialize any interactive functionality based on type
    if (ref.current && type) {
      // Add interactive behaviors, animations, etc.
      ref.current.setAttribute('data-demo-type', type);
    }
  }, [type]);

  return (
    <div 
      ref={ref}
      className="interactive-demo my-6 p-4 rounded-lg border-2 border-dashed border-blue-200 dark:border-blue-800 bg-blue-50/50 dark:bg-blue-900/10"
    >
      {children}
    </div>
  );
}
