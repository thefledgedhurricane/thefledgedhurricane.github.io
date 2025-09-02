'use client';

import { useEffect, useRef, useState } from 'react';
import mermaid from 'mermaid';

interface MermaidDiagramProps {
  chart: string;
  id: string;
}

export default function MermaidDiagram({ chart, id }: MermaidDiagramProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (ref.current && !isLoaded) {
      mermaid.initialize({
        startOnLoad: true,
        theme: 'neutral',
        securityLevel: 'loose',
        fontFamily: 'system-ui, -apple-system, sans-serif',
      });

      mermaid.render(`mermaid-${id}`, chart).then(({ svg }) => {
        if (ref.current) {
          ref.current.innerHTML = svg;
          setIsLoaded(true);
        }
      }).catch((error) => {
        console.error('Mermaid render error:', error);
        if (ref.current) {
          ref.current.innerHTML = `<div class="text-red-600">Erreur de rendu du diagramme</div>`;
        }
      });
    }
  }, [chart, id, isLoaded]);

  return (
    <div className="my-6 flex justify-center">
      <div 
        ref={ref} 
        className="mermaid-container bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border"
      >
        {!isLoaded && (
          <div className="flex items-center justify-center p-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <span className="ml-2">Chargement du diagramme...</span>
          </div>
        )}
      </div>
    </div>
  );
}
