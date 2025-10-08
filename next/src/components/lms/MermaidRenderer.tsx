'use client';

import { useEffect, useRef } from 'react';
import mermaid from 'mermaid';

let mermaidInitialized = false;

export function MermaidRenderer() {
  const isInitialized = useRef(false);

  useEffect(() => {
    if (isInitialized.current) return;
    isInitialized.current = true;

    // Configuration de Mermaid une seule fois
    if (!mermaidInitialized) {
      mermaid.initialize({
        startOnLoad: false, // Important: désactiver le démarrage automatique
        theme: 'default',
        securityLevel: 'loose',
        themeVariables: {
          fontFamily: 'ui-sans-serif, system-ui, sans-serif',
          fontSize: '14px',
          primaryColor: '#3b82f6',
          primaryTextColor: '#1f2937',
          primaryBorderColor: '#e5e7eb',
          lineColor: '#6b7280',
          sectionBkgColor: '#f9fafb',
          altSectionBkgColor: '#ffffff',
          gridColor: '#e5e7eb',
          secondaryColor: '#f3f4f6',
          tertiaryColor: '#f9fafb',
        },
        flowchart: {
          useMaxWidth: true,
          htmlLabels: true,
        },
        sequence: {
          useMaxWidth: true,
          wrap: true,
        },
        gantt: {
          useMaxWidth: true,
        },
      });
      mermaidInitialized = true;
    }

    // Fonction pour rendre les diagrammes Mermaid
    const renderMermaidDiagrams = async () => {
      try {
        const mermaidElements = document.querySelectorAll('code.language-mermaid:not(.mermaid-processed)');
        
        if (mermaidElements.length === 0) return;

        console.log(`Found ${mermaidElements.length} Mermaid diagrams to render`);
        
        for (let i = 0; i < mermaidElements.length; i++) {
          const element = mermaidElements[i];
          const code = element.textContent || '';
          const uniqueId = `mermaid-diagram-${Date.now()}-${i}`;
          
          try {
            // Marquer comme traité
            element.classList.add('mermaid-processed');
            
            // Créer un div container pour Mermaid
            const container = document.createElement('div');
            container.className = 'mermaid-container my-6 flex justify-center items-center';
            container.style.cssText = 'max-width: 100%; overflow-x: auto; min-height: 200px;';
            
            const mermaidDiv = document.createElement('div');
            mermaidDiv.className = 'mermaid';
            mermaidDiv.id = uniqueId;
            
            // Rendre le diagramme avec Mermaid
            const { svg } = await mermaid.render(uniqueId, code);
            mermaidDiv.innerHTML = svg;
            
            container.appendChild(mermaidDiv);
            
            // Remplacer l'élément code par le container
            if (element.parentElement?.tagName === 'PRE') {
              element.parentElement.replaceWith(container);
            } else {
              element.replaceWith(container);
            }
            
            console.log(`Rendered Mermaid diagram: ${uniqueId}`);
          } catch (error) {
            console.error('Error rendering Mermaid diagram:', error);
            // Afficher une erreur à la place
            const errorDiv = document.createElement('div');
            errorDiv.className = 'bg-red-50 border border-red-200 rounded-lg p-4 my-6';
            errorDiv.innerHTML = `
              <div class="text-red-800 font-medium">Erreur de rendu du diagramme Mermaid</div>
              <div class="text-red-600 text-sm mt-1">Vérifiez la syntaxe du diagramme</div>
            `;
            
            if (element.parentElement?.tagName === 'PRE') {
              element.parentElement.replaceWith(errorDiv);
            } else {
              element.replaceWith(errorDiv);
            }
          }
        }
      } catch (error) {
        console.error('Error in renderMermaidDiagrams:', error);
      }
    };

    // Démarrer le rendu après un délai pour s'assurer que le DOM est prêt
    const initialRender = setTimeout(() => {
      renderMermaidDiagrams();
    }, 500);

    // Observer les changements du DOM pour les nouveaux diagrammes
    const observer = new MutationObserver((mutations) => {
      let shouldRender = false;
      
      mutations.forEach((mutation) => {
        if (mutation.type === 'childList') {
          const hasMermaidCode = Array.from(mutation.addedNodes).some(node => 
            node instanceof Element && 
            (node.querySelector?.('code.language-mermaid:not(.mermaid-processed)') || 
             node.matches?.('code.language-mermaid:not(.mermaid-processed)'))
          );
          
          if (hasMermaidCode) {
            shouldRender = true;
          }
        }
      });
      
      if (shouldRender) {
        setTimeout(renderMermaidDiagrams, 100);
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });

    return () => {
      clearTimeout(initialRender);
      observer.disconnect();
    };
  }, []);

  return null; // Ce composant ne rend rien visuellement
}

export function TableEnhancer() {
  useEffect(() => {
    const enhanceTables = () => {
      // Améliorer les tableaux
      const tables = document.querySelectorAll('.markdown-content table:not(.enhanced)');
      
      tables.forEach(table => {
        table.classList.add('enhanced');
        
        // Ajouter un wrapper responsive
        if (!table.parentElement?.classList.contains('table-wrapper')) {
          const wrapper = document.createElement('div');
          wrapper.className = 'table-wrapper overflow-x-auto my-6 rounded-lg border border-gray-200 dark:border-gray-700';
          
          table.parentNode?.insertBefore(wrapper, table);
          wrapper.appendChild(table);
        }
        
        // Ajouter des classes pour le style
        table.classList.add(
          'min-w-full',
          'divide-y',
          'divide-gray-200',
          'dark:divide-gray-700',
          'bg-white',
          'dark:bg-gray-800'
        );
        
        // Styliser l'en-tête
        const thead = table.querySelector('thead');
        if (thead) {
          thead.classList.add('bg-gray-50', 'dark:bg-gray-700');
          
          const headerCells = thead.querySelectorAll('th');
          headerCells.forEach(th => {
            th.classList.add(
              'px-6',
              'py-3',
              'text-left',
              'text-xs',
              'font-medium',
              'text-gray-500',
              'dark:text-gray-300',
              'uppercase',
              'tracking-wider'
            );
          });
        }
        
        // Styliser le corps
        const tbody = table.querySelector('tbody');
        if (tbody) {
          tbody.classList.add('bg-white', 'dark:bg-gray-800', 'divide-y', 'divide-gray-200', 'dark:divide-gray-700');
          
          const rows = tbody.querySelectorAll('tr');
          rows.forEach(tr => {
            tr.classList.add('hover:bg-gray-50', 'dark:hover:bg-gray-700', 'transition-colors');
            
            const cells = tr.querySelectorAll('td');
            cells.forEach(td => {
              td.classList.add(
                'px-6',
                'py-4',
                'whitespace-nowrap',
                'text-sm',
                'text-gray-900',
                'dark:text-gray-100'
              );
            });
          });
        }
      });
    };

    // Exécuter immédiatement et après les changements
    enhanceTables();
    
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'childList') {
          const hasNewTables = Array.from(mutation.addedNodes).some(node => 
            node instanceof Element && 
            (node.querySelector?.('table') || node.matches?.('table'))
          );
          
          if (hasNewTables) {
            setTimeout(enhanceTables, 50);
          }
        }
      });
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });

    return () => observer.disconnect();
  }, []);

  return null;
}