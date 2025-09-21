import { QuizConfig } from '@/components/quiz/QuizEngine';

export const programmationFondamentaleQuizzes: QuizConfig[] = [
  {
    id: 'basics-quiz-1',
    title: 'Quiz: Variables et Types de Données',
    description: 'Testez vos connaissances sur les variables, types de données et opérateurs de base',
    courseId: 'programmation-fondamentale',
    lessonId: 'bases-langages',
    passingScore: 70,
    allowRetry: true,
    shuffleQuestions: true,
    showCorrectAnswers: true,
    questions: [
      {
        id: 'var-1',
        type: 'multiple-choice',
        question: 'Quel est le type de données le plus approprié pour stocker l\'âge d\'une personne en Python ?',
        options: ['str', 'int', 'float', 'bool'],
        correctAnswer: 'int',
        points: 10,
        difficulty: 'easy',
        tags: ['variables', 'types'],
        explanation: 'L\'âge est un nombre entier, donc le type `int` est le plus approprié.',
        hints: ['Pensez au fait que l\'âge est toujours un nombre entier', 'Le type doit pouvoir représenter des nombres sans partie décimale']
      },
      {
        id: 'var-2',
        type: 'code-completion',
        question: 'Complétez ce code pour calculer la moyenne de trois notes :',
        code: `note1 = 15
note2 = 12  
note3 = 18
moyenne = ___________
print(f"La moyenne est: {moyenne}")`,
        correctAnswer: '(note1 + note2 + note3) / 3',
        points: 15,
        difficulty: 'medium',
        tags: ['calculs', 'variables'],
        explanation: 'Pour calculer une moyenne, on additionne tous les éléments et on divise par le nombre d\'éléments.',
        hints: ['Il faut additionner les trois notes', 'Puis diviser par le nombre total de notes']
      },
      {
        id: 'var-3',
        type: 'true-false',
        question: 'En Python, une variable peut changer de type durant l\'exécution du programme.',
        correctAnswer: 'Vrai',
        points: 10,
        difficulty: 'medium',
        tags: ['types', 'dynamique'],
        explanation: 'Python est un langage à typage dynamique, ce qui signifie qu\'une variable peut changer de type.',
        hints: ['Python est-il un langage à typage statique ou dynamique ?']
      },
      {
        id: 'var-4',
        type: 'fill-blank',
        question: 'Quels sont les 4 types de données primitifs principaux en Python ?',
        correctAnswer: ['int', 'float', 'str', 'bool'],
        points: 20,
        difficulty: 'medium',
        tags: ['types'],
        explanation: 'Les types primitifs de base sont int (entier), float (décimal), str (chaîne), bool (booléen).',
        hints: ['Pensez aux nombres entiers, décimaux, texte et valeurs de vérité']
      },
      {
        id: 'var-5',
        type: 'multiple-choice',
        question: 'Que va afficher ce code ?\n```python\nx = "5"\ny = "3"\nresultat = x + y\nprint(resultat)\n```',
        options: ['8', '53', '5 + 3', 'Erreur'],
        correctAnswer: '53',
        points: 15,
        difficulty: 'medium',
        tags: ['strings', 'concaténation'],
        explanation: 'L\'opérateur + entre deux chaînes effectue une concaténation, pas une addition numérique.',
        hints: ['x et y sont des chaînes de caractères, pas des nombres', 'L\'opérateur + sur des strings fait une concaténation']
      }
    ]
  },
  {
    id: 'functions-quiz-1',
    title: 'Quiz: Fonctions et Structures de Contrôle',
    description: 'Évaluez votre compréhension des fonctions, boucles et conditions',
    courseId: 'programmation-fondamentale',
    lessonId: 'fonctions-structures',
    passingScore: 75,
    allowRetry: true,
    shuffleQuestions: false,
    showCorrectAnswers: true,
    timeLimit: 20,
    questions: [
      {
        id: 'func-1',
        type: 'code-completion',
        question: 'Créez une fonction qui calcule le factoriel d\'un nombre :',
        code: `def factoriel(n):
    if n <= 1:
        return ___
    else:
        return ___ * factoriel(___)`,
        correctAnswer: '1\nn\nn-1',
        points: 25,
        difficulty: 'hard',
        tags: ['fonctions', 'récursion'],
        explanation: 'Le factoriel de n est n * (n-1)!, avec 0! = 1! = 1 comme cas de base.',
        hints: ['Le factoriel de 0 et 1 est 1', 'Pour n > 1, factoriel(n) = n * factoriel(n-1)']
      },
      {
        id: 'func-2',
        type: 'multiple-choice',
        question: 'Quelle est la différence entre `return` et `print` dans une fonction ?',
        options: [
          'Aucune différence',
          'return affiche la valeur, print la retourne',
          'print affiche la valeur, return la retourne à l\'appelant',
          'return est plus rapide que print'
        ],
        correctAnswer: 'print affiche la valeur, return la retourne à l\'appelant',
        points: 15,
        difficulty: 'medium',
        tags: ['fonctions', 'concepts'],
        explanation: '`print` affiche une valeur à l\'écran, `return` renvoie une valeur à l\'endroit où la fonction a été appelée.',
        hints: ['Que fait print avec une valeur ?', 'Que fait return avec une valeur ?']
      },
      {
        id: 'func-3',
        type: 'ordering',
        question: 'Remettez ces étapes dans l\'ordre pour créer une fonction efficace :',
        correctAnswer: [
          'Définir le nom et les paramètres',
          'Écrire la documentation (docstring)',
          'Implémenter la logique',
          'Tester avec des exemples',
          'Gérer les cas d\'erreur'
        ],
        points: 20,
        difficulty: 'medium',
        tags: ['bonnes-pratiques', 'fonctions'],
        explanation: 'Une approche méthodique améliore la qualité et la maintenabilité du code.'
      },
      {
        id: 'func-4',
        type: 'fill-blank',
        question: 'Complétez les avantages des fonctions : Les fonctions permettent la _____, évitent la _____ de code, et améliorent la _____.',
        correctAnswer: ['réutilisabilité', 'duplication', 'lisibilité'],
        points: 15,
        difficulty: 'easy',
        tags: ['concepts', 'fonctions'],
        explanation: 'Les fonctions sont un pilier de la programmation modulaire.',
        hints: ['Pouvoir utiliser le même code plusieurs fois', 'Éviter de réécrire le même code', 'Rendre le code plus facile à comprendre']
      }
    ]
  }
];

