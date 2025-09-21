// Structure pédagogique avec prérequis et progression logique

export type PrerequisiteType = 'math' | 'programming' | 'course' | 'concept';

export interface Prerequisite {
  type: PrerequisiteType;
  id: string;
  name: string;
  description?: string;
  essential?: boolean; // true = obligatoire, false = recommandé
}

export interface LearningPath {
  id: string;
  name: string;
  description: string;
  icon: string;
  estimatedWeeks: number;
  difficulty: 'débutant' | 'intermédiaire' | 'avancé';
  courses: string[]; // IDs des cours dans l'ordre
}

export interface CourseModule {
  id: string;
  name: string;
  description: string;
  estimatedHours: number;
  prerequisites: Prerequisite[];
  learningObjectives: string[];
  nextRecommendations?: string[]; // Cours suivants recommandés
}

// Prérequis de base disponibles
export const basePrerequisites: Record<string, Prerequisite> = {
  // Mathématiques
  'linear-algebra': {
    type: 'math',
    id: 'linear-algebra',
    name: 'Algèbre linéaire de base',
    description: 'Vecteurs, matrices, produit scalaire, déterminant',
    essential: true
  },
  'statistics-basics': {
    type: 'math', 
    id: 'statistics-basics',
    name: 'Statistiques descriptives',
    description: 'Moyenne, variance, médiane, distributions',
    essential: true
  },
  'probability': {
    type: 'math',
    id: 'probability', 
    name: 'Probabilités',
    description: 'Probabilités conditionnelles, théorème de Bayes',
    essential: true
  },
  'calculus': {
    type: 'math',
    id: 'calculus',
    name: 'Calcul différentiel',
    description: 'Dérivées, gradients, optimisation',
    essential: false
  },
  
  // Programmation
  'python-basics': {
    type: 'programming',
    id: 'python-basics',
    name: 'Python fondamental',
    description: 'Syntaxe, structures de données, fonctions, classes',
    essential: true
  },
  'python-data': {
    type: 'programming',
    id: 'python-data',
    name: 'Python pour les données',
    description: 'NumPy, Pandas, Matplotlib',
    essential: false
  },
  'git': {
    type: 'programming', 
    id: 'git',
    name: 'Git et versioning',
    description: 'Contrôle de version, collaboration',
    essential: false
  },
  
  // Concepts informatiques
  'algorithms': {
    type: 'concept',
    id: 'algorithms',
    name: 'Algorithmes de base',
    description: 'Complexité, tri, recherche, graphes',
    essential: false
  },
  'data-structures': {
    type: 'concept',
    id: 'data-structures', 
    name: 'Structures de données',
    description: 'Listes, arbres, tables de hachage',
    essential: false
  }
};

// Parcours d'apprentissage recommandés
export const learningPaths: LearningPath[] = [
  {
    id: 'programmation-bases',
    name: '⌨️ Programmation — bases',
    description: 'Apprendre à programmer: logique, structures de contrôle, fonctions et structures de données.',
    icon: '⌨️',
    estimatedWeeks: 2,
    difficulty: 'débutant',
    courses: [
      'programmation-fondamentale'
    ]
  },
  {
    id: 'developpement-web',
    name: '🌐 Développement web',
    description: 'Du HTML/CSS/JS aux frameworks modernes (React/Next.js) et bonnes pratiques.',
    icon: '🌐',
    estimatedWeeks: 3,
    difficulty: 'débutant',
    courses: [
      'dev-web-bases',
      'frameworks-web'
    ]
  },
  {
    id: 'ia-fundamentals',
    name: '🧠 Fondamentaux de l\'IA',
    description: 'Découverte complète de l\'Intelligence Artificielle depuis les bases',
    icon: '🧠',
    estimatedWeeks: 4,
    difficulty: 'débutant',
    courses: [
      'programmation-fondamentale',
      'dev-web-bases',
      'intro-ia',
      'statistiques-pour-ia', 
      'apprentissage-supervise',
      'apprentissage-non-supervise'
    ]
  },
  {
    id: 'ml-engineer',
    name: '🛠️ Ingénieur ML',
    description: 'Formation complète pour devenir ingénieur en apprentissage automatique',
    icon: '🛠️',
    estimatedWeeks: 8,
    difficulty: 'intermédiaire',
    courses: [
      'programmation-fondamentale',
      'dev-web-bases',
      'frameworks-web',
      'statistiques-pour-ia',
      'apprentissage-supervise',
      'apprentissage-non-supervise', 
      'deep-learning',
      'ethique-mlops'
    ]
  },
  {
    id: 'ai-researcher',
    name: '🔬 Chercheur IA',
    description: 'Parcours avancé pour la recherche en Intelligence Artificielle',
    icon: '🔬',
    estimatedWeeks: 12,
    difficulty: 'avancé',
    courses: [
      'intro-ia',
      'statistiques-pour-ia',
      'apprentissage-supervise',
      'apprentissage-non-supervise',
      'deep-learning',
      'apprentissage-par-renforcement',
      'recherche-et-planification',
      'nlp',
      'vision'
    ]
  },
  {
    id: 'specialized-nlp',
    name: '💬 Spécialiste NLP',
    description: 'Expertise en traitement automatique du langage naturel',
    icon: '💬',
    estimatedWeeks: 6,
    difficulty: 'intermédiaire',
    courses: [
      'statistiques-pour-ia',
      'apprentissage-supervise',
      'deep-learning',
      'nlp'
    ]
  },
  {
    id: 'computer-vision',
    name: '👁️ Vision par ordinateur',
    description: 'Spécialisation en traitement et analyse d\'images',
    icon: '👁️',
    estimatedWeeks: 6,
    difficulty: 'intermédiaire',
    courses: [
      'statistiques-pour-ia',
      'apprentissage-supervise',
      'deep-learning',
      'vision'
    ]
  }
];

