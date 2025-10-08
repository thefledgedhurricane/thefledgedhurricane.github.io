'use client';

import { useEffect, useRef } from 'react';

export function MermaidFinalRenderer() {
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    // Nettoyer d'abord les anciens scripts
    const existingScripts = document.querySelectorAll('script[src*="mermaid"]');
    existingScripts.forEach(script => script.remove());

    // Fonction pour charger et initialiser Mermaid
    const loadMermaid = () => {
      // Charger via CDN de manière fiable
      const script = document.createElement('script');
      script.src = 'https://unpkg.com/mermaid@10.6.1/dist/mermaid.min.js';
      script.async = true;
      
      script.onload = () => {
        // Attendre un peu que le script soit vraiment prêt
        setTimeout(() => {
          if (window.mermaid) {
            try {
              window.mermaid.initialize({
                startOnLoad: false,
                theme: 'default',
                securityLevel: 'loose',
                flowchart: { useMaxWidth: true }
              });
              
              console.log('✅ Mermaid loaded and initialized');
              processMermaidBlocks();
            } catch (e) {
              console.error('❌ Error initializing Mermaid:', e);
            }
          }
        }, 100);
      };
      
      script.onerror = () => {
        console.error('❌ Failed to load Mermaid from CDN');
      };
      
      document.head.appendChild(script);
    };

    // Fonction pour traiter les blocs Mermaid
    const processMermaidBlocks = () => {
      const blocks = document.querySelectorAll('code.language-mermaid:not(.mermaid-done)');
      console.log(`🔍 Found ${blocks.length} Mermaid blocks to process`);
      
      blocks.forEach(async (block, index) => {
        try {
          const content = block.textContent?.trim();
          if (!content) return;
          
          // Marquer comme traité
          block.classList.add('mermaid-done');
          
          const id = `mermaid-${Date.now()}-${index}`;
          console.log(`🎨 Rendering diagram ${id}`);
          
          // Créer le conteneur
          const container = document.createElement('div');
          container.className = 'mermaid-wrapper my-8 flex justify-center';
          
          const diagramDiv = document.createElement('div');
          diagramDiv.className = 'diagram-content bg-white p-4 border border-gray-200 rounded-lg shadow-sm inline-block';
          
          try {
            // Utiliser l'API moderne de Mermaid
            const { svg } = await window.mermaid.render(id, content);
            diagramDiv.innerHTML = svg;
            console.log(`✅ Successfully rendered ${id}`);
          } catch (renderError) {
            console.error(`❌ Render error for ${id}:`, renderError);
            // Fallback : afficher le code source
            diagramDiv.innerHTML = `
              <div class="text-center p-4">
                <div class="text-gray-600 text-sm mb-2">📊 Diagramme Mermaid</div>
                <pre class="text-xs bg-gray-100 p-2 rounded text-left"><code>${content}</code></pre>
              </div>
            `;
          }
          
          container.appendChild(diagramDiv);
          
          // Remplacer le bloc de code
          const parent = block.parentElement;
          if (parent?.tagName === 'PRE') {
            parent.replaceWith(container);
          } else {
            block.replaceWith(container);
          }
          
        } catch (error) {
          console.error('❌ Error processing block:', error);
        }
      });
    };

    // Commencer le chargement
    loadMermaid();

    // Observer pour nouveau contenu
    const observer = new MutationObserver(() => {
      if (window.mermaid) {
        setTimeout(processMermaidBlocks, 200);
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });

    return () => observer.disconnect();
  }, []);

  return null;
}

// Déclaration globale pour TypeScript
declare global {
  interface Window {
    mermaid: any;
  }
}