'use client';

import { useState, useEffect } from 'react';

type DataPoint = {
  x: number;
  y: number;
  cluster?: number;
  originalCluster?: number;
};

export default function ClusteringDemo() {
  const [step, setStep] = useState(0);
  const [dataPoints, setDataPoints] = useState<DataPoint[]>([]);
  const [centroids, setCentroids] = useState<DataPoint[]>([]);

  const colors = ['#3B82F6', '#EF4444', '#10B981', '#F59E0B'];

  // Générer des données initiales
  useEffect(() => {
    const generateClusterData = () => {
      const points: DataPoint[] = [];
      
      // Cluster 1 (clients jeunes, budget faible)
      for (let i = 0; i < 8; i++) {
        points.push({
          x: 20 + Math.random() * 15, // âge 20-35
          y: 20 + Math.random() * 20, // revenu 20-40k
          originalCluster: 0
        });
      }
      
      // Cluster 2 (clients seniors, budget élevé)
      for (let i = 0; i < 7; i++) {
        points.push({
          x: 50 + Math.random() * 15, // âge 50-65
          y: 60 + Math.random() * 25, // revenu 60-85k
          originalCluster: 1
        });
      }
      
      // Cluster 3 (clients moyens)
      for (let i = 0; i < 9; i++) {
        points.push({
          x: 35 + Math.random() * 10, // âge 35-45
          y: 40 + Math.random() * 20, // revenu 40-60k
          originalCluster: 2
        });
      }

      return points;
    };

    setDataPoints(generateClusterData());
  }, []);

  const initializeCentroids = () => {
    const newCentroids = [
      { x: 25, y: 25, cluster: 0 },
      { x: 55, y: 70, cluster: 1 },
      { x: 40, y: 50, cluster: 2 }
    ];
    setCentroids(newCentroids);
  };

  const assignClusters = () => {
    const newDataPoints = dataPoints.map(point => {
      let minDistance = Infinity;
      let assignedCluster = 0;

      centroids.forEach((centroid, idx) => {
        const distance = Math.sqrt(
          Math.pow(point.x - centroid.x, 2) + Math.pow(point.y - centroid.y, 2)
        );
        if (distance < minDistance) {
          minDistance = distance;
          assignedCluster = idx;
        }
      });

      return { ...point, cluster: assignedCluster };
    });

    setDataPoints(newDataPoints);
  };

  const updateCentroids = () => {
    const newCentroids = centroids.map((centroid, idx) => {
      const clusterPoints = dataPoints.filter(p => p.cluster === idx);
      if (clusterPoints.length === 0) return centroid;

      const newX = clusterPoints.reduce((sum, p) => sum + p.x, 0) / clusterPoints.length;
      const newY = clusterPoints.reduce((sum, p) => sum + p.y, 0) / clusterPoints.length;

      return { x: newX, y: newY, cluster: idx };
    });

    setCentroids(newCentroids);
  };

  const steps = [
    'Données non étiquetées',
    'Initialiser centroides',
    'Assigner aux clusters',
    'Mettre à jour centroides',
    'Clusters finaux'
  ];

  const handleStep = () => {
    if (step === 1) {
      initializeCentroids();
    } else if (step === 2) {
      assignClusters();
    } else if (step === 3) {
      updateCentroids();
    } else if (step === 4) {
      assignClusters(); // Final assignment
    }
  };

  useEffect(() => {
    if (step === 1) {
      // Initialize centroids
      const newCentroids = [
        { x: 25, y: 25, cluster: 0 },
        { x: 55, y: 70, cluster: 1 },
        { x: 40, y: 50, cluster: 2 }
      ];
      setCentroids(newCentroids);
    } else if (step === 2) {
      // Assign clusters
      const newDataPoints = dataPoints.map(point => {
        let minDistance = Infinity;
        let assignedCluster = 0;

        centroids.forEach((centroid, index) => {
          const distance = Math.sqrt(
            Math.pow(point.x - centroid.x, 2) + Math.pow(point.y - centroid.y, 2)
          );
          if (distance < minDistance) {
            minDistance = distance;
            assignedCluster = index;
          }
        });

        return { ...point, cluster: assignedCluster };
      });
      setDataPoints(newDataPoints);
    } else if (step === 3) {
      // Update centroids
      const newCentroids = centroids.map((centroid, clusterIndex) => {
        const pointsInCluster = dataPoints.filter(p => p.cluster === clusterIndex);
        if (pointsInCluster.length === 0) return centroid;

        const avgX = pointsInCluster.reduce((sum, p) => sum + p.x, 0) / pointsInCluster.length;
        const avgY = pointsInCluster.reduce((sum, p) => sum + p.y, 0) / pointsInCluster.length;
        
        return { ...centroid, x: avgX, y: avgY };
      });
      setCentroids(newCentroids);
    }
  }, [step, dataPoints, centroids]);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
      <h3 className="text-lg font-bold mb-4 text-center">🎯 Démo : Clustering K-Means</h3>
      
      {/* Step indicator */}
      <div className="flex justify-center mb-6 space-x-4">
        {steps.map((stepName, idx) => (
          <div key={idx} className="flex items-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
              idx <= step ? 'bg-purple-500 text-white' : 'bg-gray-200 text-gray-500'
            }`}>
              {idx + 1}
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mb-4">
        <strong>{steps[step]}</strong>
      </div>

      {/* Visualization */}
      <div className="relative bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mb-4" style={{ height: '350px' }}>
        <svg width="100%" height="100%" viewBox="0 0 400 300">
          {/* Axes */}
          <line x1="50" y1="250" x2="350" y2="250" stroke="currentColor" strokeWidth="2" />
          <line x1="50" y1="250" x2="50" y2="50" stroke="currentColor" strokeWidth="2" />
          
          {/* Labels */}
          <text x="200" y="280" textAnchor="middle" className="text-xs fill-current">Âge</text>
          <text x="25" y="150" textAnchor="middle" className="text-xs fill-current" transform="rotate(-90 25 150)">Revenu (k€)</text>

          {/* Data points */}
          {dataPoints.map((point, idx) => (
            <circle
              key={idx}
              cx={50 + point.x * 4}
              cy={250 - point.y * 2}
              r="5"
              fill={step === 0 ? '#6B7280' : colors[point.cluster || 0]}
              opacity="0.8"
            />
          ))}

          {/* Centroids */}
          {step >= 1 && centroids.map((centroid, idx) => (
            <g key={`centroid-${idx}`}>
              <circle
                cx={50 + centroid.x * 4}
                cy={250 - centroid.y * 2}
                r="8"
                fill={colors[idx]}
                stroke="black"
                strokeWidth="2"
              />
              <text
                x={50 + centroid.x * 4}
                y={250 - centroid.y * 2 + 3}
                textAnchor="middle"
                className="text-xs font-bold fill-white"
              >
                C{idx + 1}
              </text>
            </g>
          ))}

          {/* Cluster boundaries (optional) */}
          {step >= 2 && centroids.map((centroid, idx) => (
            <circle
              key={`boundary-${idx}`}
              cx={50 + centroid.x * 4}
              cy={250 - centroid.y * 2}
              r="40"
              fill="none"
              stroke={colors[idx]}
              strokeWidth="1"
              strokeDasharray="5,5"
              opacity="0.3"
            />
          ))}
        </svg>
      </div>

      {/* Step description */}
      <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg mb-4">
        {step === 0 && (
          <div>
            <strong>Données brutes :</strong> Nous avons des données de clients (âge, revenu) sans étiquettes.
            L&apos;objectif est de découvrir des groupes naturels dans ces données.
          </div>
        )}
        {step === 1 && (
          <div>
            <strong>Initialisation :</strong> Nous plaçons 3 centroïdes (C1, C2, C3) de manière aléatoire.
            Ce sont les centres provisoires de nos clusters.
          </div>
        )}
        {step === 2 && (
          <div>
            <strong>Assignment :</strong> Chaque point est assigné au centroïde le plus proche.
            Les couleurs indiquent l&apos;appartenance aux clusters.
          </div>
        )}
        {step === 3 && (
          <div>
            <strong>Mise à jour :</strong> Les centroïdes se déplacent vers le centre de gravité
            de leurs points assignés. C&apos;est l&apos;étape d&apos;optimisation.
          </div>
        )}
        {step === 4 && (
          <div>
            <strong>Convergence :</strong> Après quelques itérations, nous obtenons 3 segments clients :
            <br />• 🔵 Jeunes (revenus modestes) • 🔴 Seniors (revenus élevés) • 🟢 Moyens (équilibrés)
          </div>
        )}
      </div>

      {/* Insights box */}
      {step === 4 && (
        <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg mb-4">
          <h4 className="font-bold mb-2">💡 Insights Marketing</h4>
          <ul className="text-sm space-y-1">
            <li>• <strong>Cluster 1:</strong> Stratégies prix abordables, produits tendance</li>
            <li>• <strong>Cluster 2:</strong> Produits premium, services personnalisés</li>
            <li>• <strong>Cluster 3:</strong> Offres équilibrées qualité/prix</li>
          </ul>
        </div>
      )}

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
          onClick={() => setStep(Math.min(4, step + 1))}
          disabled={step === 4}
          className="px-4 py-2 bg-purple-500 text-white rounded disabled:opacity-50"
        >
          Suivant →
        </button>
      </div>
    </div>
  );
}
