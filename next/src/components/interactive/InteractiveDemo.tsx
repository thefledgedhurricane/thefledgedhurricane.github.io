'use client';

import { useState } from 'react';
import SortingVisualizer from './SortingVisualizer';
import DataStructureVisualizer from './DataStructureVisualizer';
import GraphAlgorithmVisualizer from './GraphAlgorithmVisualizer';
import MathVisualizer from './MathVisualizer';

interface InteractiveDemoProps {
  category?: 'algorithms' | 'dataStructures' | 'graphs' | 'math' | 'all';
  className?: string;
}

export default function InteractiveDemo({ category = 'all', className = '' }: InteractiveDemoProps) {
  const [activeTab, setActiveTab] = useState('algorithms');
  const [activeDemo, setActiveDemo] = useState<{[key: string]: string}>({
    algorithms: 'bubble',
    dataStructures: 'bst',
    graphs: 'bfs',
    math: 'function'
  });

  const categories = {
    algorithms: {
      title: 'Algorithmes de Tri',
      demos: [
        { id: 'bubble', name: 'Tri à Bulles', description: 'Algorithme simple comparant les éléments adjacents' },
        { id: 'selection', name: 'Tri par Sélection', description: 'Trouve le minimum et le place au début' },
        { id: 'insertion', name: 'Tri par Insertion', description: 'Insère chaque élément à sa place dans la partie triée' },
        { id: 'quick', name: 'Tri Rapide', description: 'Divise autour d&apos;un pivot et trie récursivement' },
        { id: 'merge', name: 'Tri Fusion', description: 'Divise puis fusionne les parties triées' }
      ]
    },
    dataStructures: {
      title: 'Structures de Données',
      demos: [
        { id: 'bst', name: 'Arbre Binaire de Recherche', description: 'Structure arborescente pour la recherche efficace' },
        { id: 'heap', name: 'Tas (Heap)', description: 'Arbre binaire complet avec propriété de tas' },
        { id: 'linkedList', name: 'Liste Chaînée', description: 'Séquence d&apos;éléments liés par des pointeurs' },
        { id: 'stack', name: 'Pile (Stack)', description: 'Structure LIFO (Last In, First Out)' },
        { id: 'queue', name: 'File (Queue)', description: 'Structure FIFO (First In, First Out)' }
      ]
    },
    graphs: {
      title: 'Algorithmes de Graphes',
      demos: [
        { id: 'bfs', name: 'Parcours en Largeur', description: 'Explore niveau par niveau avec une file' },
        { id: 'dfs', name: 'Parcours en Profondeur', description: 'Explore en profondeur avec une pile' },
        { id: 'dijkstra', name: 'Dijkstra', description: 'Plus court chemin dans un graphe pondéré' },
        { id: 'astar', name: 'A*', description: 'Dijkstra optimisé avec heuristique' }
      ]
    },
    math: {
      title: 'Mathématiques et Statistiques',
      demos: [
        { id: 'function', name: 'Fonctions', description: 'Visualisation de fonctions mathématiques' },
        { id: 'distribution', name: 'Distributions', description: 'Distributions statistiques et échantillonnage' },
        { id: 'regression', name: 'Régression', description: 'Régression linéaire et ajustement de modèles' },
        { id: 'gradient', name: 'Descente de Gradient', description: 'Optimisation par descente de gradient' },
        { id: 'fourier', name: 'Série de Fourier', description: 'Décomposition en séries de Fourier' }
      ]
    }
  };

  const getAvailableCategories = () => {
    if (category === 'all') {
      return Object.keys(categories);
    }
    return [category];
  };

  const handleDemoChange = (categoryKey: string, demoId: string) => {
    setActiveDemo(prev => ({
      ...prev,
      [categoryKey]: demoId
    }));
  };

  const renderDemo = (categoryKey: string, demoId: string) => {
    switch (categoryKey) {
      case 'algorithms':
        return <SortingVisualizer algorithm={demoId as any} />;
      case 'dataStructures':
        return <DataStructureVisualizer type={demoId as any} />;
      case 'graphs':
        return <GraphAlgorithmVisualizer algorithm={demoId as any} />;
      case 'math':
        return <MathVisualizer type={demoId as any} />;
      default:
        return null;
    }
  };

  const availableCategories = getAvailableCategories();

  return (
    <div className={`bg-gray-50 rounded-xl p-6 ${className}`}>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Démonstrations Interactives
        </h2>
        <p className="text-gray-600">
          Explorez les concepts informatiques et mathématiques avec des visualisations interactives
        </p>
      </div>

      {/* Navigation entre catégories */}
      {availableCategories.length > 1 && (
        <div className="mb-6">
          <nav className="flex space-x-1 bg-white rounded-lg p-1 shadow-sm">
            {availableCategories.map(categoryKey => (
              <button
                key={categoryKey}
                onClick={() => setActiveTab(categoryKey)}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  activeTab === categoryKey
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                {categories[categoryKey as keyof typeof categories].title}
              </button>
            ))}
          </nav>
        </div>
      )}

      {/* Contenu de la catégorie active */}
      {availableCategories.map(categoryKey => {
        const isActive = availableCategories.length === 1 || activeTab === categoryKey;
        if (!isActive) return null;

        const categoryData = categories[categoryKey as keyof typeof categories];
        const currentDemo = activeDemo[categoryKey];

        return (
          <div key={categoryKey} className="space-y-6">
            {/* Sélecteur de démonstration */}
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                {categoryData.title}
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {categoryData.demos.map(demo => (
                  <button
                    key={demo.id}
                    onClick={() => handleDemoChange(categoryKey, demo.id)}
                    className={`p-3 rounded-lg text-left transition-all duration-200 ${
                      currentDemo === demo.id
                        ? 'bg-blue-50 border-2 border-blue-200 text-blue-900'
                        : 'bg-gray-50 border-2 border-transparent text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <div className="font-medium mb-1">{demo.name}</div>
                    <div className="text-xs text-gray-600">{demo.description}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Démonstration active */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              {renderDemo(categoryKey, currentDemo)}
            </div>

            {/* Informations pédagogiques */}
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h4 className="text-lg font-semibold text-gray-900 mb-3">
                📚 À propos de cette démonstration
              </h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h5 className="font-medium text-gray-900 mb-2">🎯 Objectifs pédagogiques</h5>
                  <ul className="text-sm text-gray-700 space-y-1">
                    {categoryKey === 'algorithms' && (
                      <>
                        <li>• Comprendre les différentes approches de tri</li>
                        <li>• Analyser la complexité temporelle et spatiale</li>
                        <li>• Visualiser l&apos;évolution des algorithmes</li>
                        <li>• Comparer les performances relatives</li>
                      </>
                    )}
                    {categoryKey === 'dataStructures' && (
                      <>
                        <li>• Maîtriser les structures de données fondamentales</li>
                        <li>• Comprendre les opérations et leur complexité</li>
                        <li>• Visualiser l&apos;organisation des données</li>
                        <li>• Choisir la structure adaptée au problème</li>
                      </>
                    )}
                    {categoryKey === 'graphs' && (
                      <>
                        <li>• Comprendre les algorithmes de parcours</li>
                        <li>• Maîtriser la recherche de chemins</li>
                        <li>• Analyser les stratégies d&apos;exploration</li>
                        <li>• Optimiser les performances de recherche</li>
                      </>
                    )}
                    {categoryKey === 'math' && (
                      <>
                        <li>• Visualiser les concepts mathématiques abstraits</li>
                        <li>• Comprendre les liens théorie-pratique</li>
                        <li>• Expérimenter avec les paramètres</li>
                        <li>• Développer l&apos;intuition mathématique</li>
                      </>
                    )}
                  </ul>
                </div>

                <div>
                  <h5 className="font-medium text-gray-900 mb-2">💡 Conseils d&apos;utilisation</h5>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• Commencez par les exemples simples</li>
                    <li>• Modifiez les paramètres pour voir l&apos;impact</li>
                    <li>• Observez les étapes d&apos;exécution</li>
                    <li>• Comparez les différentes approches</li>
                    <li>• Prenez des notes sur vos observations</li>
                    <li>• Testez vos hypothèses avec la visualisation</li>
                  </ul>
                </div>
              </div>

              {/* Défis et exercices */}
              <div className="mt-6 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-200">
                <h5 className="font-medium text-purple-900 mb-2">🏆 Défis et exercices</h5>
                <div className="text-sm text-purple-800 space-y-2">
                  {categoryKey === 'algorithms' && (
                    <>
                      <p><strong>Défi 1 :</strong> Comparez les temps d&apos;exécution pour différentes tailles de tableaux</p>
                      <p><strong>Défi 2 :</strong> Identifiez les cas où chaque algorithme est optimal</p>
                      <p><strong>Défi 3 :</strong> Prédisez le nombre d&apos;opérations avant d&apos;exécuter</p>
                    </>
                  )}
                  {categoryKey === 'dataStructures' && (
                    <>
                      <p><strong>Défi 1 :</strong> Implémentez mentalement chaque opération</p>
                      <p><strong>Défi 2 :</strong> Prédisez la complexité de chaque opération</p>
                      <p><strong>Défi 3 :</strong> Identifiez les cas d&apos;usage optimaux</p>
                    </>
                  )}
                  {categoryKey === 'graphs' && (
                    <>
                      <p><strong>Défi 1 :</strong> Prédisez l&apos;ordre de visite des nœuds</p>
                      <p><strong>Défi 2 :</strong> Comparez les chemins trouvés par chaque algorithme</p>
                      <p><strong>Défi 3 :</strong> Modifiez les poids et observez l&apos;impact</p>
                    </>
                  )}
                  {categoryKey === 'math' && (
                    <>
                      <p><strong>Défi 1 :</strong> Prédisez l&apos;effet de chaque paramètre</p>
                      <p><strong>Défi 2 :</strong> Identifiez les relations mathématiques</p>
                      <p><strong>Défi 3 :</strong> Trouvez des applications réelles</p>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      })}

      {/* Footer avec ressources supplémentaires */}
      <div className="mt-8 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
        <h4 className="font-medium text-blue-900 mb-2">📖 Ressources pour aller plus loin</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-blue-800">
          <div>
            <h5 className="font-medium mb-1">Livres recommandés :</h5>
            <ul className="space-y-1">
              <li>• &ldquo;Introduction to Algorithms&rdquo; (CLRS)</li>
              <li>• &ldquo;Algorithms&rdquo; par Robert Sedgewick</li>
              <li>• &ldquo;The Algorithm Design Manual&rdquo; par Skiena</li>
            </ul>
          </div>
          <div>
            <h5 className="font-medium mb-1">Pratique en ligne :</h5>
            <ul className="space-y-1">
              <li>• LeetCode pour les algorithmes</li>
              <li>• HackerRank pour la pratique</li>
              <li>• VisuAlgo pour plus de visualisations</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}