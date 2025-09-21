'use client';

import { useState, useEffect, useRef } from 'react';

interface Node {
  id: string;
  x: number;
  y: number;
  color: 'default' | 'visited' | 'current' | 'start' | 'end' | 'path';
  distance?: number;
  previous?: string;
}

interface Edge {
  from: string;
  to: string;
  weight: number;
  color: 'default' | 'active' | 'path';
}

interface GraphAlgorithmVisualizerProps {
  algorithm: 'bfs' | 'dfs' | 'dijkstra' | 'astar';
  className?: string;
}

export default function GraphAlgorithmVisualizer({ algorithm, className = '' }: GraphAlgorithmVisualizerProps) {
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);
  const [startNode, setStartNode] = useState<string>('');
  const [endNode, setEndNode] = useState<string>('');
  const [isRunning, setIsRunning] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [totalSteps, setTotalSteps] = useState(0);
  const [queue, setQueue] = useState<string[]>([]);
  const [visited, setVisited] = useState<string[]>([]);
  const [distances, setDistances] = useState<{[key: string]: number}>({});
  const [path, setPath] = useState<string[]>([]);
  const [log, setLog] = useState<string[]>([]);
  const svgRef = useRef<SVGSVGElement>(null);

  const algorithms = {
    bfs: 'Parcours en Largeur (BFS)',
    dfs: 'Parcours en Profondeur (DFS)',
    dijkstra: 'Algorithme de Dijkstra',
    astar: 'Algorithme A*'
  };

  // Initialiser un graphe exemple
  useEffect(() => {
    initializeGraph();
  }, []);

  const initializeGraph = () => {
    const sampleNodes: Node[] = [
      { id: 'A', x: 100, y: 100, color: 'default' },
      { id: 'B', x: 200, y: 50, color: 'default' },
      { id: 'C', x: 300, y: 100, color: 'default' },
      { id: 'D', x: 150, y: 200, color: 'default' },
      { id: 'E', x: 250, y: 200, color: 'default' },
      { id: 'F', x: 350, y: 250, color: 'default' },
    ];

    const sampleEdges: Edge[] = [
      { from: 'A', to: 'B', weight: 4, color: 'default' },
      { from: 'A', to: 'D', weight: 2, color: 'default' },
      { from: 'B', to: 'C', weight: 3, color: 'default' },
      { from: 'B', to: 'E', weight: 1, color: 'default' },
      { from: 'C', to: 'F', weight: 2, color: 'default' },
      { from: 'D', to: 'E', weight: 3, color: 'default' },
      { from: 'E', to: 'F', weight: 2, color: 'default' },
    ];

    setNodes(sampleNodes);
    setEdges(sampleEdges);
    setStartNode('A');
    setEndNode('F');
    resetVisualization();
  };

  const resetVisualization = () => {
    setNodes(prev => prev.map(node => ({ 
      ...node, 
      color: 'default',
      distance: undefined,
      previous: undefined
    })));
    setEdges(prev => prev.map(edge => ({ ...edge, color: 'default' })));
    setQueue([]);
    setVisited([]);
    setDistances({});
    setPath([]);
    setLog([]);
    setCurrentStep(0);
    setTotalSteps(0);
    setIsRunning(false);
  };

  const addToLog = (message: string) => {
    setLog(prev => [...prev, message]);
  };

  const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  // Algorithme BFS
  const runBFS = async () => {
    if (!startNode) return;

    const queue = [startNode];
    const visited = new Set<string>();
    const parent: {[key: string]: string} = {};
    let steps = 0;

    addToLog(`Début BFS depuis ${startNode}`);
    
    // Marquer le nœud de départ
    setNodes(prev => prev.map(node => 
      node.id === startNode ? { ...node, color: 'start' } : node
    ));
    await sleep(1000);

    while (queue.length > 0 && isRunning) {
      const current = queue.shift()!;
      
      if (visited.has(current)) continue;
      visited.add(current);

      // Marquer comme visité
      setNodes(prev => prev.map(node => 
        node.id === current ? { ...node, color: 'visited' } : node
      ));
      setVisited(Array.from(visited));
      addToLog(`Visite de ${current}`);
      await sleep(800);

      // Si on atteint la destination
      if (current === endNode) {
        addToLog(`Destination ${endNode} atteinte !`);
        
        // Reconstruire le chemin
        const path: string[] = [];
        let node = endNode;
        while (node) {
          path.unshift(node);
          node = parent[node];
        }
        setPath(path);
        
        // Colorier le chemin
        setNodes(prev => prev.map(node => 
          path.includes(node.id) ? { ...node, color: 'path' } : node
        ));
        setEdges(prev => prev.map(edge => {
          const isInPath = path.some((nodeId, index) => 
            index > 0 && 
            ((edge.from === path[index-1] && edge.to === nodeId) ||
             (edge.to === path[index-1] && edge.from === nodeId))
          );
          return isInPath ? { ...edge, color: 'path' } : edge;
        }));
        
        addToLog(`Chemin trouvé : ${path.join(' → ')}`);
        setTotalSteps(++steps);
        return;
      }

      // Marquer comme courant
      if (current !== startNode) {
        setNodes(prev => prev.map(node => 
          node.id === current ? { ...node, color: 'current' } : node
        ));
      }

      // Explorer les voisins
      const neighbors = edges.filter(edge => 
        (edge.from === current || edge.to === current)
      ).map(edge => edge.from === current ? edge.to : edge.from);

      for (const neighbor of neighbors) {
        if (!visited.has(neighbor) && !queue.includes(neighbor)) {
          queue.push(neighbor);
          parent[neighbor] = current;
          addToLog(`Ajout de ${neighbor} à la file`);
        }
      }

      setQueue([...queue]);
      await sleep(1000);
      steps++;
    }

    setTotalSteps(steps);
  };

  // Algorithme DFS
  const runDFS = async () => {
    if (!startNode) return;

    const stack = [startNode];
    const visited = new Set<string>();
    const parent: {[key: string]: string} = {};
    let steps = 0;

    addToLog(`Début DFS depuis ${startNode}`);

    while (stack.length > 0 && isRunning) {
      const current = stack.pop()!;
      
      if (visited.has(current)) continue;
      visited.add(current);

      // Marquer comme visité
      setNodes(prev => prev.map(node => 
        node.id === current ? { ...node, color: current === startNode ? 'start' : 'visited' } : node
      ));
      setVisited(Array.from(visited));
      addToLog(`Visite de ${current}`);
      await sleep(800);

      // Si on atteint la destination
      if (current === endNode) {
        addToLog(`Destination ${endNode} atteinte !`);
        
        // Reconstruire le chemin
        const path: string[] = [];
        let node = endNode;
        while (node) {
          path.unshift(node);
          node = parent[node];
        }
        setPath(path);
        
        // Colorier le chemin
        setNodes(prev => prev.map(node => 
          path.includes(node.id) ? { ...node, color: 'path' } : node
        ));
        
        addToLog(`Chemin trouvé : ${path.join(' → ')}`);
        setTotalSteps(++steps);
        return;
      }

      // Explorer les voisins (en ordre inverse pour DFS)
      const neighbors = edges.filter(edge => 
        (edge.from === current || edge.to === current)
      ).map(edge => edge.from === current ? edge.to : edge.from)
       .reverse();

      for (const neighbor of neighbors) {
        if (!visited.has(neighbor)) {
          stack.push(neighbor);
          parent[neighbor] = current;
          addToLog(`Ajout de ${neighbor} à la pile`);
        }
      }

      await sleep(1000);
      steps++;
    }

    setTotalSteps(steps);
  };

  // Algorithme de Dijkstra
  const runDijkstra = async () => {
    if (!startNode) return;

    const distances: {[key: string]: number} = {};
    const previous: {[key: string]: string} = {};
    const unvisited = new Set<string>();

    // Initialisation
    nodes.forEach(node => {
      distances[node.id] = node.id === startNode ? 0 : Infinity;
      unvisited.add(node.id);
    });

    setDistances({...distances});
    addToLog(`Début Dijkstra depuis ${startNode}`);
    
    // Marquer le nœud de départ
    setNodes(prev => prev.map(node => 
      node.id === startNode ? { ...node, color: 'start', distance: 0 } : 
      { ...node, distance: Infinity }
    ));
    await sleep(1000);

    let steps = 0;

    while (unvisited.size > 0 && isRunning) {
      // Trouver le nœud non visité avec la plus petite distance
      let current = '';
      let minDistance = Infinity;
      
      for (const nodeId of unvisited) {
        if (distances[nodeId] < minDistance) {
          minDistance = distances[nodeId];
          current = nodeId;
        }
      }

      if (minDistance === Infinity) break; // Graphe déconnecté

      unvisited.delete(current);
      
      // Marquer comme courant
      setNodes(prev => prev.map(node => 
        node.id === current ? { ...node, color: current === startNode ? 'start' : 'current' } : node
      ));
      addToLog(`Traitement de ${current} (distance: ${distances[current]})`);
      await sleep(800);

      // Si on atteint la destination
      if (current === endNode) {
        addToLog(`Destination ${endNode} atteinte ! Distance: ${distances[current]}`);
        
        // Reconstruire le chemin
        const path: string[] = [];
        let node = endNode;
        while (node) {
          path.unshift(node);
          node = previous[node];
        }
        setPath(path);
        
        // Colorier le chemin
        setNodes(prev => prev.map(node => 
          path.includes(node.id) ? { ...node, color: 'path' } : node
        ));
        
        addToLog(`Chemin optimal : ${path.join(' → ')} (distance totale: ${distances[current]})`);
        setTotalSteps(++steps);
        return;
      }

      // Examiner les voisins
      const neighbors = edges.filter(edge => 
        edge.from === current || edge.to === current
      );

      for (const edge of neighbors) {
        const neighbor = edge.from === current ? edge.to : edge.from;
        if (!unvisited.has(neighbor)) continue;

        const tentativeDistance = distances[current] + edge.weight;
        
        if (tentativeDistance < distances[neighbor]) {
          distances[neighbor] = tentativeDistance;
          previous[neighbor] = current;
          
          // Mettre à jour l'affichage
          setNodes(prev => prev.map(node => 
            node.id === neighbor ? { ...node, distance: tentativeDistance } : node
          ));
          
          addToLog(`Mise à jour de ${neighbor}: distance ${tentativeDistance} via ${current}`);
        }
      }

      // Marquer comme visité
      setNodes(prev => prev.map(node => 
        node.id === current ? { ...node, color: current === startNode ? 'start' : 'visited' } : node
      ));

      setDistances({...distances});
      await sleep(1000);
      steps++;
    }

    setTotalSteps(steps);
  };

  const startAlgorithm = async () => {
    if (!startNode || !endNode) {
      addToLog('Veuillez sélectionner un nœud de départ et d\'arrivée');
      return;
    }

    setIsRunning(true);
    resetVisualization();
    
    // Marquer les nœuds de départ et d'arrivée
    setNodes(prev => prev.map(node => ({
      ...node,
      color: node.id === startNode ? 'start' : 
             node.id === endNode ? 'end' : 'default'
    })));

    await sleep(500);

    try {
      switch (algorithm) {
        case 'bfs':
          await runBFS();
          break;
        case 'dfs':
          await runDFS();
          break;
        case 'dijkstra':
          await runDijkstra();
          break;
        default:
          await runBFS();
      }
    } catch (error) {
      console.error('Erreur lors de l\'exécution:', error);
    }

    setIsRunning(false);
  };

  const stopAlgorithm = () => {
    setIsRunning(false);
  };

  const getNodeColor = (color: Node['color']) => {
    switch (color) {
      case 'start': return '#10B981';
      case 'end': return '#EF4444';
      case 'current': return '#F59E0B';
      case 'visited': return '#6366F1';
      case 'path': return '#8B5CF6';
      default: return '#94A3B8';
    }
  };

  const getEdgeColor = (color: Edge['color']) => {
    switch (color) {
      case 'active': return '#F59E0B';
      case 'path': return '#8B5CF6';
      default: return '#94A3B8';
    }
  };

  return (
    <div className={`bg-white rounded-lg shadow-lg p-6 ${className}`}>
      <div className="mb-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4">
          Visualiseur : {algorithms[algorithm]}
        </h3>

        {/* Contrôles */}
        <div className="flex flex-wrap items-center gap-4 mb-4">
          <div className="flex items-center space-x-2">
            <label className="text-sm font-medium text-gray-700">Départ :</label>
            <select
              value={startNode}
              onChange={(e) => setStartNode(e.target.value)}
              disabled={isRunning}
              className="border border-gray-300 rounded px-2 py-1"
            >
              {nodes.map(node => (
                <option key={node.id} value={node.id}>{node.id}</option>
              ))}
            </select>
          </div>

          <div className="flex items-center space-x-2">
            <label className="text-sm font-medium text-gray-700">Arrivée :</label>
            <select
              value={endNode}
              onChange={(e) => setEndNode(e.target.value)}
              disabled={isRunning}
              className="border border-gray-300 rounded px-2 py-1"
            >
              {nodes.map(node => (
                <option key={node.id} value={node.id}>{node.id}</option>
              ))}
            </select>
          </div>

          <button
            onClick={isRunning ? stopAlgorithm : startAlgorithm}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              isRunning
                ? 'bg-red-600 hover:bg-red-700 text-white'
                : 'bg-blue-600 hover:bg-blue-700 text-white'
            }`}
          >
            {isRunning ? '⏹️ Arrêter' : '▶️ Démarrer'}
          </button>

          <button
            onClick={resetVisualization}
            disabled={isRunning}
            className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-medium disabled:opacity-50"
          >
            🔄 Réinitialiser
          </button>

          <button
            onClick={initializeGraph}
            disabled={isRunning}
            className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium disabled:opacity-50"
          >
            🎲 Nouveau Graphe
          </button>
        </div>

        {/* Informations */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 text-sm">
          <div className="bg-gray-50 p-3 rounded-lg">
            <div className="font-medium text-gray-900">État</div>
            <div className="text-gray-600">
              {isRunning ? 'En cours...' : 'Prêt'}
            </div>
          </div>
          
          <div className="bg-gray-50 p-3 rounded-lg">
            <div className="font-medium text-gray-900">Nœuds visités</div>
            <div className="text-gray-600">{visited.length}</div>
          </div>
          
          {path.length > 0 && (
            <div className="bg-gray-50 p-3 rounded-lg">
              <div className="font-medium text-gray-900">Longueur du chemin</div>
              <div className="text-gray-600">{path.length - 1} arêtes</div>
            </div>
          )}
        </div>
      </div>

      {/* Visualisation du graphe */}
      <div className="mb-6 bg-gray-50 rounded-lg p-4">
        <svg ref={svgRef} width="450" height="300" className="border rounded">
          {/* Arêtes */}
          {edges.map((edge, index) => {
            const fromNode = nodes.find(n => n.id === edge.from);
            const toNode = nodes.find(n => n.id === edge.to);
            if (!fromNode || !toNode) return null;

            const midX = (fromNode.x + toNode.x) / 2;
            const midY = (fromNode.y + toNode.y) / 2;

            return (
              <g key={index}>
                <line
                  x1={fromNode.x}
                  y1={fromNode.y}
                  x2={toNode.x}
                  y2={toNode.y}
                  stroke={getEdgeColor(edge.color)}
                  strokeWidth={edge.color === 'path' ? 3 : 2}
                  opacity={edge.color === 'default' ? 0.6 : 1}
                />
                {(algorithm === 'dijkstra' || algorithm === 'astar') && (
                  <text
                    x={midX}
                    y={midY - 5}
                    textAnchor="middle"
                    fontSize="12"
                    fill="#374151"
                    fontWeight="bold"
                    className="bg-white"
                  >
                    {edge.weight}
                  </text>
                )}
              </g>
            );
          })}

          {/* Nœuds */}
          {nodes.map(node => (
            <g key={node.id}>
              <circle
                cx={node.x}
                cy={node.y}
                r="20"
                fill={getNodeColor(node.color)}
                stroke="#374151"
                strokeWidth="2"
                className="transition-all duration-300"
              />
              <text
                x={node.x}
                y={node.y + 4}
                textAnchor="middle"
                fill="white"
                fontSize="14"
                fontWeight="bold"
              >
                {node.id}
              </text>
              {algorithm === 'dijkstra' && node.distance !== undefined && node.distance !== Infinity && (
                <text
                  x={node.x}
                  y={node.y - 30}
                  textAnchor="middle"
                  fontSize="12"
                  fill="#374151"
                  fontWeight="bold"
                >
                  d: {node.distance}
                </text>
              )}
            </g>
          ))}
        </svg>
      </div>

      {/* Légende */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-2 text-xs mb-6">
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-gray-400 rounded-full"></div>
          <span>Non visité</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-green-500 rounded-full"></div>
          <span>Départ</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-red-500 rounded-full"></div>
          <span>Arrivée</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
          <span>Courant</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-indigo-500 rounded-full"></div>
          <span>Visité</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-purple-500 rounded-full"></div>
          <span>Chemin</span>
        </div>
      </div>

      {/* Journal des opérations */}
      <div className="bg-gray-50 rounded-lg p-4">
        <h4 className="font-medium text-gray-900 mb-2">Journal d'exécution :</h4>
        <div className="max-h-40 overflow-y-auto space-y-1">
          {log.length === 0 ? (
            <div className="text-gray-500 text-sm">Aucune opération en cours</div>
          ) : (
            log.map((entry, index) => (
              <div key={index} className="text-sm text-gray-700 font-mono">
                {index + 1}. {entry}
              </div>
            ))
          )}
        </div>
      </div>

      {/* Description de l'algorithme */}
      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <h4 className="font-medium text-blue-900 mb-2">À propos de {algorithms[algorithm]} :</h4>
        <p className="text-sm text-blue-800">
          {algorithm === 'bfs' && "Explore le graphe niveau par niveau en utilisant une file (FIFO). Garantit de trouver le chemin le plus court en nombre d'arêtes."}
          {algorithm === 'dfs' && "Explore le graphe en profondeur en utilisant une pile (LIFO). Peut ne pas trouver le chemin optimal mais utilise moins de mémoire."}
          {algorithm === 'dijkstra' && "Trouve le chemin le plus court entre deux nœuds dans un graphe pondéré sans cycles négatifs. Utilise une approche gloutonne."}
          {algorithm === 'astar' && "Extension de Dijkstra qui utilise une heuristique pour guider la recherche vers l'objectif plus efficacement."}
        </p>
        <div className="mt-2 text-xs text-blue-700">
          <strong>Complexité temporelle :</strong> {
            algorithm === 'bfs' ? 'O(V + E)' :
            algorithm === 'dfs' ? 'O(V + E)' :
            algorithm === 'dijkstra' ? 'O((V + E) log V)' :
            'O((V + E) log V)'
          } où V = nœuds, E = arêtes
        </div>
      </div>
    </div>
  );
}