export const statistiquesIAQuizzes: QuizConfig[] = [
  {
    id: 'stats-descriptive-quiz',
    title: 'Quiz: Statistiques Descriptives pour l\'IA',
    description: 'Maîtrisez les concepts statistiques fondamentaux utilisés en intelligence artificielle',
    courseId: 'statistiques-pour-ia',
    lessonId: 'stats-descriptives',
    passingScore: 80,
    allowRetry: true,
    shuffleQuestions: true,
    showCorrectAnswers: true,
    timeLimit: 25,
    questions: [
      {
        id: 'stats-1',
        type: 'multiple-choice',
        question: 'Quelle mesure de tendance centrale est la plus résistante aux valeurs aberrantes ?',
        options: ['Moyenne arithmétique', 'Médiane', 'Mode', 'Moyenne géométrique'],
        correctAnswer: 'Médiane',
        points: 10,
        difficulty: 'medium',
        tags: ['tendance-centrale', 'robustesse'],
        explanation: 'La médiane n\'est pas affectée par les valeurs extrêmes car elle ne dépend que de la position centrale.',
        hints: ['Quelle mesure divise les données en deux parties égales ?', 'Laquelle ne change pas si on modifie les valeurs extrêmes ?']
      },
      {
        id: 'stats-2',
        type: 'code-completion',
        question: 'Calculez la variance d\'un échantillon en Python avec NumPy :',
        code: `import numpy as np

data = [2, 4, 6, 8, 10, 12, 14]
variance_population = np.var(data)
variance_echantillon = np.var(data, ddof=___)

print(f"Variance population: {variance_population}")
print(f"Variance échantillon: {variance_echantillon}")`,
        correctAnswer: '1',
        points: 15,
        difficulty: 'medium',
        tags: ['variance', 'numpy', 'échantillon'],
        explanation: 'ddof=1 pour la variance d\'échantillon (divise par n-1), ddof=0 pour la population (divise par n).',
        hints: ['Pour un échantillon, on divise par n-1', 'ddof signifie "delta degrees of freedom"']
      },
      {
        id: 'stats-3',
        type: 'fill-blank',
        question: 'Pour une distribution normale, environ ___% des données se trouvent dans 1 écart-type de la moyenne, ___% dans 2 écarts-types, et ___% dans 3 écarts-types.',
        correctAnswer: ['68', '95', '99.7'],
        points: 20,
        difficulty: 'hard',
        tags: ['distribution-normale', 'règle-empirique'],
        explanation: 'C\'est la règle empirique (ou règle 68-95-99.7) pour la distribution normale.',
        hints: ['C\'est la règle empirique des distributions normales', 'Les pourcentages sont approximativement 68, 95 et 99.7']
      },
      {
        id: 'stats-4',
        type: 'multiple-choice',
        question: 'Dans le contexte de l\'IA, pourquoi la normalisation des données est-elle importante ?',
        options: [
          'Pour réduire la taille des fichiers',
          'Pour que tous les features aient la même échelle',
          'Pour éliminer les valeurs manquantes',
          'Pour accélérer l\'affichage'
        ],
        correctAnswer: 'Pour que tous les features aient la même échelle',
        points: 15,
        difficulty: 'medium',
        tags: ['preprocessing', 'normalisation', 'features'],
        explanation: 'Les algorithmes d\'IA peuvent être biaisés vers les features avec de grandes valeurs si on ne normalise pas.',
        hints: ['Pensez à l\'impact des différentes échelles sur les algorithmes', 'Que se passe-t-il si une variable va de 0 à 1 et une autre de 0 à 1000 ?']
      },
      {
        id: 'stats-5',
        type: 'true-false',
        question: 'La corrélation implique toujours la causalité.',
        correctAnswer: 'Faux',
        points: 10,
        difficulty: 'easy',
        tags: ['corrélation', 'causalité'],
        explanation: 'C\'est un principe fondamental : "Correlation does not imply causation". Une corrélation peut être due au hasard ou à une variable confondante.',
        hints: ['C\'est un piège classique en statistiques', 'Deux variables peuvent être corrélées sans qu\'une cause l\'autre']
      },
      {
        id: 'stats-6',
        type: 'code-completion',
        question: 'Créez une matrice de corrélation avec pandas :',
        code: `import pandas as pd
import numpy as np

# Données d'exemple
data = {
    'age': [25, 30, 35, 40, 45],
    'salaire': [30000, 40000, 50000, 60000, 70000],
    'experience': [1, 3, 5, 8, 12]
}

df = pd.DataFrame(data)
correlation_matrix = df.___()

print(correlation_matrix)`,
        correctAnswer: 'corr',
        points: 10,
        difficulty: 'easy',
        tags: ['pandas', 'corrélation'],
        explanation: 'La méthode .corr() de pandas calcule la matrice de corrélation de Pearson par défaut.',
        hints: ['Quelle méthode pandas calcule les corrélations ?']
      }
    ]
  }
];

