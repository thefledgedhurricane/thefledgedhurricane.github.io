'use client';

import { useState, useEffect } from 'react';

interface TreeNode {
  value: number;
  left?: TreeNode;
  right?: TreeNode;
  id: string;
}

interface Position {
  x: number;
  y: number;
}

interface DataStructureVisualizerProps {
  type: 'bst' | 'heap' | 'linkedList' | 'stack' | 'queue';
  className?: string;
}

export default function DataStructureVisualizer({ type, className = '' }: DataStructureVisualizerProps) {
  const [structure, setStructure] = useState<any>(null);
  const [inputValue, setInputValue] = useState('');
  const [operation, setOperation] = useState<string>('');
  const [history, setHistory] = useState<string[]>([]);
  const [isAnimating, setIsAnimating] = useState(false);

  const structures = {
    bst: 'Arbre Binaire de Recherche',
    heap: 'Tas (Heap)',
    linkedList: 'Liste Chaînée',
    stack: 'Pile (Stack)',
    queue: 'File (Queue)'
  };

  // Initialisation selon le type
  useEffect(() => {
    initializeStructure();
  }, [type]);

  const initializeStructure = () => {
    switch (type) {
      case 'bst':
        setStructure(null);
        break;
      case 'heap':
        setStructure([]);
        break;
      case 'linkedList':
        setStructure({ head: null, size: 0 });
        break;
      case 'stack':
        setStructure([]);
        break;
      case 'queue':
        setStructure([]);
        break;
    }
    setHistory([]);
  };

  const addToHistory = (message: string) => {
    setHistory(prev => [...prev, message]);
  };

  // Opérations pour BST
  const insertBST = (value: number) => {
    const newNode: TreeNode = {
      value,
      id: `node-${Date.now()}`
    };

    if (!structure) {
      setStructure(newNode);
      addToHistory(`Insertion de ${value} comme racine`);
      return;
    }

    const insert = (node: TreeNode): TreeNode => {
      if (value < node.value) {
        if (!node.left) {
          node.left = newNode;
          addToHistory(`Insertion de ${value} à gauche de ${node.value}`);
        } else {
          node.left = insert(node.left);
        }
      } else if (value > node.value) {
        if (!node.right) {
          node.right = newNode;
          addToHistory(`Insertion de ${value} à droite de ${node.value}`);
        } else {
          node.right = insert(node.right);
        }
      } else {
        addToHistory(`Valeur ${value} déjà présente`);
      }
      return node;
    };

    setStructure({ ...insert(structure) });
  };

  const searchBST = (value: number) => {
    if (!structure) {
      addToHistory(`Recherche de ${value} : arbre vide`);
      return;
    }

    const search = (node: TreeNode | undefined, path: string[] = []): boolean => {
      if (!node) {
        addToHistory(`Recherche de ${value} : non trouvé. Chemin : ${path.join(' -> ')}`);
        return false;
      }

      path.push(node.value.toString());

      if (value === node.value) {
        addToHistory(`Recherche de ${value} : trouvé ! Chemin : ${path.join(' -> ')}`);
        return true;
      }

      if (value < node.value) {
        addToHistory(`${value} < ${node.value}, aller à gauche`);
        return search(node.left, path);
      } else {
        addToHistory(`${value} > ${node.value}, aller à droite`);
        return search(node.right, path);
      }
    };

    search(structure);
  };

  // Opérations pour Heap
  const insertHeap = (value: number) => {
    const newHeap = [...structure, value];
    
    // Heapify vers le haut
    let index = newHeap.length - 1;
    while (index > 0) {
      const parentIndex = Math.floor((index - 1) / 2);
      if (newHeap[index] <= newHeap[parentIndex]) break;
      
      [newHeap[index], newHeap[parentIndex]] = [newHeap[parentIndex], newHeap[index]];
      addToHistory(`Échange ${newHeap[parentIndex]} et ${newHeap[index]} (index ${index} avec parent ${parentIndex})`);
      index = parentIndex;
    }

    setStructure(newHeap);
    addToHistory(`Insertion de ${value} dans le tas`);
  };

  const extractMaxHeap = () => {
    if (structure.length === 0) {
      addToHistory('Tas vide, impossible d\'extraire');
      return;
    }

    const max = structure[0];
    const newHeap = [...structure];
    newHeap[0] = newHeap[newHeap.length - 1];
    newHeap.pop();

    if (newHeap.length > 0) {
      // Heapify vers le bas
      let index = 0;
      while (true) {
        const leftChild = 2 * index + 1;
        const rightChild = 2 * index + 2;
        let largest = index;

        if (leftChild < newHeap.length && newHeap[leftChild] > newHeap[largest]) {
          largest = leftChild;
        }
        if (rightChild < newHeap.length && newHeap[rightChild] > newHeap[largest]) {
          largest = rightChild;
        }

        if (largest === index) break;

        [newHeap[index], newHeap[largest]] = [newHeap[largest], newHeap[index]];
        addToHistory(`Échange ${newHeap[largest]} et ${newHeap[index]} (heapify vers le bas)`);
        index = largest;
      }
    }

    setStructure(newHeap);
    addToHistory(`Extraction du maximum : ${max}`);
  };

  // Opérations pour Stack
  const pushStack = (value: number) => {
    const newStack = [...structure, value];
    setStructure(newStack);
    addToHistory(`Push ${value} sur la pile`);
  };

  const popStack = () => {
    if (structure.length === 0) {
      addToHistory('Pile vide, impossible de pop');
      return;
    }
    const value = structure[structure.length - 1];
    const newStack = structure.slice(0, -1);
    setStructure(newStack);
    addToHistory(`Pop ${value} de la pile`);
  };

  // Opérations pour Queue
  const enqueue = (value: number) => {
    const newQueue = [...structure, value];
    setStructure(newQueue);
    addToHistory(`Enqueue ${value} dans la file`);
  };

  const dequeue = () => {
    if (structure.length === 0) {
      addToHistory('File vide, impossible de dequeue');
      return;
    }
    const value = structure[0];
    const newQueue = structure.slice(1);
    setStructure(newQueue);
    addToHistory(`Dequeue ${value} de la file`);
  };

  const handleOperation = (op: string) => {
    setIsAnimating(true);
    const value = parseInt(inputValue);

    if (isNaN(value) && ['insert', 'search', 'push', 'enqueue'].includes(op)) {
      addToHistory('Veuillez entrer une valeur valide');
      setIsAnimating(false);
      return;
    }

    setTimeout(() => {
      switch (type) {
        case 'bst':
          if (op === 'insert') insertBST(value);
          else if (op === 'search') searchBST(value);
          break;
        case 'heap':
          if (op === 'insert') insertHeap(value);
          else if (op === 'extractMax') extractMaxHeap();
          break;
        case 'stack':
          if (op === 'push') pushStack(value);
          else if (op === 'pop') popStack();
          break;
        case 'queue':
          if (op === 'enqueue') enqueue(value);
          else if (op === 'dequeue') dequeue();
          break;
      }
      setInputValue('');
      setIsAnimating(false);
    }, 300);
  };

  // Rendu BST
  const renderBST = () => {
    if (!structure) return <div className="text-center text-gray-500 py-8">Arbre vide</div>;

    const calculatePositions = (node: TreeNode, x: number, y: number, level: number): { node: TreeNode, x: number, y: number }[] => {
      const positions = [{ node, x, y }];
      const spacing = Math.max(80, 200 / (level + 1));

      if (node.left) {
        positions.push(...calculatePositions(node.left, x - spacing, y + 60, level + 1));
      }
      if (node.right) {
        positions.push(...calculatePositions(node.right, x + spacing, y + 60, level + 1));
      }

      return positions;
    };

    const positions = calculatePositions(structure, 200, 40, 0);

    return (
      <div className="relative bg-gray-50 rounded-lg" style={{ height: '300px', width: '400px' }}>
        <svg className="absolute inset-0" width="400" height="300">
          {positions.map(pos => {
            const { node } = pos;
            return (
              <g key={node.id}>
                {node.left && (
                  <line
                    x1={pos.x}
                    y1={pos.y}
                    x2={pos.x - Math.max(80, 200 / 1)}
                    y2={pos.y + 60}
                    stroke="#374151"
                    strokeWidth="2"
                  />
                )}
                {node.right && (
                  <line
                    x1={pos.x}
                    y1={pos.y}
                    x2={pos.x + Math.max(80, 200 / 1)}
                    y2={pos.y + 60}
                    stroke="#374151"
                    strokeWidth="2"
                  />
                )}
              </g>
            );
          })}
          {positions.map(pos => (
            <g key={`node-${pos.node.id}`}>
              <circle
                cx={pos.x}
                cy={pos.y}
                r="20"
                fill="#3B82F6"
                stroke="#1E40AF"
                strokeWidth="2"
              />
              <text
                x={pos.x}
                y={pos.y + 5}
                textAnchor="middle"
                fill="white"
                fontSize="14"
                fontWeight="bold"
              >
                {pos.node.value}
              </text>
            </g>
          ))}
        </svg>
      </div>
    );
  };

  // Rendu Heap
  const renderHeap = () => {
    if (structure.length === 0) return <div className="text-center text-gray-500 py-8">Tas vide</div>;

    return (
      <div className="space-y-4">
        {/* Représentation en arbre */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="grid grid-cols-8 gap-2">
            {structure.map((value: number, index: number) => (
              <div
                key={index}
                className="bg-blue-500 text-white rounded-lg p-2 text-center font-bold"
                style={{
                  gridColumn: `${(index % 8) + 1}`,
                  gridRow: `${Math.floor(index / 8) + 1}`
                }}
              >
                {value}
              </div>
            ))}
          </div>
        </div>
        
        {/* Représentation en tableau */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="font-medium mb-2">Représentation en tableau :</h4>
          <div className="flex flex-wrap gap-1">
            {structure.map((value: number, index: number) => (
              <div key={index} className="bg-green-500 text-white p-2 rounded text-sm">
                [{index}]: {value}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  // Rendu Stack
  const renderStack = () => {
    return (
      <div className="bg-gray-50 p-4 rounded-lg flex flex-col items-center" style={{ height: '300px' }}>
        <div className="text-sm text-gray-600 mb-2">Sommet ↓</div>
        <div className="flex flex-col-reverse items-center space-y-reverse space-y-1 flex-1 justify-end">
          {structure.map((value: number, index: number) => (
            <div
              key={index}
              className={`bg-blue-500 text-white p-3 rounded-lg font-bold w-20 text-center transition-all duration-300 ${
                index === structure.length - 1 ? 'ring-2 ring-yellow-400' : ''
              }`}
            >
              {value}
            </div>
          ))}
        </div>
        <div className="border-t-2 border-gray-800 w-24 mt-2"></div>
        <div className="text-xs text-gray-600 mt-1">Base</div>
      </div>
    );
  };

  // Rendu Queue
  const renderQueue = () => {
    return (
      <div className="bg-gray-50 p-4 rounded-lg">
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span>← Sortie (Front)</span>
          <span>Entrée (Rear) →</span>
        </div>
        <div className="flex items-center space-x-2 min-h-16">
          {structure.length === 0 ? (
            <div className="text-gray-500 text-center w-full py-4">File vide</div>
          ) : (
            structure.map((value: number, index: number) => (
              <div
                key={index}
                className={`bg-blue-500 text-white p-3 rounded-lg font-bold w-16 text-center transition-all duration-300 ${
                  index === 0 ? 'ring-2 ring-red-400' : index === structure.length - 1 ? 'ring-2 ring-green-400' : ''
                }`}
              >
                {value}
              </div>
            ))
          )}
        </div>
        <div className="flex justify-between text-xs text-gray-600 mt-2">
          <span>Premier à sortir</span>
          <span>Dernier entré</span>
        </div>
      </div>
    );
  };

  const getOperationButtons = () => {
    switch (type) {
      case 'bst':
        return (
          <>
            <button
              onClick={() => handleOperation('insert')}
              disabled={isAnimating}
              className="px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
            >
              Insérer
            </button>
            <button
              onClick={() => handleOperation('search')}
              disabled={isAnimating}
              className="px-3 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
            >
              Rechercher
            </button>
          </>
        );
      case 'heap':
        return (
          <>
            <button
              onClick={() => handleOperation('insert')}
              disabled={isAnimating}
              className="px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
            >
              Insérer
            </button>
            <button
              onClick={() => handleOperation('extractMax')}
              disabled={isAnimating}
              className="px-3 py-2 bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50"
            >
              Extraire Max
            </button>
          </>
        );
      case 'stack':
        return (
          <>
            <button
              onClick={() => handleOperation('push')}
              disabled={isAnimating}
              className="px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
            >
              Push
            </button>
            <button
              onClick={() => handleOperation('pop')}
              disabled={isAnimating}
              className="px-3 py-2 bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50"
            >
              Pop
            </button>
          </>
        );
      case 'queue':
        return (
          <>
            <button
              onClick={() => handleOperation('enqueue')}
              disabled={isAnimating}
              className="px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
            >
              Enqueue
            </button>
            <button
              onClick={() => handleOperation('dequeue')}
              disabled={isAnimating}
              className="px-3 py-2 bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50"
            >
              Dequeue
            </button>
          </>
        );
      default:
        return null;
    }
  };

  const renderStructure = () => {
    switch (type) {
      case 'bst':
        return renderBST();
      case 'heap':
        return renderHeap();
      case 'stack':
        return renderStack();
      case 'queue':
        return renderQueue();
      default:
        return null;
    }
  };

  return (
    <div className={`bg-white rounded-lg shadow-lg p-6 ${className}`}>
      <div className="mb-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4">
          Visualiseur : {structures[type]}
        </h3>

        {/* Contrôles */}
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <input
            type="number"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Valeur"
            className="px-3 py-2 border border-gray-300 rounded-lg w-24"
            disabled={isAnimating}
          />
          
          {getOperationButtons()}
          
          <button
            onClick={initializeStructure}
            disabled={isAnimating}
            className="px-3 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 disabled:opacity-50"
          >
            Réinitialiser
          </button>
        </div>
      </div>

      {/* Visualisation */}
      <div className="mb-6 flex justify-center">
        {renderStructure()}
      </div>

      {/* Historique */}
      <div className="bg-gray-50 rounded-lg p-4">
        <h4 className="font-medium text-gray-900 mb-2">Historique des opérations :</h4>
        <div className="max-h-32 overflow-y-auto space-y-1">
          {history.length === 0 ? (
            <div className="text-gray-500 text-sm">Aucune opération effectuée</div>
          ) : (
            history.map((entry, index) => (
              <div key={index} className="text-sm text-gray-700 font-mono">
                {index + 1}. {entry}
              </div>
            ))
          )}
        </div>
      </div>

      {/* Informations sur la complexité */}
      <div className="mt-4 p-3 bg-blue-50 rounded-lg">
        <h4 className="font-medium text-blue-900 mb-2">Complexités :</h4>
        <div className="text-sm text-blue-800">
          {type === 'bst' && (
            <div>
              <p><strong>Recherche/Insertion :</strong> O(log n) moyen, O(n) pire cas</p>
              <p><strong>Espace :</strong> O(n)</p>
            </div>
          )}
          {type === 'heap' && (
            <div>
              <p><strong>Insertion :</strong> O(log n)</p>
              <p><strong>Extraction du maximum :</strong> O(log n)</p>
              <p><strong>Espace :</strong> O(n)</p>
            </div>
          )}
          {type === 'stack' && (
            <div>
              <p><strong>Push/Pop :</strong> O(1)</p>
              <p><strong>Espace :</strong> O(n)</p>
            </div>
          )}
          {type === 'queue' && (
            <div>
              <p><strong>Enqueue/Dequeue :</strong> O(1)</p>
              <p><strong>Espace :</strong> O(n)</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}