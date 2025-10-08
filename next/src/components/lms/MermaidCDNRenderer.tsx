'use client';

import { useEffect } from 'react';

export function MermaidCDNRenderer() {
  useEffect(() => {
    // Charger Mermaid via CDN si pas déjà chargé
    if (!window.mermaid && !document.querySelector('script[src*="mermaid"]')) {
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.min.js';
      script.async = true;
      
      script.onload = () => {
        if (window.mermaid) {
          window.mermaid.initialize({
            startOnLoad: false,
            theme: 'default',
            securityLevel: 'loose',
          });
          
          renderDiagrams();
        }
      };
      
      document.head.appendChild(script);
    } else if (window.mermaid) {
      renderDiagrams();
    }

    function renderDiagrams() {
      const codeBlocks = document.querySelectorAll('code.language-mermaid:not(.mermaid-rendered)');
      
      codeBlocks.forEach(async (block, index) => {
        try {
          const mermaidCode = block.textContent || '';
          if (!mermaidCode.trim()) return;
          
          block.classList.add('mermaid-rendered');
          
          const id = `mermaid-diagram-${Date.now()}-${index}`;
          const { svg } = await window.mermaid.render(id, mermaidCode);
          
          const wrapper = document.createElement('div');
          wrapper.className = 'mermaid-diagram my-8 text-center';
          wrapper.innerHTML = `
            <div class="inline-block p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
              ${svg}
            </div>
          `;
          
          // Remplacer le code block
          if (block.parentElement?.tagName === 'PRE') {
            block.parentElement.replaceWith(wrapper);
          } else {
            block.replaceWith(wrapper);
          }
          
        } catch (error) {
          console.error('Mermaid render error:', error);
          
          // Afficher le code brut en cas d'erreur
          block.classList.add('mermaid-rendered');
          const errorDiv = document.createElement('div');
          errorDiv.className = 'bg-yellow-50 border border-yellow-200 rounded-lg p-4 my-4';
          errorDiv.innerHTML = `
            <div class="text-yellow-800 font-medium mb-2">⚠️ Diagramme Mermaid</div>
            <pre class="text-sm bg-yellow-100 p-3 rounded"><code>${block.textContent}</code></pre>
          `;
          
          if (block.parentElement?.tagName === 'PRE') {
            block.parentElement.replaceWith(errorDiv);
          } else {
            block.replaceWith(errorDiv);
          }
        }
      });
    }

    // Réessayer périodiquement
    const interval = setInterval(() => {
      if (window.mermaid) {
        renderDiagrams();
      }
    }, 1000);

    // Nettoyer après 10 secondes
    setTimeout(() => {
      clearInterval(interval);
    }, 10000);

  }, []);

  return null;
}