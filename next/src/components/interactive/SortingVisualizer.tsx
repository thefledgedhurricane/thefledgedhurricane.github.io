'use client';

import { useState, useEffect, useRef } from 'react';

interface SortingVisualizerProps {
  algorithm: 'bubble' | 'selection' | 'insertion' | 'quick' | 'merge';
  className?: string;
}

interface ArrayElement {
  value: number;
  color: 'default' | 'comparing' | 'swapping' | 'sorted' | 'pivot';
}

export default function SortingVisualizer({ algorithm, className = '' }: SortingVisualizerProps) {
  const [array, setArray] = useState<ArrayElement[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [speed, setSpeed] = useState(100);
  const [arraySize, setArraySize] = useState(20);
  const [currentStep, setCurrentStep] = useState(0);
  const [totalSteps, setTotalSteps] = useState(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const algorithms = {
    bubble: 'Tri à Bulles',
    selection: 'Tri par Sélection', 
    insertion: 'Tri par Insertion',
    quick: 'Tri Rapide',
    merge: 'Tri Fusion'
  };

  const generateRandomArray = () => {
    const newArray = Array.from({ length: arraySize }, () => ({
      value: Math.floor(Math.random() * 300) + 10,
      color: 'default' as const
    }));
    setArray(newArray);
    setCurrentStep(0);
    setTotalSteps(0);
  };

  useEffect(() => {
    generateRandomArray();
  }, [arraySize]);

  const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  const updateArray = async (newArray: ArrayElement[], step: number) => {
    setArray([...newArray]);
    setCurrentStep(step);
    await sleep(101 - speed);
  };

  const bubbleSort = async () => {
    const arr = [...array];
    let steps = 0;
    const n = arr.length;
    
    for (let i = 0; i < n - 1; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        if (!isRunning) return;
        
        // Mettre en évidence les éléments comparés
        arr[j].color = 'comparing';
        arr[j + 1].color = 'comparing';
        await updateArray(arr, ++steps);
        
        if (arr[j].value > arr[j + 1].value) {
          // Échanger
          arr[j].color = 'swapping';
          arr[j + 1].color = 'swapping';
          await updateArray(arr, ++steps);
          
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
          await updateArray(arr, ++steps);
        }
        
        // Remettre les couleurs par défaut
        arr[j].color = 'default';
        arr[j + 1].color = 'default';
        await updateArray(arr, ++steps);
      }
      
      // Marquer le dernier élément comme trié
      arr[n - 1 - i].color = 'sorted';
      await updateArray(arr, ++steps);
    }
    
    // Marquer tous les éléments comme triés
    arr[0].color = 'sorted';
    await updateArray(arr, ++steps);
    setTotalSteps(steps);
  };

  const selectionSort = async () => {
    const arr = [...array];
    let steps = 0;
    const n = arr.length;
    
    for (let i = 0; i < n - 1; i++) {
      if (!isRunning) return;
      
      let minIdx = i;
      arr[minIdx].color = 'pivot';
      await updateArray(arr, ++steps);
      
      for (let j = i + 1; j < n; j++) {
        if (!isRunning) return;
        
        arr[j].color = 'comparing';
        await updateArray(arr, ++steps);
        
        if (arr[j].value < arr[minIdx].value) {
          arr[minIdx].color = 'default';
          minIdx = j;
          arr[minIdx].color = 'pivot';
          await updateArray(arr, ++steps);
        } else {
          arr[j].color = 'default';
          await updateArray(arr, ++steps);
        }
      }
      
      if (minIdx !== i) {
        arr[i].color = 'swapping';
        arr[minIdx].color = 'swapping';
        await updateArray(arr, ++steps);
        
        [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
        await updateArray(arr, ++steps);
      }
      
      arr[i].color = 'sorted';
      await updateArray(arr, ++steps);
    }
    
    arr[n - 1].color = 'sorted';
    await updateArray(arr, ++steps);
    setTotalSteps(steps);
  };

  const insertionSort = async () => {
    const arr = [...array];
    let steps = 0;
    const n = arr.length;
    
    for (let i = 1; i < n; i++) {
      if (!isRunning) return;
      
      const key = arr[i];
      arr[i].color = 'pivot';
      await updateArray(arr, ++steps);
      
      let j = i - 1;
      
      while (j >= 0 && arr[j].value > key.value) {
        if (!isRunning) return;
        
        arr[j].color = 'comparing';
        await updateArray(arr, ++steps);
        
        arr[j + 1] = { ...arr[j] };
        arr[j].color = 'swapping';
        arr[j + 1].color = 'swapping';
        await updateArray(arr, ++steps);
        
        arr[j].color = 'default';
        j--;
      }
      
      arr[j + 1] = { ...key, color: 'sorted' };
      await updateArray(arr, ++steps);
      
      // Marquer la partie triée
      for (let k = 0; k <= i; k++) {
        arr[k].color = 'sorted';
      }
      await updateArray(arr, ++steps);
    }
    
    setTotalSteps(steps);
  };

  const startSorting = async () => {
    setIsRunning(true);
    setCurrentStep(0);
    
    // Réinitialiser les couleurs
    const resetArray = array.map(item => ({ ...item, color: 'default' as const }));
    setArray(resetArray);
    
    try {
      switch (algorithm) {
        case 'bubble':
          await bubbleSort();
          break;
        case 'selection':
          await selectionSort();
          break;
        case 'insertion':
          await insertionSort();
          break;
        default:
          await bubbleSort();
      }
    } catch (error) {
      console.error('Erreur lors du tri:', error);
    }
    
    setIsRunning(false);
  };

  const stopSorting = () => {
    setIsRunning(false);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  const getBarColor = (color: ArrayElement['color']) => {
    switch (color) {
      case 'comparing': return 'bg-yellow-400';
      case 'swapping': return 'bg-red-500';
      case 'sorted': return 'bg-green-500';
      case 'pivot': return 'bg-purple-500';
      default: return 'bg-blue-500';
    }
  };

  const getComplexity = () => {
    const complexities = {
      bubble: { best: 'O(n)', average: 'O(n²)', worst: 'O(n²)' },
      selection: { best: 'O(n²)', average: 'O(n²)', worst: 'O(n²)' },
      insertion: { best: 'O(n)', average: 'O(n²)', worst: 'O(n²)' },
      quick: { best: 'O(n log n)', average: 'O(n log n)', worst: 'O(n²)' },
      merge: { best: 'O(n log n)', average: 'O(n log n)', worst: 'O(n log n)' }
    };
    return complexities[algorithm];
  };

  return (
    <div className={`bg-white rounded-lg shadow-lg p-6 ${className}`}>
      <div className="mb-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2">
          Visualiseur de Tri : {algorithms[algorithm]}
        </h3>
        
        {/* Complexité */}
        <div className="bg-gray-50 p-3 rounded-lg mb-4">
          <h4 className="font-medium text-gray-900 mb-2">Complexité Temporelle :</h4>
          <div className="grid grid-cols-3 gap-4 text-sm">
            <div>
              <span className="font-medium text-green-600">Meilleur cas :</span> {getComplexity().best}
            </div>
            <div>
              <span className="font-medium text-yellow-600">Cas moyen :</span> {getComplexity().average}
            </div>
            <div>
              <span className="font-medium text-red-600">Pire cas :</span> {getComplexity().worst}
            </div>
          </div>
        </div>

        {/* Contrôles */}
        <div className="flex flex-wrap items-center gap-4 mb-4">
          <button
            onClick={isRunning ? stopSorting : startSorting}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              isRunning
                ? 'bg-red-600 hover:bg-red-700 text-white'
                : 'bg-blue-600 hover:bg-blue-700 text-white'
            }`}
          >
            {isRunning ? '⏹️ Arrêter' : '▶️ Démarrer'}
          </button>
          
          <button
            onClick={generateRandomArray}
            disabled={isRunning}
            className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            🔄 Mélanger
          </button>
          
          <div className="flex items-center space-x-2">
            <label className="text-sm font-medium text-gray-700">Taille :</label>
            <input
              type="range"
              min="10"
              max="50"
              value={arraySize}
              onChange={(e) => setArraySize(parseInt(e.target.value))}
              disabled={isRunning}
              className="w-20"
            />
            <span className="text-sm text-gray-600">{arraySize}</span>
          </div>
          
          <div className="flex items-center space-x-2">
            <label className="text-sm font-medium text-gray-700">Vitesse :</label>
            <input
              type="range"
              min="1"
              max="100"
              value={speed}
              onChange={(e) => setSpeed(parseInt(e.target.value))}
              className="w-20"
            />
            <span className="text-sm text-gray-600">{speed}%</span>
          </div>
        </div>

        {/* Progression */}
        {totalSteps > 0 && (
          <div className="mb-4">
            <div className="flex justify-between text-sm text-gray-600 mb-1">
              <span>Progression</span>
              <span>{currentStep} / {totalSteps} étapes</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(currentStep / totalSteps) * 100}%` }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Visualisation */}
      <div className="mb-6">
        <div 
          className="flex items-end justify-center space-x-1 bg-gray-50 p-4 rounded-lg"
          style={{ height: '320px' }}
        >
          {array.map((item, index) => (
            <div
              key={index}
              className={`transition-all duration-200 rounded-t ${getBarColor(item.color)}`}
              style={{
                height: `${item.value}px`,
                width: `${Math.max(800 / arraySize - 2, 8)}px`,
                minWidth: '4px'
              }}
              title={`Valeur: ${item.value}`}
            />
          ))}
        </div>
      </div>

      {/* Légende */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-2 text-xs">
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-blue-500 rounded"></div>
          <span>Non trié</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-yellow-400 rounded"></div>
          <span>Comparaison</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-red-500 rounded"></div>
          <span>Échange</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-purple-500 rounded"></div>
          <span>Pivot/Clé</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-green-500 rounded"></div>
          <span>Trié</span>
        </div>
      </div>

      {/* Description de l'algorithme */}
      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <h4 className="font-medium text-blue-900 mb-2">Comment fonctionne {algorithms[algorithm]} ?</h4>
        <p className="text-sm text-blue-800">
          {algorithm === 'bubble' && "Compare chaque paire d'éléments adjacents et les échange s'ils sont dans le mauvais ordre. Répète jusqu'à ce qu'aucun échange ne soit nécessaire."}
          {algorithm === 'selection' && "Trouve l'élément minimum et le place au début, puis répète avec le reste du tableau non trié."}
          {algorithm === 'insertion' && "Prend chaque élément et l'insère à sa position correcte dans la partie déjà triée du tableau."}
          {algorithm === 'quick' && "Choisit un pivot et partitionne le tableau en éléments plus petits et plus grands que le pivot, puis trie récursivement."}
          {algorithm === 'merge' && "Divise le tableau en deux moitiés, les trie récursivement, puis fusionne les résultats triés."}
        </p>
      </div>
    </div>
  );
}