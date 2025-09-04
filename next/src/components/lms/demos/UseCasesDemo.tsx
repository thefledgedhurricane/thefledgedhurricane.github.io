"use client";

const cases = [
  {
    title: 'Santé',
    items: [
      'Diagnostic cancer (imagerie)',
      'Prédiction d’épidémies',
      'Personnalisation des traitements',
      'Télémédecine intelligente',
    ],
    color: 'bg-blue-50 dark:bg-blue-900/20',
  },
  {
    title: 'Environnement',
    items: [
      'Prévision météo précise',
      'Optimisation énergétique',
      'Monitoring de la pollution',
      'Agriculture intelligente',
    ],
    color: 'bg-green-50 dark:bg-green-900/20',
  },
  {
    title: 'Éducation',
    items: [
      'Tuteurs adaptatifs',
      'Évaluation automatique',
      'Parcours personnalisés',
      'Détection des difficultés',
    ],
    color: 'bg-purple-50 dark:bg-purple-900/20',
  },
];

export default function UseCasesDemo() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-4">
      {cases.map((c) => (
        <div key={c.title} className={`${c.color} p-4 rounded-lg border border-gray-200 dark:border-gray-700`}>
          <h4 className="font-semibold mb-2">{c.title}</h4>
          <ul className="text-sm space-y-1 list-disc pl-4">
            {c.items.map((i) => (
              <li key={i}>{i}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
