'use client';

import { useState, useEffect, useRef } from 'react';

interface Point {
  x: number;
  y: number;
}

interface MathVisualizerProps {
  type: 'function' | 'distribution' | 'regression' | 'gradient' | 'fourier';
  className?: string;
}

export default function MathVisualizer({ type, className = '' }: MathVisualizerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [parameters, setParameters] = useState<{[key: string]: number}>({});
  const [isAnimating, setIsAnimating] = useState(false);
  const [animationSpeed, setAnimationSpeed] = useState(50);
  const [data, setData] = useState<Point[]>([]);

  const visualizations = {
    function: 'Fonctions Mathématiques',
    distribution: 'Distributions Statistiques',
    regression: 'Régression Linéaire',
    gradient: 'Descente de Gradient',
    fourier: 'Série de Fourier'
  };

  // Initialisation selon le type
  useEffect(() => {
    initializeVisualization();
  }, [type]);

  useEffect(() => {
    if (canvasRef.current) {
      draw();
    }
  }, [parameters, data, type]);

  const initializeVisualization = () => {
    switch (type) {
      case 'function':
        setParameters({ a: 1, b: 1, c: 0, d: 0 });
        break;
      case 'distribution':
        setParameters({ mean: 0, std: 1, n: 1000 });
        break;
      case 'regression':
        generateRegressionData();
        setParameters({ slope: 1, intercept: 0, learningRate: 0.01 });
        break;
      case 'gradient':
        setParameters({ x: 0, learningRate: 0.1, iterations: 0 });
        break;
      case 'fourier':
        setParameters({ n: 3, amplitude: 1, frequency: 1 });
        break;
    }
  };

  const generateRegressionData = () => {
    const points: Point[] = [];
    for (let i = 0; i < 50; i++) {
      const x = (i - 25) / 5;
      const y = 2 * x + 1 + (Math.random() - 0.5) * 2;
      points.push({ x, y });
    }
    setData(points);
  };

  const draw = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Effacer le canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Configuration
    const width = canvas.width;
    const height = canvas.height;
    const centerX = width / 2;
    const centerY = height / 2;

    // Dessiner les axes
    drawAxes(ctx, width, height, centerX, centerY);

    switch (type) {
      case 'function':
        drawFunction(ctx, width, height, centerX, centerY);
        break;
      case 'distribution':
        drawDistribution(ctx, width, height, centerX, centerY);
        break;
      case 'regression':
        drawRegression(ctx, width, height, centerX, centerY);
        break;
      case 'gradient':
        drawGradient(ctx, width, height, centerX, centerY);
        break;
      case 'fourier':
        drawFourier(ctx, width, height, centerX, centerY);
        break;
    }
  };

  const drawAxes = (ctx: CanvasRenderingContext2D, width: number, height: number, centerX: number, centerY: number) => {
    ctx.strokeStyle = '#374151';
    ctx.lineWidth = 1;
    
    // Axe X
    ctx.beginPath();
    ctx.moveTo(0, centerY);
    ctx.lineTo(width, centerY);
    ctx.stroke();

    // Axe Y
    ctx.beginPath();
    ctx.moveTo(centerX, 0);
    ctx.lineTo(centerX, height);
    ctx.stroke();

    // Graduations
    ctx.fillStyle = '#6B7280';
    ctx.font = '12px Arial';
    ctx.textAlign = 'center';

    for (let i = -10; i <= 10; i++) {
      if (i === 0) continue;
      const x = centerX + i * 20;
      const y = centerY + i * 20;

      // Graduations X
      if (x >= 0 && x <= width) {
        ctx.beginPath();
        ctx.moveTo(x, centerY - 3);
        ctx.lineTo(x, centerY + 3);
        ctx.stroke();
        ctx.fillText(i.toString(), x, centerY + 15);
      }

      // Graduations Y
      if (y >= 0 && y <= height) {
        ctx.beginPath();
        ctx.moveTo(centerX - 3, y);
        ctx.lineTo(centerX + 3, y);
        ctx.stroke();
        ctx.textAlign = 'right';
        ctx.fillText((-i).toString(), centerX - 8, y + 4);
        ctx.textAlign = 'center';
      }
    }
  };

  const drawFunction = (ctx: CanvasRenderingContext2D, width: number, height: number, centerX: number, centerY: number) => {
    const { a, b, c, d } = parameters;
    
    ctx.strokeStyle = '#3B82F6';
    ctx.lineWidth = 2;
    ctx.beginPath();

    let firstPoint = true;
    for (let screenX = 0; screenX < width; screenX += 2) {
      const x = (screenX - centerX) / 20; // Scale
      let y;
      
      // Différentes fonctions selon les paramètres
      if (Math.abs(c) < 0.1 && Math.abs(d) < 0.1) {
        y = a * Math.sin(b * x); // Sinus
      } else if (Math.abs(d) < 0.1) {
        y = a * x * x + b * x + c; // Polynôme
      } else {
        y = a * Math.exp(-b * x * x) + c * Math.sin(d * x); // Exponentielle + sinus
      }

      const screenY = centerY - y * 20; // Scale inverse

      if (screenY >= 0 && screenY <= height) {
        if (firstPoint) {
          ctx.moveTo(screenX, screenY);
          firstPoint = false;
        } else {
          ctx.lineTo(screenX, screenY);
        }
      }
    }
    ctx.stroke();
  };

  const drawDistribution = (ctx: CanvasRenderingContext2D, width: number, height: number, centerX: number, centerY: number) => {
    const { mean, std, n } = parameters;
    
    // Générer des échantillons de la distribution normale
    const samples: number[] = [];
    for (let i = 0; i < n; i++) {
      // Box-Muller transform pour générer des valeurs normales
      const u1 = Math.random();
      const u2 = Math.random();
      const z0 = Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
      samples.push(z0 * std + mean);
    }

    // Créer un histogramme
    const bins = 50;
    const minVal = Math.min(...samples);
    const maxVal = Math.max(...samples);
    const binWidth = (maxVal - minVal) / bins;
    const histogram = new Array(bins).fill(0);

    samples.forEach(sample => {
      const binIndex = Math.floor((sample - minVal) / binWidth);
      if (binIndex >= 0 && binIndex < bins) {
        histogram[binIndex]++;
      }
    });

    // Normaliser l'histogramme
    const maxCount = Math.max(...histogram);
    
    // Dessiner l'histogramme
    ctx.fillStyle = '#3B82F6';
    ctx.globalAlpha = 0.7;
    
    for (let i = 0; i < bins; i++) {
      const x = minVal + i * binWidth;
      const screenX = centerX + x * 30;
      const barHeight = (histogram[i] / maxCount) * 100;
      const screenY = centerY - barHeight;
      const barWidth = (binWidth * 30) || 2;

      if (screenX >= 0 && screenX <= width) {
        ctx.fillRect(screenX, screenY, barWidth, barHeight);
      }
    }

    ctx.globalAlpha = 1;

    // Dessiner la courbe théorique
    ctx.strokeStyle = '#EF4444';
    ctx.lineWidth = 2;
    ctx.beginPath();

    let firstPoint = true;
    for (let screenX = 0; screenX < width; screenX += 2) {
      const x = (screenX - centerX) / 30;
      const y = (1 / (std * Math.sqrt(2 * Math.PI))) * 
                 Math.exp(-0.5 * Math.pow((x - mean) / std, 2));
      const screenY = centerY - y * 200;

      if (firstPoint) {
        ctx.moveTo(screenX, screenY);
        firstPoint = false;
      } else {
        ctx.lineTo(screenX, screenY);
      }
    }
    ctx.stroke();
  };

  const drawRegression = (ctx: CanvasRenderingContext2D, width: number, height: number, centerX: number, centerY: number) => {
    const { slope, intercept } = parameters;

    // Dessiner les points de données
    ctx.fillStyle = '#3B82F6';
    data.forEach(point => {
      const screenX = centerX + point.x * 30;
      const screenY = centerY - point.y * 30;
      
      if (screenX >= 0 && screenX <= width && screenY >= 0 && screenY <= height) {
        ctx.beginPath();
        ctx.arc(screenX, screenY, 3, 0, 2 * Math.PI);
        ctx.fill();
      }
    });

    // Dessiner la ligne de régression
    ctx.strokeStyle = '#EF4444';
    ctx.lineWidth = 2;
    ctx.beginPath();

    const startX = -width / 60;
    const endX = width / 60;
    const startY = slope * startX + intercept;
    const endY = slope * endX + intercept;

    ctx.moveTo(centerX + startX * 30, centerY - startY * 30);
    ctx.lineTo(centerX + endX * 30, centerY - endY * 30);
    ctx.stroke();

    // Calculer et afficher R²
    const yMean = data.reduce((sum, p) => sum + p.y, 0) / data.length;
    let ssRes = 0;
    let ssTot = 0;

    data.forEach(point => {
      const predicted = slope * point.x + intercept;
      ssRes += Math.pow(point.y - predicted, 2);
      ssTot += Math.pow(point.y - yMean, 2);
    });

    const rSquared = 1 - (ssRes / ssTot);

    ctx.fillStyle = '#374151';
    ctx.font = '14px Arial';
    ctx.textAlign = 'left';
    ctx.fillText(`R² = ${rSquared.toFixed(3)}`, 10, 20);
    ctx.fillText(`y = ${slope.toFixed(2)}x + ${intercept.toFixed(2)}`, 10, 40);
  };

  const drawGradient = (ctx: CanvasRenderingContext2D, width: number, height: number, centerX: number, centerY: number) => {
    const { x, learningRate, iterations } = parameters;

    // Fonction objectif: f(x) = x²
    const f = (x: number) => x * x;
    const df = (x: number) => 2 * x; // Dérivée

    // Dessiner la fonction
    ctx.strokeStyle = '#3B82F6';
    ctx.lineWidth = 2;
    ctx.beginPath();

    let firstPoint = true;
    for (let screenX = 0; screenX < width; screenX += 2) {
      const xVal = (screenX - centerX) / 50;
      const y = f(xVal);
      const screenY = centerY - y * 20;

      if (screenY >= 0 && screenY <= height) {
        if (firstPoint) {
          ctx.moveTo(screenX, screenY);
          firstPoint = false;
        } else {
          ctx.lineTo(screenX, screenY);
        }
      }
    }
    ctx.stroke();

    // Dessiner le point courant
    const currentY = f(x);
    const screenX = centerX + x * 50;
    const screenY = centerY - currentY * 20;

    ctx.fillStyle = '#EF4444';
    ctx.beginPath();
    ctx.arc(screenX, screenY, 5, 0, 2 * Math.PI);
    ctx.fill();

    // Dessiner la tangente
    const slope = df(x);
    const tangentStart = x - 2;
    const tangentEnd = x + 2;
    const tangentStartY = currentY + slope * (tangentStart - x);
    const tangentEndY = currentY + slope * (tangentEnd - x);

    ctx.strokeStyle = '#10B981';
    ctx.lineWidth = 1;
    ctx.setLineDash([5, 5]);
    ctx.beginPath();
    ctx.moveTo(centerX + tangentStart * 50, centerY - tangentStartY * 20);
    ctx.lineTo(centerX + tangentEnd * 50, centerY - tangentEndY * 20);
    ctx.stroke();
    ctx.setLineDash([]);

    // Afficher les informations
    ctx.fillStyle = '#374151';
    ctx.font = '14px Arial';
    ctx.textAlign = 'left';
    ctx.fillText(`x = ${x.toFixed(3)}`, 10, 20);
    ctx.fillText(`f(x) = ${currentY.toFixed(3)}`, 10, 40);
    ctx.fillText(`f'(x) = ${slope.toFixed(3)}`, 10, 60);
    ctx.fillText(`Itération: ${iterations}`, 10, 80);
  };

  const drawFourier = (ctx: CanvasRenderingContext2D, width: number, height: number, centerX: number, centerY: number) => {
    const { n, amplitude, frequency } = parameters;

    // Dessiner la série de Fourier (approximation d'une onde carrée)
    ctx.strokeStyle = '#3B82F6';
    ctx.lineWidth = 2;
    ctx.beginPath();

    let firstPoint = true;
    for (let screenX = 0; screenX < width; screenX += 1) {
      const x = (screenX - centerX) / 50;
      let y = 0;

      // Série de Fourier pour une onde carrée
      for (let k = 1; k <= n; k += 2) {
        y += (4 / (Math.PI * k)) * Math.sin(k * frequency * x);
      }
      y *= amplitude;

      const screenY = centerY - y * 50;

      if (firstPoint) {
        ctx.moveTo(screenX, screenY);
        firstPoint = false;
      } else {
        ctx.lineTo(screenX, screenY);
      }
    }
    ctx.stroke();

    // Dessiner l'onde carrée théorique
    ctx.strokeStyle = '#EF4444';
    ctx.lineWidth = 1;
    ctx.setLineDash([5, 5]);
    ctx.beginPath();

    firstPoint = true;
    for (let screenX = 0; screenX < width; screenX += 1) {
      const x = (screenX - centerX) / 50;
      const y = amplitude * Math.sign(Math.sin(frequency * x));
      const screenY = centerY - y * 50;

      if (firstPoint) {
        ctx.moveTo(screenX, screenY);
        firstPoint = false;
      } else {
        ctx.lineTo(screenX, screenY);
      }
    }
    ctx.stroke();
    ctx.setLineDash([]);

    // Afficher les informations
    ctx.fillStyle = '#374151';
    ctx.font = '14px Arial';
    ctx.textAlign = 'left';
    ctx.fillText(`Termes: ${Math.floor((n + 1) / 2)}`, 10, 20);
    ctx.fillText(`Amplitude: ${amplitude}`, 10, 40);
    ctx.fillText(`Fréquence: ${frequency}`, 10, 60);
  };

  const animateGradientDescent = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    let currentX = parameters.x;
    let iteration = 0;

    const step = () => {
      const gradient = 2 * currentX; // Dérivée de x²
      currentX = currentX - parameters.learningRate * gradient;
      iteration++;

      setParameters(prev => ({ 
        ...prev, 
        x: currentX, 
        iterations: iteration 
      }));

      if (Math.abs(gradient) > 0.001 && iteration < 100 && isAnimating) {
        setTimeout(step, 101 - animationSpeed);
      } else {
        setIsAnimating(false);
      }
    };

    step();
  };

  const updateParameter = (key: string, value: number) => {
    setParameters(prev => ({ ...prev, [key]: value }));
  };

  const getParameterControls = () => {
    switch (type) {
      case 'function':
        return (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">a</label>
              <input
                type="range"
                min="-3"
                max="3"
                step="0.1"
                value={parameters.a || 1}
                onChange={(e) => updateParameter('a', parseFloat(e.target.value))}
                className="w-full"
              />
              <span className="text-xs text-gray-600">{(parameters.a || 1).toFixed(1)}</span>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">b</label>
              <input
                type="range"
                min="0.1"
                max="3"
                step="0.1"
                value={parameters.b || 1}
                onChange={(e) => updateParameter('b', parseFloat(e.target.value))}
                className="w-full"
              />
              <span className="text-xs text-gray-600">{(parameters.b || 1).toFixed(1)}</span>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">c</label>
              <input
                type="range"
                min="-2"
                max="2"
                step="0.1"
                value={parameters.c || 0}
                onChange={(e) => updateParameter('c', parseFloat(e.target.value))}
                className="w-full"
              />
              <span className="text-xs text-gray-600">{(parameters.c || 0).toFixed(1)}</span>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">d</label>
              <input
                type="range"
                min="-2"
                max="2"
                step="0.1"
                value={parameters.d || 0}
                onChange={(e) => updateParameter('d', parseFloat(e.target.value))}
                className="w-full"
              />
              <span className="text-xs text-gray-600">{(parameters.d || 0).toFixed(1)}</span>
            </div>
          </div>
        );

      case 'distribution':
        return (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Moyenne</label>
              <input
                type="range"
                min="-3"
                max="3"
                step="0.1"
                value={parameters.mean || 0}
                onChange={(e) => updateParameter('mean', parseFloat(e.target.value))}
                className="w-full"
              />
              <span className="text-xs text-gray-600">{(parameters.mean || 0).toFixed(1)}</span>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Écart-type</label>
              <input
                type="range"
                min="0.1"
                max="3"
                step="0.1"
                value={parameters.std || 1}
                onChange={(e) => updateParameter('std', parseFloat(e.target.value))}
                className="w-full"
              />
              <span className="text-xs text-gray-600">{(parameters.std || 1).toFixed(1)}</span>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Échantillons</label>
              <input
                type="range"
                min="100"
                max="5000"
                step="100"
                value={parameters.n || 1000}
                onChange={(e) => updateParameter('n', parseInt(e.target.value))}
                className="w-full"
              />
              <span className="text-xs text-gray-600">{parameters.n || 1000}</span>
            </div>
          </div>
        );

      case 'regression':
        return (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Pente</label>
              <input
                type="range"
                min="-3"
                max="3"
                step="0.1"
                value={parameters.slope || 1}
                onChange={(e) => updateParameter('slope', parseFloat(e.target.value))}
                className="w-full"
              />
              <span className="text-xs text-gray-600">{(parameters.slope || 1).toFixed(1)}</span>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Ordonnée</label>
              <input
                type="range"
                min="-3"
                max="3"
                step="0.1"
                value={parameters.intercept || 0}
                onChange={(e) => updateParameter('intercept', parseFloat(e.target.value))}
                className="w-full"
              />
              <span className="text-xs text-gray-600">{(parameters.intercept || 0).toFixed(1)}</span>
            </div>
            <button
              onClick={generateRegressionData}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Nouvelles données
            </button>
          </div>
        );

      case 'gradient':
        return (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Position initiale</label>
              <input
                type="range"
                min="-5"
                max="5"
                step="0.1"
                value={parameters.x || 0}
                onChange={(e) => updateParameter('x', parseFloat(e.target.value))}
                className="w-full"
                disabled={isAnimating}
              />
              <span className="text-xs text-gray-600">{(parameters.x || 0).toFixed(1)}</span>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Taux d'apprentissage</label>
              <input
                type="range"
                min="0.01"
                max="0.5"
                step="0.01"
                value={parameters.learningRate || 0.1}
                onChange={(e) => updateParameter('learningRate', parseFloat(e.target.value))}
                className="w-full"
                disabled={isAnimating}
              />
              <span className="text-xs text-gray-600">{(parameters.learningRate || 0.1).toFixed(2)}</span>
            </div>
            <button
              onClick={animateGradientDescent}
              disabled={isAnimating}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
            >
              {isAnimating ? 'En cours...' : 'Démarrer'}
            </button>
          </div>
        );

      case 'fourier':
        return (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Nombre de termes</label>
              <input
                type="range"
                min="1"
                max="21"
                step="2"
                value={parameters.n || 3}
                onChange={(e) => updateParameter('n', parseInt(e.target.value))}
                className="w-full"
              />
              <span className="text-xs text-gray-600">{parameters.n || 3}</span>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Amplitude</label>
              <input
                type="range"
                min="0.5"
                max="3"
                step="0.1"
                value={parameters.amplitude || 1}
                onChange={(e) => updateParameter('amplitude', parseFloat(e.target.value))}
                className="w-full"
              />
              <span className="text-xs text-gray-600">{(parameters.amplitude || 1).toFixed(1)}</span>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Fréquence</label>
              <input
                type="range"
                min="0.5"
                max="5"
                step="0.1"
                value={parameters.frequency || 1}
                onChange={(e) => updateParameter('frequency', parseFloat(e.target.value))}
                className="w-full"
              />
              <span className="text-xs text-gray-600">{(parameters.frequency || 1).toFixed(1)}</span>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className={`bg-white rounded-lg shadow-lg p-6 ${className}`}>
      <div className="mb-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4">
          Visualiseur : {visualizations[type]}
        </h3>

        {/* Contrôles */}
        <div className="mb-4">
          {getParameterControls()}
        </div>

        {type === 'gradient' && (
          <div className="mb-4">
            <div className="flex items-center space-x-4">
              <label className="text-sm font-medium text-gray-700">Vitesse d'animation :</label>
              <input
                type="range"
                min="1"
                max="100"
                value={animationSpeed}
                onChange={(e) => setAnimationSpeed(parseInt(e.target.value))}
                className="w-32"
                disabled={isAnimating}
              />
              <span className="text-xs text-gray-600">{animationSpeed}%</span>
            </div>
          </div>
        )}
      </div>

      {/* Canvas de visualisation */}
      <div className="mb-6 bg-gray-50 rounded-lg p-4 flex justify-center">
        <canvas
          ref={canvasRef}
          width={600}
          height={400}
          className="border rounded bg-white"
        />
      </div>

      {/* Légende et explications */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-blue-50 p-4 rounded-lg">
          <h4 className="font-medium text-blue-900 mb-2">Légende :</h4>
          <div className="text-sm text-blue-800 space-y-1">
            {type === 'function' && (
              <>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-1 bg-blue-500"></div>
                  <span>Fonction : a×sin(b×x) + c×sin(d×x)</span>
                </div>
              </>
            )}
            {type === 'distribution' && (
              <>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-3 bg-blue-500 opacity-70"></div>
                  <span>Histogramme (échantillons)</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-1 bg-red-500"></div>
                  <span>Distribution théorique</span>
                </div>
              </>
            )}
            {type === 'regression' && (
              <>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span>Points de données</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-1 bg-red-500"></div>
                  <span>Ligne de régression</span>
                </div>
              </>
            )}
            {type === 'gradient' && (
              <>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-1 bg-blue-500"></div>
                  <span>Fonction f(x) = x²</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <span>Position actuelle</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-1 bg-green-500" style={{borderStyle: 'dashed'}}></div>
                  <span>Tangente (gradient)</span>
                </div>
              </>
            )}
            {type === 'fourier' && (
              <>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-1 bg-blue-500"></div>
                  <span>Série de Fourier</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-1 bg-red-500" style={{borderStyle: 'dashed'}}></div>
                  <span>Onde carrée cible</span>
                </div>
              </>
            )}
          </div>
        </div>

        <div className="bg-green-50 p-4 rounded-lg">
          <h4 className="font-medium text-green-900 mb-2">Applications :</h4>
          <div className="text-sm text-green-800 space-y-1">
            {type === 'function' && (
              <>
                <p>• Modélisation de phénomènes périodiques</p>
                <p>• Analyse de signaux</p>
                <p>• Physique (oscillations, ondes)</p>
              </>
            )}
            {type === 'distribution' && (
              <>
                <p>• Tests statistiques</p>
                <p>• Modélisation d'incertitudes</p>
                <p>• Contrôle qualité</p>
              </>
            )}
            {type === 'regression' && (
              <>
                <p>• Prédiction de valeurs</p>
                <p>• Analyse de tendances</p>
                <p>• Économétrie</p>
              </>
            )}
            {type === 'gradient' && (
              <>
                <p>• Optimisation en ML</p>
                <p>• Recherche de minimum</p>
                <p>• Apprentissage automatique</p>
              </>
            )}
            {type === 'fourier' && (
              <>
                <p>• Traitement du signal</p>
                <p>• Compression d'images</p>
                <p>• Analyse spectrale</p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}