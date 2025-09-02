'use client';

import { useState } from 'react';

export default function AIHistoryDemo() {
  const [selectedEra, setSelectedEra] = useState<string>('');
  
  const eras = [
    {
      id: '1950s',
      name: 'Précurseurs (1950s)',
      color: 'bg-blue-100 dark:bg-blue-900/30',
      achievements: [
        'Test de Turing (1950)',
        'Premiers ordinateurs',
        'Cybernétique'
      ],
      impact: 'Fondations conceptuelles de l\'IA'
    },
    {
      id: '1960s',
      name: 'Âge d\'or (1960s-70s)',
      color: 'bg-green-100 dark:bg-green-900/30',
      achievements: [
        'ELIZA (1966)',
        'Systèmes experts',
        'Robot Shakey'
      ],
      impact: 'Premiers succès pratiques'
    },
    {
      id: '1980s',
      name: 'Hiver IA (1980s-90s)',
      color: 'bg-red-100 dark:bg-red-900/30',
      achievements: [
        'Limitations découvertes',
        'Réduction financements',
        'Scepticisme'
      ],
      impact: 'Période de réflexion et consolidation'
    },
    {
      id: '2000s',
      name: 'Renaissance (2000s+)',
      color: 'bg-purple-100 dark:bg-purple-900/30',
      achievements: [
        'Deep Blue (1997)',
        'Machine Learning',
        'Big Data'
      ],
      impact: 'Retour en force avec nouveaux paradigmes'
    },
    {
      id: '2020s',
      name: 'IA Moderne (2020s)',
      color: 'bg-yellow-100 dark:bg-yellow-900/30',
      achievements: [
        'GPT-3/4',
        'DALL-E',
        'ChatGPT'
      ],
      impact: 'Démocratisation et adoption massive'
    }
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
      <h3 className="text-lg font-bold mb-4 text-center">🕰️ Histoire Interactive de l'IA</h3>
      
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-2 mb-6">
        {eras.map((era) => (
          <button
            key={era.id}
            onClick={() => setSelectedEra(era.id)}
            className={`p-3 rounded-lg text-sm font-medium transition-all ${
              selectedEra === era.id 
                ? `${era.color} ring-2 ring-blue-500` 
                : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            {era.name}
          </button>
        ))}
      </div>

      {selectedEra && (
        <div className="mt-4 p-4 rounded-lg bg-gray-50 dark:bg-gray-700">
          {(() => {
            const era = eras.find(e => e.id === selectedEra);
            return era ? (
              <div>
                <h4 className="font-bold text-lg mb-2">{era.name}</h4>
                <div className="mb-3">
                  <strong>Réalisations clés :</strong>
                  <ul className="mt-1 ml-4 space-y-1">
                    {era.achievements.map((achievement, idx) => (
                      <li key={idx} className="text-sm">• {achievement}</li>
                    ))}
                  </ul>
                </div>
                <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded">
                  <strong>Impact :</strong> {era.impact}
                </div>
              </div>
            ) : null;
          })()}
        </div>
      )}

      <div className="mt-4 text-center text-xs text-gray-500">
        Cliquez sur une époque pour explorer ses caractéristiques
      </div>
    </div>
  );
}
