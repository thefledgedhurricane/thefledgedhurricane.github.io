'use client';

import { useState, useEffect } from 'react';

type DataPoint = {
  x: number;
  y: number;
  label?: string;
  color?: string;
};

export default function SupervisedLearningDemo() {
  const [step, setStep] = useState(0);
  const [predictions, setPredictions] = useState<DataPoint[]>([]);
  
  // Dataset d'exemple : prix des maisons
  const trainingData: DataPoint[] = [
    { x: 100, y: 200, label: 'Maison A', color: '#3B82F6' },
    { x: 150, y: 300, label: 'Maison B', color: '#3B82F6' },
    { x: 80, y: 150, label: 'Maison C', color: '#3B82F6' },
    { x: 120, y: 220, label: 'Maison D', color: '#3B82F6' },
    { x: 180, y: 350, label: 'Maison E', color: '#3B82F6' },
  ];

  const newPoints: DataPoint[] = [
    { x: 110, y: 210, label: 'Nouvelle maison 1', color: '#EF4444' },
    { x: 160, y: 320, label: 'Nouvelle maison 2', color: '#EF4444' },
  ];

  // Régression linéaire simple
  const linearRegression = (x: number) => {
    // y = ax + b calculé à partir des données d'entraînement
    const a = 2; // coefficient directeur approximatif
    const b = 20; // ordonnée à l'origine approximative
    return a * x + b;
  };

  const steps = [
    'Données d\'entraînement',
    'Entraînement du modèle',
    'Modèle appris',
    'Prédictions sur nouvelles données'
  ];

  useEffect(() => {
    if (step === 2) {
      // Generate predictions for visualization
      const newPredictions = newPoints.map(point => ({
        x: point.x,
        y: linearRegression(point.x)
      }));
      setPredictions(newPredictions);
    }
  }, [step, newPoints]);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
      <h3 className="text-lg font-bold mb-4 text-center">📊 Démo : Apprentissage Supervisé</h3>
      
      {/* Step indicator */}
      <div className="flex justify-between mb-6">
        {steps.map((stepName, idx) => (
          <div key={idx} className="flex items-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
              idx <= step ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-500'
            }`}>
              {idx + 1}
            </div>
            {idx < steps.length - 1 && (
              <div className={`w-16 h-0.5 mx-2 ${
                idx < step ? 'bg-blue-500' : 'bg-gray-200'
              }`}></div>
            )}
          </div>
        ))}
      </div>

      <div className="text-center mb-4">
        <strong>{steps[step]}</strong>
      </div>

      {/* Visualization */}
      <div className="relative bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mb-4" style={{ height: '300px' }}>
        <svg width="100%" height="100%" viewBox="0 0 400 250">
          {/* Axes */}
          <line x1="50" y1="200" x2="350" y2="200" stroke="currentColor" strokeWidth="2" />
          <line x1="50" y1="200" x2="50" y2="50" stroke="currentColor" strokeWidth="2" />
          
          {/* Labels */}
          <text x="200" y="230" textAnchor="middle" className="text-xs fill-current">Surface (m²)</text>
          <text x="30" y="125" textAnchor="middle" className="text-xs fill-current" transform="rotate(-90 30 125)">Prix (k€)</text>

          {/* Training data points */}
          {step >= 0 && trainingData.map((point, idx) => (
            <g key={`train-${idx}`}>
              <circle
                cx={50 + (point.x - 50) * 2.5}
                cy={200 - (point.y - 100) * 0.6}
                r="6"
                fill={point.color}
              />
              {step === 0 && (
                <text
                  x={50 + (point.x - 50) * 2.5}
                  y={200 - (point.y - 100) * 0.6 - 10}
                  textAnchor="middle"
                  className="text-xs fill-current"
                >
                  {point.label}
                </text>
              )}
            </g>
          ))}

          {/* Regression line */}
          {step >= 2 && (
            <line
              x1="50"
              y1={200 - (linearRegression(50) - 100) * 0.6}
              x2="350"
              y2={200 - (linearRegression(170) - 100) * 0.6}
              stroke="#10B981"
              strokeWidth="3"
              strokeDasharray={step === 2 ? "5,5" : "none"}
            />
          )}

          {/* New data points and predictions */}
          {step >= 3 && newPoints.map((point, idx) => (
            <g key={`new-${idx}`}>
              <circle
                cx={50 + (point.x - 50) * 2.5}
                cy={200 - (point.y - 100) * 0.6}
                r="6"
                fill={point.color}
                opacity="0.5"
              />
              {predictions[idx] && (
                <circle
                  cx={50 + (point.x - 50) * 2.5}
                  cy={200 - (predictions[idx].y - 100) * 0.6}
                  r="6"
                  fill="#10B981"
                />
              )}
            </g>
          ))}
        </svg>
      </div>

      {/* Step description */}
      <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg mb-4">
        {step === 0 && (
          <div>
            <strong>Étape 1 :</strong> Nous avons des données d&apos;entraînement avec des exemples de maisons
            (surface en m², prix en k€). Chaque point bleu représente une maison connue.
          </div>
        )}
        {step === 1 && (
          <div>
            <strong>Étape 2 :</strong> L&apos;algorithme d&apos;apprentissage analyse les données pour trouver
            la relation entre la surface et le prix. Il cherche la meilleure ligne qui passe près de tous les points.
          </div>
        )}
        {step === 2 && (
          <div>
            <strong>Étape 3 :</strong> Le modèle a appris ! La ligne verte représente la fonction
            prédictive : <code>Prix = 2 × Surface + 20</code>
          </div>
        )}
        {step === 3 && (
          <div>
            <strong>Étape 4 :</strong> Nous pouvons maintenant prédire le prix de nouvelles maisons
            (points rouges) en utilisant notre modèle. Les prédictions sont les points verts sur la ligne.
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="flex justify-between">
        <button
          onClick={() => setStep(Math.max(0, step - 1))}
          disabled={step === 0}
          className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded disabled:opacity-50"
        >
          ← Précédent
        </button>
        <button
          onClick={() => setStep(Math.min(3, step + 1))}
          disabled={step === 3}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
        >
          Suivant →
        </button>
      </div>
    </div>
  );
}