export const apprentissageSuperviseQuizzes: QuizConfig[] = [
  {
    id: 'supervised-concepts-quiz',
    title: 'Quiz: Concepts de l\'Apprentissage Supervisé',
    description: 'Testez votre compréhension des algorithmes d\'apprentissage supervisé',
    courseId: 'apprentissage-supervise',
    lessonId: 'concepts-base',
    passingScore: 75,
    allowRetry: true,
    shuffleQuestions: true,
    showCorrectAnswers: true,
    timeLimit: 30,
    questions: [
      {
        id: 'sup-1',
        type: 'multiple-choice',
        question: 'Quelle est la différence principale entre classification et régression ?',
        options: [
          'La classification prédit des valeurs continues, la régression des catégories',
          'La classification prédit des catégories, la régression des valeurs continues',
          'Il n\'y a pas de différence',
          'La classification est plus rapide que la régression'
        ],
        correctAnswer: 'La classification prédit des catégories, la régression des valeurs continues',
        points: 10,
        difficulty: 'easy',
        tags: ['classification', 'régression', 'concepts'],
        explanation: 'Classification : prédire une classe/catégorie. Régression : prédire une valeur numérique continue.',
        hints: ['Que prédit-on : une catégorie ou un nombre ?']
      },
      {
        id: 'sup-2',
        type: 'ordering',
        question: 'Ordonnez les étapes du processus d\'apprentissage supervisé :',
        correctAnswer: [
          'Collecte et préparation des données',
          'Division en ensembles d\'entraînement et de test',
          'Entraînement du modèle',
          'Évaluation sur l\'ensemble de test',
          'Optimisation des hyperparamètres',
          'Déploiement du modèle'
        ],
        points: 20,
        difficulty: 'medium',
        tags: ['workflow', 'méthodologie'],
        explanation: 'Cette séquence garantit un développement rigoureux et une évaluation fiable du modèle.'
      },
      {
        id: 'sup-3',
        type: 'code-completion',
        question: 'Implémentez la validation croisée avec scikit-learn :',
        code: `from sklearn.model_selection import cross_val_score
from sklearn.ensemble import RandomForestClassifier
from sklearn.datasets import load_iris

X, y = load_iris(return_X_y=True)
model = RandomForestClassifier(random_state=42)

# Validation croisée avec 5 folds
cv_scores = cross_val_score(model, X, y, cv=___, scoring='___')

print(f"CV Accuracy: {cv_scores.mean():.3f} (+/- {cv_scores.std() * 2:.3f})")`,
        correctAnswer: '5\naccuracy',
        points: 15,
        difficulty: 'medium',
        tags: ['validation-croisée', 'scikit-learn'],
        explanation: 'cv=5 pour 5-fold cross-validation, scoring=\'accuracy\' pour la précision en classification.',
        hints: ['Combien de folds voulez-vous ?', 'Quelle métrique pour la classification ?']
      },
      {
        id: 'sup-4',
        type: 'multiple-choice',
        question: 'Qu\'est-ce que le overfitting (surapprentissage) ?',
        options: [
          'Le modèle ne fonctionne que sur les données d\'entraînement',
          'Le modèle est trop simple',
          'Le modèle prend trop de temps à s\'entraîner',
          'Le modèle utilise trop de mémoire'
        ],
        correctAnswer: 'Le modèle ne fonctionne que sur les données d\'entraînement',
        points: 10,
        difficulty: 'medium',
        tags: ['overfitting', 'généralisation'],
        explanation: 'Le overfitting se produit quand le modèle mémorise les données d\'entraînement mais ne généralise pas.',
        hints: ['Le modèle "apprend par coeur" au lieu de généraliser']
      },
      {
        id: 'sup-5',
        type: 'fill-blank',
        question: 'Les trois principales métriques d\'évaluation en classification binaire sont : _____, _____ et _____.',
        correctAnswer: ['précision', 'rappel', 'F1-score'],
        points: 15,
        difficulty: 'medium',
        tags: ['métriques', 'évaluation'],
        explanation: 'Précision (precision), rappel (recall) et F1-score sont les métriques de base pour la classification.',
        hints: ['Métriques basées sur les vrais/faux positifs/négatifs']
      }
    ]
  }
];

// Export de tous les quiz
export const allQuizzes = {
  'programmation-fondamentale': programmationFondamentaleQuizzes,
  'statistiques-pour-ia': statistiquesIAQuizzes,
  'apprentissage-supervise': apprentissageSuperviseQuizzes,
};

export function getQuizzesForCourse(courseId: string): QuizConfig[] {
  return allQuizzes[courseId as keyof typeof allQuizzes] || [];
}

export function getQuizById(quizId: string): QuizConfig | undefined {
  for (const courseQuizzes of Object.values(allQuizzes)) {
    const quiz = courseQuizzes.find(q => q.id === quizId);
    if (quiz) return quiz;
  }
  return undefined;
}