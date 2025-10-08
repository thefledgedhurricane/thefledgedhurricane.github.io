'use client';

import { useEffect, useRef } from 'react';

declare global {
  interface Window {
    mermaid: any;
  }
}

export function SimpleMermaidRenderer() {
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    
    // Charger Mermaid dynamiquement
    const loadMermaid = async () => {
      try {
        // Import dynamique de Mermaid
        const mermaidModule = await import('mermaid');
        const mermaid = mermaidModule.default;
        
        // Configuration simple
        mermaid.initialize({
          startOnLoad: false,
          theme: 'default',
          securityLevel: 'loose',
        });

        initialized.current = true;

        // Fonction pour transformer les éléments code en SVG
        const transformMermaidBlocks = async () => {
          const mermaidBlocks = document.querySelectorAll('code.language-mermaid:not(.processed)');
          
          for (let i = 0; i < mermaidBlocks.length; i++) {
            const block = mermaidBlocks[i];
            const mermaidCode = block.textContent || '';
            
            if (!mermaidCode.trim()) continue;

            try {
              // Marquer comme traité
              block.classList.add('processed');
              
              // Créer l'ID unique
              const id = `mermaid-${Date.now()}-${i}`;
              
              // Rendre le SVG
              const { svg } = await mermaid.render(id, mermaidCode);
              
              // Créer le container
              const container = document.createElement('div');
              container.className = 'mermaid-wrapper my-6 text-center';
              container.innerHTML = `
                <div class="inline-block p-4 bg-white rounded-lg border border-gray-200 shadow-sm">
                  ${svg}
                </div>
              `;
              
              // Remplacer le block de code
              const parent = block.parentElement;
              if (parent && parent.tagName === 'PRE') {
                parent.replaceWith(container);
              } else {
                block.replaceWith(container);
              }
              
              console.log(`✅ Mermaid diagram rendered: ${id}`);
              
            } catch (error) {
              console.error('❌ Error rendering Mermaid:', error);
              
              // Afficher l'erreur
              block.classList.add('processed');
              const errorContainer = document.createElement('div');
              errorContainer.className = 'my-6 p-4 bg-red-50 border border-red-200 rounded-lg';
              errorContainer.innerHTML = `
                <div class="text-red-800 font-medium">Erreur Mermaid</div>
                <div class="text-red-600 text-sm">${error.message || 'Syntaxe invalide'}</div>
                <pre class="text-xs mt-2 bg-red-100 p-2 rounded">${mermaidCode}</pre>
              `;
              
              const parent = block.parentElement;
              if (parent && parent.tagName === 'PRE') {
                parent.replaceWith(errorContainer);
              } else {
                block.replaceWith(errorContainer);
              }
            }
          }
        };

        // Premier rendu
        await transformMermaidBlocks();

        // Observer pour nouveau contenu
        const observer = new MutationObserver(() => {
          setTimeout(transformMermaidBlocks, 100);
        });

        observer.observe(document.body, {
          childList: true,
          subtree: true
        });

        return () => observer.disconnect();

      } catch (error) {
        console.error('Failed to load Mermaid:', error);
      }
    };

    loadMermaid();
  }, []);

  return null;
}