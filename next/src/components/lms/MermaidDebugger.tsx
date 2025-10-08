'use client';

import { useEffect, useState } from 'react';

export function MermaidDebugger() {
  const [debugInfo, setDebugInfo] = useState<string[]>([]);

  useEffect(() => {
    const checkMermaidElements = () => {
      const codeElements = document.querySelectorAll('code.language-mermaid');
      const mermaidContainers = document.querySelectorAll('.mermaid-container');
      const info = [
        `Code elements found: ${codeElements.length}`,
        `Mermaid containers: ${mermaidContainers.length}`,
        `Current time: ${new Date().toLocaleTimeString()}`
      ];
      
      codeElements.forEach((el, i) => {
        const text = el.textContent?.substring(0, 50) || '';
        info.push(`Code ${i}: "${text}..."`);
      });
      
      setDebugInfo(info);
    };

    // Check immediately and then every 2 seconds
    checkMermaidElements();
    const interval = setInterval(checkMermaidElements, 2000);

    return () => clearInterval(interval);
  }, []);

  // Only show in development
  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 bg-gray-900 text-white text-xs p-3 rounded-lg shadow-lg max-w-sm z-50">
      <div className="font-bold mb-2">Mermaid Debug</div>
      {debugInfo.map((info, i) => (
        <div key={i} className="mb-1">{info}</div>
      ))}
    </div>
  );
}