// Structure modulaire enrichie des cours
export const courseModules: Record<string, CourseModule> = {
  'programmation-fondamentale': {
    id: 'programmation-fondamentale',
    name: 'Programmation fondamentale',
    description: 'Variables, types, contrôle de flux, fonctions et structures de données dans un langage moderne.',
    estimatedHours: 8,
    prerequisites: [
      {
        type: 'concept',
        id: 'computer-basics',
        name: 'Bases de l\'informatique',
        description: 'Système d\'exploitation, terminal, éditeur de code',
        essential: false
      }
    ],
    learningObjectives: [
      'Écrire des programmes simples (IO, conditions, boucles)',
      'Utiliser fonctions et modules pour structurer le code',
      'Manipuler listes, dictionnaires, ensembles et chaînes',
      'Comprendre les erreurs courantes et le débogage de base'
    ],
    nextRecommendations: ['dev-web-bases', 'statistiques-pour-ia']
  },

  'dev-web-bases': {
    id: 'dev-web-bases',
    name: 'Développement web — bases',
    description: 'HTML, CSS et JavaScript fondamentaux, HTTP et modèles client-serveur.',
    estimatedHours: 8,
    prerequisites: [
      {
        type: 'course',
        id: 'programmation-fondamentale',
        name: 'Programmation fondamentale',
        description: 'Notions de base en programmation',
        essential: true
      }
    ],
    learningObjectives: [
      'Structurer une page avec HTML sémantique',
      'Styliser avec CSS (flexbox, grid, responsive)',
      'Programmer des interactions DOM en JavaScript',
      'Comprendre HTTP, requêtes fetch et JSON'
    ],
    nextRecommendations: ['frameworks-web', 'intro-ia']
  },

  'frameworks-web': {
    id: 'frameworks-web',
    name: 'Frameworks web',
    description: 'Découvrir React/Next.js : composants, état, routing et data fetching.',
    estimatedHours: 10,
    prerequisites: [
      {
        type: 'course',
        id: 'dev-web-bases',
        name: 'Développement web — bases',
        description: 'HTML/CSS/JS essentiels',
        essential: true
      }
    ],
    learningObjectives: [
      'Créer des composants React avec état et effets',
      'Utiliser Next.js (routing, SSG/SSR, assets)',
      'Gérer des appels API et l\'affichage de données',
      'Déployer une application web basique'
    ],
    nextRecommendations: ['web-avance', 'deep-learning']
  },
  'intro-ia': {
    id: 'intro-ia',
    name: 'Introduction à l\'Intelligence Artificielle',
    description: 'Découvrez les fondements historiques et conceptuels de l\'IA, ses approches principales et ses applications modernes.',
    estimatedHours: 6,
    prerequisites: [], // Aucun prérequis - cours d'entrée
    learningObjectives: [
      'Comprendre l\'histoire et l\'évolution de l\'IA',
      'Distinguer les approches symboliques et statistiques',
      'Identifier les domaines d\'application de l\'IA',
      'Évaluer les enjeux éthiques et sociétaux'
    ],
    nextRecommendations: ['statistiques-pour-ia', 'recherche-et-planification']
  },
  
  'statistiques-pour-ia': {
    id: 'statistiques-pour-ia',
    name: 'Statistiques pour l\'IA',
    description: 'Maîtrisez les fondements mathématiques indispensables pour comprendre et appliquer les techniques d\'IA.',
    estimatedHours: 10,
    prerequisites: [
      basePrerequisites['linear-algebra'],
      {
        type: 'math',
        id: 'basic-math',
        name: 'Mathématiques de niveau lycée',
        description: 'Fonctions, logarithmes, exponentielles',
        essential: true
      }
    ],
    learningObjectives: [
      'Maîtriser les statistiques descriptives et inférentielles',
      'Comprendre les distributions de probabilité principales',
      'Appliquer le théorème de Bayes et ses implications',
      'Calculer et interpréter les métriques d\'évaluation ML'
    ],
    nextRecommendations: ['apprentissage-supervise', 'apprentissage-non-supervise']
  },
  
  'apprentissage-supervise': {
    id: 'apprentissage-supervise',
    name: 'Apprentissage supervisé',
    description: 'Apprenez les algorithmes de classification et régression, de la théorie à l\'implémentation pratique.',
    estimatedHours: 12,
    prerequisites: [
      basePrerequisites['statistics-basics'],
      basePrerequisites['python-basics'],
      basePrerequisites['linear-algebra'],
      {
        type: 'course',
        id: 'statistiques-pour-ia',
        name: 'Statistiques pour l\'IA',
        description: 'Concepts statistiques fondamentaux',
        essential: true
      }
    ],
    learningObjectives: [
      'Implémenter la régression linéaire et logistique',
      'Comprendre et appliquer SVM, arbres de décision',
      'Maîtriser la validation croisée et la régularisation',
      'Évaluer les performances avec les bonnes métriques'
    ],
    nextRecommendations: ['apprentissage-non-supervise', 'deep-learning']
  },
  
  'apprentissage-non-supervise': {
    id: 'apprentissage-non-supervise',
    name: 'Apprentissage non supervisé',
    description: 'Explorez le clustering, la réduction de dimensionnalité et la détection d\'anomalies.',
    estimatedHours: 8,
    prerequisites: [
      basePrerequisites['statistics-basics'],
      basePrerequisites['python-basics'],
      basePrerequisites['linear-algebra'],
      {
        type: 'course',
        id: 'statistiques-pour-ia',
        name: 'Statistiques pour l\'IA',
        description: 'Base statistique requise',
        essential: true
      }
    ],
    learningObjectives: [
      'Appliquer k-means, DBSCAN et clustering hiérarchique',
      'Réduire la dimensionnalité avec PCA, t-SNE, UMAP',
      'Détecter les anomalies avec différentes approches',
      'Évaluer la qualité des clusters'
    ],
    nextRecommendations: ['deep-learning', 'apprentissage-par-renforcement']
  },
  
  'deep-learning': {
    id: 'deep-learning',
    name: 'Réseaux de neurones profonds',
    description: 'Maîtrisez l\'apprentissage profond : perceptrons, CNN, RNN et Transformers.',
    estimatedHours: 14,
    prerequisites: [
      basePrerequisites['calculus'],
      basePrerequisites['python-data'],
      basePrerequisites['linear-algebra'],
      {
        type: 'course',
        id: 'apprentissage-supervise',
        name: 'Apprentissage supervisé',
        description: 'Concepts ML fondamentaux',
        essential: true
      }
    ],
    learningObjectives: [
      'Comprendre et implémenter la rétropropagation',
      'Concevoir des CNN pour la vision par ordinateur',
      'Utiliser RNN/LSTM pour les données séquentielles',
      'Appliquer l\'architecture Transformer'
    ],
    nextRecommendations: ['nlp', 'vision', 'apprentissage-par-renforcement']
  },
  
  'recherche-et-planification': {
    id: 'recherche-et-planification',
    name: 'Recherche et planification',
    description: 'Algorithmes de recherche, heuristiques et planification automatique dans l\'espace d\'états.',
    estimatedHours: 8,
    prerequisites: [
      basePrerequisites['algorithms'],
      basePrerequisites['data-structures'],
      {
        type: 'concept',
        id: 'graph-theory',
        name: 'Théorie des graphes (bases)',
        description: 'Graphes, parcours, plus courts chemins',
        essential: false
      }
    ],
    learningObjectives: [
      'Implémenter BFS, DFS et leurs variantes',
      'Maîtriser A* et les heuristiques admissibles',
      'Appliquer les méta-heuristiques (recuit simulé, génétique)',
      'Résoudre des problèmes de planification'
    ],
    nextRecommendations: ['apprentissage-par-renforcement']
  },
  
  'apprentissage-par-renforcement': {
    id: 'apprentissage-par-renforcement',
    name: 'Apprentissage par renforcement',
    description: 'MDP, Q-learning, policy gradient et applications aux jeux et à la robotique.',
    estimatedHours: 10,
    prerequisites: [
      basePrerequisites['probability'],
      {
        type: 'course',
        id: 'recherche-et-planification',
        name: 'Recherche et planification',
        description: 'Concepts de recherche dans l\'espace d\'états',
        essential: false
      }
    ],
    learningObjectives: [
      'Modéliser des problèmes comme des MDP',
      'Implémenter Q-learning et ses variantes',
      'Comprendre les méthodes policy gradient',
      'Appliquer RL à des problèmes concrets'
    ],
    nextRecommendations: ['ethique-mlops']
  },
  
  'nlp': {
    id: 'nlp',
    name: 'Traitement automatique du langage',
    description: 'Représentations textuelles, modèles séquentiels et Transformers pour le NLP.',
    estimatedHours: 8,
    prerequisites: [
      {
        type: 'course',
        id: 'deep-learning',
        name: 'Réseaux de neurones profonds',
        description: 'Architectures neuronales avancées',
        essential: true
      }
    ],
    learningObjectives: [
      'Comprendre word2vec, GloVe et embeddings contextuels',
      'Appliquer les Transformers au NLP',
      'Implémenter des modèles de langue',
      'Traiter des tâches NLP courantes'
    ],
    nextRecommendations: ['ethique-mlops']
  },
  
  'vision': {
    id: 'vision',
    name: 'Vision par ordinateur',
    description: 'CNN, détection d\'objets, segmentation et applications visuelles.',
    estimatedHours: 8,
    prerequisites: [
      {
        type: 'course',
        id: 'deep-learning',
        name: 'Réseaux de neurones profonds',
        description: 'CNN et architectures profondes',
        essential: true
      }
    ],
    learningObjectives: [
      'Maîtriser les convolutions et le traitement d\'images',
      'Implémenter la détection d\'objets',
      'Appliquer la segmentation sémantique',
      'Évaluer les performances en vision'
    ],
    nextRecommendations: ['ethique-mlops']
  },
  
  'ethique-mlops': {
    id: 'ethique-mlops',
    name: 'Éthique et MLOps',
    description: 'Biais, équité, reproductibilité et déploiement responsable des modèles ML.',
    estimatedHours: 6,
    prerequisites: [
      {
        type: 'course',
        id: 'apprentissage-supervise',
        name: 'Apprentissage supervisé',
        description: 'Concepts ML de base',
        essential: true
      }
    ],
    learningObjectives: [
      'Identifier et mesurer les biais algorithmiques',
      'Appliquer les principes d\'équité',
      'Mettre en place un pipeline MLOps',
      'Monitorer les modèles en production'
    ],
    nextRecommendations: []
  },
  
  'web-avance': {
    id: 'web-avance',
    name: 'Développement Web Avancé',
    description: 'Créez des applications web modernes avec React/Next.js et gestion d\'état côté client.',
    estimatedHours: 8,
    prerequisites: [
      {
        type: 'programming',
        id: 'javascript',
        name: 'JavaScript moderne',
        description: 'ES6+, async/await, modules',
        essential: true
      },
      {
        type: 'programming',
        id: 'html-css',
        name: 'HTML/CSS',
        description: 'Bases du développement web',
        essential: true
      }
    ],
    learningObjectives: [
      'Développer avec React et Next.js',
      'Gérer l\'état avec localStorage',
      'Créer des interfaces utilisateur modernes',
      'Implémenter une progression d\'apprentissage'
    ],
    nextRecommendations: []
  }
};

// Fonction utilitaire pour obtenir le parcours d'apprentissage recommandé
export function getRecommendedPath(userLevel: string, interests: string[]): LearningPath | null {
  if (userLevel === 'débutant') {
    return learningPaths.find(p => p.id === 'ia-fundamentals') || null;
  }
  
  if (interests.includes('nlp')) {
    return learningPaths.find(p => p.id === 'specialized-nlp') || null;
  }
  
  if (interests.includes('vision')) {
    return learningPaths.find(p => p.id === 'computer-vision') || null;
  }
  
  if (interests.includes('engineering')) {
    return learningPaths.find(p => p.id === 'ml-engineer') || null;
  }
  
  if (interests.includes('research')) {
    return learningPaths.find(p => p.id === 'ai-researcher') || null;
  }
  
  // Par défaut
  return learningPaths.find(p => p.id === 'ia-fundamentals') || null;
}

// Fonction pour vérifier si les prérequis d'un cours sont satisfaits
export function checkPrerequisites(courseId: string, completedCourses: string[]): {
  satisfied: boolean;
  missing: Prerequisite[];
} {
  const courseModule = courseModules[courseId];
  if (!courseModule) return { satisfied: true, missing: [] };
  
  const missing = courseModule.prerequisites.filter(prereq => {
    if (prereq.type === 'course') {
      return !completedCourses.includes(prereq.id);
    }
    // Pour les prérequis math/programming/concept, on suppose qu'ils sont satisfaits
    // Dans une vraie application, on aurait un système de validation
    return false;
  });
  
  const essentialMissing = missing.filter(p => p.essential);
  
  return {
    satisfied: essentialMissing.length === 0,
    missing: missing
  };
}