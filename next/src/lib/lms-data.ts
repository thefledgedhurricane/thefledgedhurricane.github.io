// Front-end only LMS demo data and types

export type QuizOption = {
  id: string;
  text: string;
};

export type QuizQuestion = {
  id: string;
  question: string;
  options: QuizOption[];
  correctOptionId: string;
  explanation?: string;
};

export type Lesson = {
  id: string; // slug-friendly
  title: string;
  durationMinutes?: number;
  // For simplicity, lesson content is trusted HTML; it's local/static in the repo.
  // In a real app, prefer a markdown renderer and sanitize.
  html: string;
  quiz?: QuizQuestion[];
  passThreshold?: number; // seuil de passage spécifique à cette leçon (pour déverrouiller la suivante)
};

export type Course = {
  id: string; // slug
  title: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  category?: string;
  description: string;
  estimatedHours?: number;
  prerequisites?: string[];
  passThreshold?: number; // seuil par défaut pour le cours
  lessons: Lesson[];
};

export const courses: Course[] = [
  {
    id: 'intro-ia',
    title: "Introduction à l'Intelligence Artificielle",
    level: 'beginner',
    category: 'IA',
    description:
      "Découvrez les bases de l'IA: historique, types d'approches, problématiques clés et cas d'usage.",
    estimatedHours: 6,
    prerequisites: [],
    lessons: [
      {
        id: 'fondamentaux',
        title: 'Fondamentaux et histoire',
        durationMinutes: 25,
        html:
          '<h2 class="text-2xl font-semibold mb-4">Fondamentaux</h2>' +
          '<p class="mb-4">L\'IA vise à créer des systèmes capables d\'effectuer des tâches requérant normalement l\'intelligence humaine.</p>' +
          '<ul class="list-disc pl-6 mb-4"><li>Symbolique vs. Apprentissage</li><li>Supervisé, non supervisé, renforcement</li><li>Applications réelles</li></ul>' +
          '<div class="p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">' +
          '<strong>Note:</strong> Cette leçon est 100% front-end, les progrès sont enregistrés dans votre navigateur.</div>',
        quiz: [
          {
            id: 'q1',
            question: "Quel est l'objectif principal de l'IA ?",
            options: [
              { id: 'a', text: "Imiter des comportements humains intelligents" },
              { id: 'b', text: 'Remplacer tous les humains' },
              { id: 'c', text: 'Créer des virus informatiques' },
            ],
            correctOptionId: 'a',
            explanation: "L'IA vise à résoudre des tâches cognitives via des techniques algorithmiques.",
          },
        ],
      },
      {
        id: 'types-ml',
        title: "Types d'apprentissage",
        durationMinutes: 30,
        html:
          '<h2 class="text-2xl font-semibold mb-4">Supervisé / Non supervisé / Renforcement</h2>' +
          '<p class="mb-4">Chaque paradigme répond à des besoins distincts et s\'appuie sur des données différemment.</p>' +
          '<ul class="list-disc pl-6 mb-4">' +
          '<li><strong>Supervisé</strong>: entrainement avec des <em>labels</em>. Ex: régression de prix, classification spam.</li>' +
          '<li><strong>Non supervisé</strong>: pas de labels; découverte de structure. Ex: clustering clientèles, réduction de dimension.</li>' +
          '<li><strong>Renforcement</strong>: agent qui apprend par essai/erreur via récompenses. Ex: contrôle, jeux.</li>' +
          '</ul>' +
          '<div class="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded">' +
          'Choix du paradigme = nature des données + objectif métier (prédire, segmenter, agir).</div>',
        quiz: [
          {
            id: 'q1',
            question: 'Le clustering est typiquement...',
            options: [
              { id: 'a', text: 'Un apprentissage supervisé' },
              { id: 'b', text: 'Un apprentissage non supervisé' },
              { id: 'c', text: 'Un apprentissage par renforcement' },
            ],
            correctOptionId: 'b',
          },
        ],
      },
      {
        id: 'cas-usage',
        title: "Cas d'usage",
        durationMinutes: 20,
        html:
          '<h2 class="text-2xl font-semibold mb-4">Applications</h2>' +
          '<ul class="list-disc pl-6 mb-4">' +
          '<li><strong>Santé</strong>: triage, imagerie, aide au diagnostic.</li>' +
          '<li><strong>Industrie</strong>: maintenance prédictive, contrôle qualité visuel.</li>' +
          '<li><strong>Finance</strong>: scoring, détection de fraude, market making.</li>' +
          '<li><strong>Langage</strong>: assistants, résumé, RAG, traduction.</li>' +
          '<li><strong>Vision</strong>: détection, suivi, SLAM.</li>' +
          '</ul>' +
          '<div class="p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded">' +
          'Clés de succès: qualité des données, métriques adaptées, déploiement fiable, monitoring.</div>',
      },
    ],
  },
  {
    id: 'statistiques-pour-ia',
    title: 'Statistiques pour l’IA',
    level: 'beginner',
    category: 'Maths',
    description:
      'Bases indispensables: variables, statistiques descriptives, probabilités, distributions et inférence.',
    estimatedHours: 10,
    prerequisites: ['Algèbre linéaire (bases)'],
    lessons: [
      {
        id: 'variables-et-echantillons',
        title: 'Variables, échantillons et population',
        durationMinutes: 30,
        html:
          '<h2 class="text-2xl font-semibold mb-4">Variables et jeux de données</h2>' +
          '<p class="mb-4">Une <strong>population</strong> est l\'ensemble complet des observations potentielles; un <strong>échantillon</strong> est un sous-ensemble observé. On note souvent un jeu de n observations x₁, …, xₙ.</p>' +
          '<h3 class="text-xl font-semibold mt-6 mb-2">Types de variables</h3>' +
          '<ul class="list-disc pl-6 mb-4"><li><em>Quantitatives</em> (continues/discrètes): mesure numérique (ex: taille, salaire).</li><li><em>Qualitatives</em> (catégorielles): étiquettes/classes (ex: couleur, ville).</li></ul>' +
          '<h3 class="text-xl font-semibold mt-6 mb-2">Échantillonnage</h3>' +
          '<p class="mb-4">Aléatoire simple, stratifié, systématique. <strong>Biais d\'échantillonnage</strong>: lorsque l\'échantillon n\'est pas représentatif (ex: auto-sélection).</p>' +
          '<div class="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded mb-4">' +
          '<strong>Rappel biais/variance:</strong> Le biais mesure l\'écart moyen entre l\'estimation et la vraie valeur; la variance mesure la variabilité des estimations entre échantillons.</div>' +
          '<img src="/lms/descriptive.svg" alt="Statistiques descriptives" class="my-4 max-w-full" />' +
          '<h3 class="text-xl font-semibold mt-6 mb-2">Notation</h3>' +
          '<ul class="list-disc pl-6"><li>\'\'n\'\': taille de l\'échantillon.</li><li>\'\'x̄\'\' (moyenne empirique) et \"s²\" (variance empirique).</li></ul>',
        quiz: [
          {
            id: 'q1',
            question: 'Quelle affirmation est vraie ?',
            options: [
              { id: 'a', text: 'Une population est toujours plus petite que l\'échantillon' },
              { id: 'b', text: 'Un échantillon est un sous-ensemble de la population' },
              { id: 'c', text: 'Les variables qualitatives sont numériques' },
            ],
            correctOptionId: 'b',
            explanation: 'Un échantillon est extrait de la population pour estimer des paramètres.',
          },
          {
            id: 'q2',
            question: 'Quel risque entraîne un biais d\'échantillonnage ?',
            options: [
              { id: 'a', text: 'Des estimations non représentatives' },
              { id: 'b', text: 'Une variance toujours nulle' },
              { id: 'c', text: 'Une taille d\'échantillon infinie' },
            ],
            correctOptionId: 'a',
            explanation: 'Le biais conduit à des conclusions trompeuses sur la population.',
          },
        ],
      },
      {
        id: 'statistiques-descriptives',
        title: 'Statistiques descriptives',
        durationMinutes: 35,
        html:
          '<h2 class="text-2xl font-semibold mb-4">Moyenne, médiane, variance, écart-type</h2>' +
          '<p class="mb-4"><strong>Moyenne</strong> x̄ = (1/n) Σ xᵢ. <strong>Variance</strong> s² = (1/n) Σ (xᵢ - x̄)². <strong>Écart-type</strong> s = √s².</p>' +
          '<h3 class="text-xl font-semibold mt-6 mb-2">Exemple numérique</h3>' +
          '<pre class="bg-gray-900 text-gray-100 p-4 rounded overflow-auto">Données: 2, 3, 9, 10\nMoyenne: (2+3+9+10)/4 = 6\nVariance: [(2-6)²+(3-6)²+(9-6)²+(10-6)²]/4 = (16+9+9+16)/4 = 12.5\nÉcart-type: √12.5 ≈ 3.54</pre>' +
          '<img src="/lms/distribution.svg" alt="Distribution gaussienne" class="my-4 max-w-full" />' +
          '<div class="p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded">' +
          '<strong>Astuce:</strong> En présence d\'outliers, la <em>médiane</em> est plus robuste que la moyenne; l\'écart absolu médian (MAD) peut compléter l\'écart-type.' +
          '</div>',
        quiz: [
          {
            id: 'q1',
            question: 'La médiane est souvent préférée à la moyenne quand…',
            options: [
              { id: 'a', text: 'La distribution est symétrique' },
              { id: 'b', text: 'La distribution contient des outliers' },
              { id: 'c', text: 'La variance est nulle' },
            ],
            correctOptionId: 'b',
          },
          {
            id: 'q2',
            question: 'La variance mesure…',
            options: [
              { id: 'a', text: 'Le biais du modèle' },
              { id: 'b', text: 'La dispersion autour de la moyenne' },
              { id: 'c', text: 'Le niveau de bruit des capteurs uniquement' },
            ],
            correctOptionId: 'b',
          },
        ],
      },
      {
        id: 'probabilites',
        title: 'Probabilités (rappels)',
        durationMinutes: 40,
        html:
          '<h2 class="text-2xl font-semibold mb-4">Probabilités et Bayes</h2>' +
          '<p class="mb-4">Le théorème de Bayes relie les probabilités inverses: P(A|B) = P(B|A)·P(A) / P(B). Il permet la mise à jour des croyances via l\'évidence.</p>' +
          '<h3 class="text-xl font-semibold mt-6 mb-2">Indépendance</h3>' +
          '<p class="mb-4">A et B sont indépendants si P(A∩B) = P(A)P(B). Conditionnelle: P(A|C) et P(B|C) indépendants si P(A∩B|C)=P(A|C)P(B|C).</p>' +
          '<h3 class="text-xl font-semibold mt-6 mb-2">Exemple médical</h3>' +
          '<pre class="bg-gray-900 text-gray-100 p-4 rounded overflow-auto">Prévalence P(Maladie)=1%\nSensibilité P(+) | Maladie = 99%\nSpécificité P(-) | Pas de maladie = 95%\nP(+) = 0.99*0.01 + 0.05*0.99 = 0.0594\nP(Maladie|+) = 0.99*0.01 / 0.0594 ≈ 16.7%</pre>' +
          '<img src="/lms/bayes.svg" alt="Théorème de Bayes" class="my-4 max-w-full" />',
        quiz: [
          {
            id: 'q1',
            question: 'Quelle formule correspond au théorème de Bayes ?',
            options: [
              { id: 'a', text: 'P(A∩B) = P(A)+P(B)' },
              { id: 'b', text: 'P(A|B) = P(B|A)P(A)/P(B)' },
              { id: 'c', text: 'P(A|B) = P(A)/P(B|A)' },
            ],
            correctOptionId: 'b',
          },
          {
            id: 'q2',
            question: 'Si A et B sont indépendants, alors…',
            options: [
              { id: 'a', text: 'P(A∩B) = P(A)P(B)' },
              { id: 'b', text: 'P(A|B) = 0' },
              { id: 'c', text: 'P(B|A) = 1' },
            ],
            correctOptionId: 'a',
          },
        ],
      },
      {
        id: 'distributions',
        title: 'Distributions usuelles',
        durationMinutes: 35,
        html:
          '<h2 class="text-2xl font-semibold mb-4">Bernoulli, Binomiale, Normale</h2>' +
          '<ul class="list-disc pl-6 mb-4"><li><strong>Bernoulli(p)</strong>: succès (1) ou échec (0) avec P(1)=p.</li><li><strong>Binomiale(n,p)</strong>: somme de n Bernoulli; moyenne np, variance np(1-p).</li><li><strong>Normale(μ,σ²)</strong>: distribution continue en cloche; ~centrale en statistique.</li></ul>' +
          '<img src="/lms/gaussian.svg" alt="Courbe en cloche" class="my-4 max-w-full" />' +
          '<div class="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded">' +
          'Le <em>théorème central limite</em> justifie l\'apparition fréquente de la normale: la somme de variables indépendantes tend vers une normale.</div>',
        quiz: [
          {
            id: 'q1',
            question: 'Quelle distribution modélise un succès/échec unique ?',
            options: [
              { id: 'a', text: 'Bernoulli' },
              { id: 'b', text: 'Normale' },
              { id: 'c', text: 'Exponentielle' },
            ],
            correctOptionId: 'a',
          },
          {
            id: 'q2',
            question: 'La moyenne et variance d\'une Binomiale(n,p) sont…',
            options: [
              { id: 'a', text: 'n, p' },
              { id: 'b', text: 'np, np(1-p)' },
              { id: 'c', text: 'p, 1-p' },
            ],
            correctOptionId: 'b',
          },
        ],
      },
      {
        id: 'metriques-evaluation',
        title: 'Mesures et évaluation',
        durationMinutes: 30,
        html:
          '<h2 class="text-2xl font-semibold mb-4">Précision, rappel, F1, AUC</h2>' +
          '<img src="/lms/confusion-matrix.svg" alt="Matrice de confusion" class="my-4 max-w-full" />' +
          '<img src="/lms/roc-pr.svg" alt="Courbes ROC et PR" class="my-4 max-w-full" />' +
          '<p class="mb-4"><strong>Précision</strong> = TP/(TP+FP), <strong>Rappel</strong> = TP/(TP+FN), <strong>F1</strong> = 2·(Précision·Rappel)/(Précision+Rappel).</p>' +
          '<p class="mb-4">La <strong>courbe ROC</strong> trace TPR vs. FPR en fonction du seuil; l\'AUC mesure la performance globale. En cas de classes déséquilibrées, privilégier PR-AUC.</p>' +
          '<div class="p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded">' +
          'Choisir la métrique selon le contexte métier: coût des FP vs. FN, déséquilibre, calibrage des probabilités.</div>',
        quiz: [
          {
            id: 'q1',
            question: 'La F1 est la...',
            options: [
              { id: 'a', text: 'Somme du rappel et de la précision' },
              { id: 'b', text: 'Moyenne géométrique du rappel et de la précision' },
              { id: 'c', text: 'Moyenne harmonique du rappel et de la précision' },
            ],
            correctOptionId: 'c',
          },
          {
            id: 'q2',
            question: 'Dans un fort déséquilibre de classes, on préfère souvent…',
            options: [
              { id: 'a', text: 'L\'accuracy' },
              { id: 'b', text: 'La PR-AUC' },
              { id: 'c', text: 'Le RMSE' },
            ],
            correctOptionId: 'b',
          },
        ],
      },
    ],
  },
  {
    id: 'apprentissage-supervise',
    title: 'Apprentissage supervisé',
    level: 'intermediate',
    category: 'ML',
    description:
      'Régression, classification, régularisation et optimisation pour problèmes supervisés.',
    estimatedHours: 12,
    prerequisites: ['Statistiques pour l’IA'],
    lessons: [
      {
        id: 'regression-lineaire',
        title: 'Régression linéaire et descente de gradient',
        durationMinutes: 45,
        html:
          '<h2 class="text-2xl font-semibold mb-4">Régression linéaire</h2>' +
          '<p class="mb-4">Modèle: ŷ = wᵀx + b. <strong>Coût MSE</strong>: J(w,b) = (1/n) Σ (ŷᵢ - yᵢ)².</p>' +
          '<h3 class="text-xl font-semibold mt-6 mb-2">Dérivation du gradient</h3>' +
          '<pre class="bg-gray-900 text-gray-100 p-4 rounded overflow-auto">∂J/∂w = (2/n) Σ (ŷᵢ - yᵢ) xᵢ\n∂J/∂b = (2/n) Σ (ŷᵢ - yᵢ)</pre>' +
          '<p class="mb-4"><strong>Descente de gradient</strong>: w ← w - α ∂J/∂w, b ← b - α ∂J/∂b. Normaliser les features accélère la convergence.</p>' +
          '<img src="/lms/gradient-descent.svg" alt="Descente de gradient" class="my-4 max-w-full" />' +
          '<div class="not-prose"><div data-demo="regression"></div></div>' +
          '<div class="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded">' +
          'Choisir α (taux d\'apprentissage) avec soin: trop grand → divergence; trop petit → lenteur.</div>',
        quiz: [
          {
            id: 'q1',
            question: 'Quel énoncé est correct ?',
            options: [
              { id: 'a', text: 'Un taux d\'apprentissage trop grand peut diverger' },
              { id: 'b', text: 'La MSE est toujours convexes en tous modèles' },
              { id: 'c', text: 'La normalisation n\'impacte jamais la convergence' },
            ],
            correctOptionId: 'a',
          },
          {
            id: 'q2',
            question: 'Le gradient ∂J/∂w pour la régression linéaire vaut…',
            options: [
              { id: 'a', text: '(1/n) Σ (ŷᵢ - yᵢ)²' },
              { id: 'b', text: '(2/n) Σ (ŷᵢ - yᵢ) xᵢ' },
              { id: 'c', text: '(2/n) Σ xᵢ²' },
            ],
            correctOptionId: 'b',
          },
        ],
      },
      {
        id: 'classification',
        title: 'Classification (logistique, SVM, arbres)',
        durationMinutes: 50,
        html:
          '<h2 class="text-2xl font-semibold mb-4">Régression logistique</h2>' +
          '<p class="mb-4">P(y=1|x) = σ(wᵀx+b) où σ(z)=1/(1+e^{-z}); <em>log-odds</em> = log(p/(1-p)) = wᵀx+b.</p>' +
          '<h3 class="text-xl font-semibold mt-6 mb-2">SVM linéaire</h3>' +
          '<p class="mb-4">Maximise la marge; perte hinge max(0, 1 - y·(wᵀx)). Regularisation L2 courante.</p>' +
          '<h3 class="text-xl font-semibold mt-6 mb-2">Arbres et forêts</h3>' +
          '<p class="mb-4">Critères: Gini, entropie. Ensemble: Random Forest (bagging), gradient boosting.</p>',
        quiz: [
          { id: 'q1', question: 'Un SVM linéaire maximise…', options: [
              { id: 'a', text: 'La marge entre classes' },
              { id: 'b', text: 'Le nombre de features' },
              { id: 'c', text: 'La profondeur de l\'arbre' },
            ], correctOptionId: 'a' },
          { id: 'q2', question: 'La fonction σ de la logistique vaut…', options: [
               { id: 'a', text: '1/(1+e^{-z})' },
               { id: 'b', text: 'max(0,z)' },
               { id: 'c', text: 'tanh(z)' },
            ], correctOptionId: 'a' },
        ],
      },
      {
        id: 'regularisation',
        title: 'Régularisation (L1/L2) et validation croisée',
        durationMinutes: 35,
        html:
          '<h2 class="text-2xl font-semibold mb-4">Régularisation L1/L2</h2>' +
          '<p class="mb-4"><strong>L2</strong> (Ridge) pénalise la norme \u2225w\u2225² et stabilise l\'entraînement; <strong>L1</strong> (Lasso) favorise la <em>parcimonie</em> (coefficients à zéro).</p>' +
          '<pre class="bg-gray-900 text-gray-100 p-4 rounded overflow-auto">J(w) = MSE + λ \u2225w\u2225² (Ridge)\nJ(w) = MSE + λ \u2225w\u2225₁ (Lasso)</pre>' +
          '<h3 class="text-xl font-semibold mt-6 mb-2">Validation croisée k-fold</h3>' +
          '<p class="mb-4">Découper les données en k blocs: à chaque itération, 1 fold pour la validation, k-1 pour l\'entrainement. Moyenner les scores pour choisir λ, C, etc.</p>' +
          '<img src="/lms/kfold.svg" alt="k-fold" class="my-4 max-w-full" />' +
          '<div class="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded">' +
          'Stratifier les folds en classification pour conserver les proportions de classes; utiliser un <em>hold-out</em> final pour estimer la performance.</div>',
        quiz: [
          { id: 'q1', question: 'La régularisation L1 tend à…', options: [
              { id: 'a', text: 'Réduire tous les poids de façon uniforme sans en annuler' },
              { id: 'b', text: 'Induire de la parcimonie (poids nuls)' },
              { id: 'c', text: 'Augmenter la variance' },
            ], correctOptionId: 'b' },
          { id: 'q2', question: 'La validation croisée k-fold sert à…', options: [
              { id: 'a', text: 'Accélérer le GPU' },
              { id: 'b', text: 'Ajuster et évaluer des hyperparamètres' },
              { id: 'c', text: 'Augmenter la taille du dataset' },
            ], correctOptionId: 'b' },
        ],
      },
    ],
  },
  {
    id: 'apprentissage-non-supervise',
    title: 'Apprentissage non supervisé',
    level: 'intermediate',
    category: 'ML',
    description: 'Clustering, réduction de dimension et méthodes de densité.',
    estimatedHours: 8,
    prerequisites: ['Statistiques pour l’IA'],
    lessons: [
      {
        id: 'clustering',
        title: 'Clustering (k-means, DBSCAN)',
        durationMinutes: 40,
        html:
          '<h2 class="text-2xl font-semibold mb-4">k-means</h2>' +
          '<p class="mb-4">Objectif: minimiser la <em>somme des distances intra-clusters</em>. Algorithme: (1) init des centres, (2) assignation des points au centre le plus proche, (3) recalcul des centres (moyenne), (4) répéter jusqu\'à convergence.</p>' +
          '<pre class="bg-gray-900 text-gray-100 p-4 rounded overflow-auto">Critère J = Σ_k Σ_{x∈C_k} \|x - μ_k\|²</pre>' +
          '<div class="not-prose"><div data-demo="kmeans"></div></div>' +
          '<h3 class="text-xl font-semibold mt-6 mb-2">DBSCAN</h3>' +
          '<p class="mb-4">Méthode par densité: deux hyperparamètres <code>eps</code> (rayon) et <code>minPts</code>. Découvre des formes arbitraires et marque le bruit; n\'exige pas k.</p>' +
          '<div class="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded">' +
          'k-means est sensible aux outliers et suppose des clusters sphériques de taille comparable; DBSCAN est sensible au choix de eps/minPts.</div>',
        quiz: [
          { id: 'q1', question: 'DBSCAN nécessite…', options: [
              { id: 'a', text: 'Le nombre de clusters k' },
              { id: 'b', text: 'Des hyperparamètres eps et minPts' },
              { id: 'c', text: 'Des labels' },
            ], correctOptionId: 'b' },
          { id: 'q2', question: 'Le critère optimisé par k-means est…', options: [
              { id: 'a', text: 'La somme des distances intra-clusters' },
              { id: 'b', text: 'La probabilité a posteriori' },
              { id: 'c', text: 'L\'AUC ROC' },
            ], correctOptionId: 'a' },
        ],
      },
      {
        id: 'reduction-dimension',
        title: 'Réduction de dimension (PCA, t-SNE, UMAP)',
        durationMinutes: 35,
        html:
          '<h2 class="text-2xl font-semibold mb-4">PCA (Analyse en composantes principales)</h2>' +
          '<p class="mb-4">PCA projette les données sur des axes (vecteurs propres) maximisant la variance. Étapes: centrer X, calculer la covariance S = (1/n) XᵀX, diagonaliser S = VΛVᵀ, garder les premiers vecteurs propres (cols de V).</p>' +
          '<img src="/lms/pca.svg" alt="PCA" class="my-4 max-w-full" />' +
          '<h3 class="text-xl font-semibold mt-6 mb-2">t-SNE / UMAP</h3>' +
          '<p class="mb-4">t-SNE préserve les voisinages locaux via des probabilités symétrisées et minimise la divergence KL; UMAP repose sur une théorie topologique (simplicial sets) pour une structure globale plus stable.</p>' +
          '<img src="/lms/tsne.svg" alt="t-SNE" class="my-4 max-w-full" />' +
          '<div class="p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded">' +
          'PCA est linéaire et interprétable; t-SNE/UMAP sont non-linéaires et surtout utiles pour la visualisation (attention aux hyperparamètres).</div>',
        quiz: [
          {
            id: 'q1',
            question: 'La première composante principale (PC1) maximise…',
            options: [
              { id: 'a', text: 'La variance projetée' },
              { id: 'b', text: 'La corrélation avec y' },
              { id: 'c', text: 'Le nombre de clusters' },
            ],
            correctOptionId: 'a',
          },
          {
            id: 'q2',
            question: 't-SNE est surtout utilisé pour…',
            options: [
              { id: 'a', text: 'La réduction linéaire de dimension' },
              { id: 'b', text: 'La visualisation 2D/3D de voisinages' },
              { id: 'c', text: 'La classification supervisée' },
            ],
            correctOptionId: 'b',
          },
        ],
      },
    ],
  },
  {
    id: 'deep-learning',
    title: 'Réseaux de neurones profonds',
    level: 'advanced',
    category: 'DL',
    description: 'Perceptrons, CNN, RNN/LSTM et Transformers.',
    estimatedHours: 14,
  passThreshold: 80,
    prerequisites: ['Apprentissage supervisé'],
    lessons: [
      {
        id: 'perceptrons',
        title: 'Perceptron, MLP et backpropagation',
        durationMinutes: 45,
        html:
          '<h2 class="text-2xl font-semibold mb-4">MLP et backpropagation</h2>' +
          '<p class="mb-4">Un MLP compose des couches linéaires et non-linéaires: a^{(l)} = σ(W^{(l)} a^{(l-1)} + b^{(l)}). La <strong>backpropagation</strong> calcule efficacement les gradients via la règle de la chaîne.</p>' +
          '<pre class="bg-gray-900 text-gray-100 p-4 rounded overflow-auto">δ^{(L)} = ∇_a L ⊙ σ\'(z^{(L)})\nδ^{(l)} = (W^{(l+1)})^T δ^{(l+1)} ⊙ σ\'(z^{(l)})\n∂L/∂W^{(l)} = δ^{(l)} (a^{(l-1)})^T</pre>' +
          '<div class="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded mb-4">' +
          'Choix d\'activation: ReLU (rapide, simple), GELU (transformers), tanh/sigmoïde (vanishing gradient). Initialisation He/Xavier adaptée à l\'activation.</div>' +
          '<p class="mb-4">Régularisation: dropout, L2, early stopping. Normalisation: BatchNorm/LayerNorm pour stabiliser l\'entraînement.</p>',
        quiz: [
          { id: 'q1', question: 'La rétropropagation repose sur…', options: [
              { id: 'a', text: 'La règle de la chaîne' },
              { id: 'b', text: 'La méthode de Newton explicite' },
              { id: 'c', text: 'Une recherche exhaustive' },
            ], correctOptionId: 'a' },
          { id: 'q2', question: 'Quelle activation réduit le risque de vanishing gradient ?', options: [
              { id: 'a', text: 'Sigmoïde pure' },
              { id: 'b', text: 'ReLU' },
              { id: 'c', text: 'Aucune, toutes équivalentes' },
            ], correctOptionId: 'b' },
        ],
      },
      {
        id: 'cnn',
        title: 'CNN: convolution et pooling',
        durationMinutes: 40,
        html:
          '<p class="mb-4">Convolutions, kernels, padding, stride; pooling max/avg.</p>' +
          '<img src="/lms/cnn.svg" alt="CNN" class="my-4 max-w-full" />',
        quiz: [
          { id: 'q1', question: 'Le pooling…', options: [
              { id: 'a', text: 'Augmente la résolution spatiale' },
              { id: 'b', text: 'Réduit la dimension spatiale' },
              { id: 'c', text: 'Équivaut à une convolution' },
            ], correctOptionId: 'b' },
        ],
      },
      {
        id: 'rnn-transformers',
        title: 'RNN/LSTM et Transformers',
        durationMinutes: 50,
        html:
          '<h2 class="text-2xl font-semibold mb-4">Du RNN aux Transformers</h2>' +
          '<p class="mb-4">Les RNN (LSTM/GRU) traitent les séquences mais souffrent de dépendances longues. Les <strong>Transformers</strong> utilisent l\'auto-attention pour modéliser les relations globales sans récurrence.</p>' +
          '<img src="/lms/rnn.svg" alt="RNN" class="my-4 max-w-full" />' +
          '<h3 class="text-xl font-semibold mt-6 mb-2">Attention (scaled dot-product)</h3>' +
          '<pre class="bg-gray-900 text-gray-100 p-4 rounded overflow-auto">Attention(Q,K,V) = softmax( QK^T / \sqrt{d_k} ) V</pre>' +
          '<img src="/lms/attention.svg" alt="Attention" class="my-4 max-w-full" />' +
          '<p class="mb-4">Encodages positionnels (sin/cos) injectent l\'ordre séquentiel.</p>' +
          '<img src="/lms/positional.svg" alt="Encodages positionnels" class="my-4 max-w-full" />',
        quiz: [
          { id: 'q1', question: 'Quelle formule correspond à l\'attention scaled dot-product ?', options: [
              { id: 'a', text: 'softmax(QK^T/\n√d_k) V' },
              { id: 'b', text: 'σ(Wx+b)' },
              { id: 'c', text: 'softmax(VK^T/\n√d_k) Q' },
            ], correctOptionId: 'a' },
          { id: 'q2', question: 'Le principal avantage des Transformers vs RNN ?', options: [
              { id: 'a', text: 'Moins de mémoire' },
              { id: 'b', text: 'Parallélisation du calcul sur les séquences' },
              { id: 'c', text: 'Toujours meilleur échantillon par échantillon' },
            ], correctOptionId: 'b' },
        ],
      },
    ],
  },
  {
    id: 'recherche-et-planification',
    title: 'Recherche et planification (A*, heuristiques)',
    level: 'intermediate',
    category: 'IA classique',
    description: 'Graphes d\'états, heuristiques admissibles/consistantes, A* et variantes.',
    estimatedHours: 8,
    prerequisites: ['Théorie des graphes (bases)'],
    lessons: [
      {
        id: 'heuristiques',
        title: 'Heuristiques: admissibilité et consistance',
        durationMinutes: 35,
        html:
          '<h2 class="text-2xl font-semibold mb-4">Heuristiques</h2>' +
          '<p class="mb-4"><strong>Admissible</strong>: h(n) ≤ h*(n) (coût réel optimal). <strong>Consistante</strong>: h(n) ≤ c(n,n\') + h(n\').</p>' +
          '<h3 class="text-xl font-semibold mt-6 mb-2">Exemples</h3>' +
          '<ul class="list-disc pl-6 mb-4"><li>Grille 4-dir: <em>Manhattan</em> est admissible et consistante.</li><li>Espace euclidien: distance euclidienne.</li></ul>' +
          '<div class="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded">' +
          'Une heuristique consistante implique une admissibilité et garantit f(n) non décroissante le long d\'un chemin.</div>',
        quiz: [
          { id: 'q1', question: 'Une heuristique admissible…', options: [
              { id: 'a', text: 'Peut surestimer parfois' },
              { id: 'b', text: 'Ne surestime jamais' },
              { id: 'c', text: 'Est identique au coût réel' },
            ], correctOptionId: 'b', explanation: 'Admissible = borne inférieure sur le coût optimal.' },
          { id: 'q2', question: 'La consistance impose…', options: [
               { id: 'a', text: 'h(n) ≥ h*(n)' },
               { id: 'b', text: 'h(n) ≤ c(n,n\') + h(n\')' },
               { id: 'c', text: 'f(n)=g(n)-h(n)' },
            ], correctOptionId: 'b' },
        ],
      },
      {
        id: 'a-star',
        title: 'A* : f(n) = g(n) + h(n)',
        durationMinutes: 40,
        html:
          '<h2 class="text-2xl font-semibold mb-4">Principe d\'A*</h2>' +
          '<p class="mb-4">A* explore selon f(n)=g(n)+h(n). Avec h admissible (et de préférence consistante), A* est optimal et plus efficace que Dijkstra.</p>' +
          '<h3 class="text-xl font-semibold mt-6 mb-2">Pseudocode</h3>' +
          '<pre class="bg-gray-900 text-gray-100 p-4 rounded overflow-auto">open ← {start}\nclosed ← ∅\nwhile open non vide:\n  n ← argmin_{x∈open} f(x)\n  si n=goal: reconstruire le chemin\n  déplacer n de open vers closed\n  pour chaque voisin v de n:\n    si v ∈ closed: continuer\n    tentative_g ← g(n) + c(n,v)\n    si v ∉ open ou tentative_g < g(v):\n      parent(v) ← n; g(v) ← tentative_g; f(v) ← g(v)+h(v)\n      si v ∉ open: ajouter v à open</pre>' +
          '<img src="/lms/a-star.svg" alt="A* sur grille" class="my-4 max-w-full" />' +
          '<div class="not-prose"><div data-demo="astar"></div></div>' +
          '<div class="p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded">' +
          'Complexité ~ O(b^d) en pire cas. Une bonne heuristique réduit drastiquement l\'espace exploré.</div>',
        quiz: [
          { id: 'q1', question: 'La fonction d\'évaluation d\'A* est…', options: [
              { id: 'a', text: 'f(n)=h(n)' },
              { id: 'b', text: 'f(n)=g(n)+h(n)' },
              { id: 'c', text: 'f(n)=g(n)-h(n)' },
            ], correctOptionId: 'b' },
          { id: 'q2', question: 'Avec h admissible et consistante, A*…', options: [
               { id: 'a', text: 'n\'est pas complet' },
               { id: 'b', text: 'est optimal' },
               { id: 'c', text: 'équivaut à BFS' },
            ], correctOptionId: 'b' },
        ],
      },
    ],
  },
  {
    id: 'apprentissage-par-renforcement',
    title: 'Apprentissage par renforcement',
    level: 'advanced',
    category: 'RL',
    description: 'MDP, politiques, Q-learning et fonctions de valeur.',
    estimatedHours: 10,
    prerequisites: ['Probabilités (rappels)'],
    lessons: [
      {
        id: 'mdp',
        title: 'Processus de décision markovien (MDP)',
        durationMinutes: 40,
        html:
          '<h2 class="text-2xl font-semibold mb-4">MDP</h2>' +
          '<p class="mb-4">Un MDP est (S, A, P, R, γ). Objectif: maximiser la valeur V^π(s) = E[Σ γ^t r_t]. Bellman optimalité: V*(s) = max_a [ R(s,a) + γ Σ_{s\'} P(s\'|s,a) V*(s\') ].</p>' +
          '<img src="/lms/bellman.svg" alt="Équation de Bellman" class="my-4 max-w-full" />' +
          '<h3 class="text-xl font-semibold mt-6 mb-2">Itération sur la valeur</h3>' +
          '<pre class="bg-gray-900 text-gray-100 p-4 rounded overflow-auto">V_{k+1}(s) ← max_a [ R(s,a) + γ Σ_{s\'} P(s\'|s,a) V_k(s\') ]</pre>' +
          '<img src="/lms/value-iteration.svg" alt="Value Iteration" class="my-4 max-w-full" />',
        quiz: [
          { id: 'q1', question: 'Quelle est la forme de Bellman optimalité pour V* ?', options: [
              { id: 'a', text: 'V*(s) = Σ P(s\'|s) V*(s\')' },
              { id: 'b', text: 'V*(s) = max_a [ R(s,a) + γ Σ P(s\'|s,a) V*(s\') ]' },
              { id: 'c', text: 'V*(s) = R(s)' },
            ], correctOptionId: 'b' },
        ],
      },
      {
        id: 'q-learning',
        title: 'Q-learning et exploration/exploitation',
        durationMinutes: 45,
        html:
          '<p class="mb-4">Mise à jour: Q(s,a) ← Q(s,a) + α[r + γ maxₐ\' Q(s\',a\') − Q(s,a)]. ε-greedy.</p>' +
          '<img src="/lms/q-learning.svg" alt="Q-learning" class="my-4 max-w-full" />',
        quiz: [
          { id: 'q1', question: 'Le paramètre ε contrôle…', options: [
              { id: 'a', text: 'Le taux d\'apprentissage' },
              { id: 'b', text: 'L\'exploration vs. exploitation' },
              { id: 'c', text: 'Le discount' },
            ], correctOptionId: 'b' },
        ],
      },
    ],
  },
  {
    id: 'nlp',
    title: 'Traitement automatique du langage (NLP)',
    level: 'intermediate',
    category: 'NLP',
    description: 'Représentations, modèles séquentiels et Transformers.',
    estimatedHours: 8,
    prerequisites: ['Réseaux de neurones profonds'],
    lessons: [
      {
        id: 'representations',
        title: 'Représentations (word2vec, BPE)',
        durationMinutes: 35,
        html:
          '<h2 class="text-2xl font-semibold mb-4">Embeddings et sous-mots</h2>' +
          '<p class="mb-4"><strong>word2vec</strong>: objectifs CBOW/Skip-gram via softmax négatif ou NCE; vecteurs qui capturent des analogies. <strong>BPE</strong> segmente en sous-unités fréquentes, utile pour OOV et morphologie.</p>' +
          '<pre class="bg-gray-900 text-gray-100 p-4 rounded overflow-auto">Skip-gram: max Σ_t Σ_{c∈C_t} log P(w_c | w_t)\nP(w_c|w_t) = exp(v_{w_c}^T v_{w_t}) / Σ_j exp(v_j^T v_{w_t})</pre>',
        quiz: [
          { id: 'q1', question: 'Le but de word2vec est de…', options: [
              { id: 'a', text: 'Apprendre des vecteurs continus pour les mots' },
              { id: 'b', text: 'Trier des documents' },
              { id: 'c', text: 'Compresser des images' },
            ], correctOptionId: 'a' },
        ],
      },
      {
        id: 'transformers',
        title: 'Transformers et attention',
        durationMinutes: 45,
        html:
          '<h2 class="text-2xl font-semibold mb-4">Transformers</h2>' +
          '<p class="mb-4">Blocs encodeur/décodeur, attention multi-têtes, normalisation (LayerNorm), résidus, MLP positionnel.</p>' +
          '<img src="/lms/attention.svg" alt="Attention" class="my-4 max-w-full" />' +
          '<p class="mb-4">Encodages positionnels sinusoïdaux injectent l\'ordre.</p>' +
          '<img src="/lms/positional.svg" alt="Positionnels" class="my-4 max-w-full" />',
        quiz: [
          { id: 'q1', question: 'Quel module injecte l\'ordre séquentiel ?', options: [
              { id: 'a', text: 'Encodages positionnels' },
              { id: 'b', text: 'Dropout' },
              { id: 'c', text: 'BatchNorm' },
            ], correctOptionId: 'a' },
        ],
      },
    ],
  },
  {
    id: 'vision',
    title: 'Vision par ordinateur',
    level: 'intermediate',
    category: 'CV',
    description: 'Convolutions, détection et segmentation.',
    estimatedHours: 8,
    prerequisites: ['Réseaux de neurones profonds'],
    lessons: [
      {
        id: 'features',
        title: 'Features et convolutions',
        durationMinutes: 35,
        html:
          '<h2 class="text-2xl font-semibold mb-4">Convolutions</h2>' +
          '<p class="mb-4">Un filtre 3×3 appliqué par glissement calcule une somme pondérée locale; les CNN apprennent ces filtres pour détecter bords, textures, motifs.</p>' +
          '<pre class="bg-gray-900 text-gray-100 p-4 rounded overflow-auto">(K * X)[i,j] = Σ_u Σ_v K[u,v] · X[i+u, j+v]</pre>' +
          '<img src="/lms/cnn.svg" alt="Convolution" class="my-4 max-w-full" />',
        quiz: [
          { id: 'q1', question: 'Une convolution 3×3 calcule…', options: [
              { id: 'a', text: 'Une moyenne globale' },
              { id: 'b', text: 'Une combinaison linéaire locale' },
              { id: 'c', text: 'Une FFT complète' },
            ], correctOptionId: 'b' },
        ],
      },
      {
        id: 'detection',
        title: 'Détection/Segmentation',
        durationMinutes: 40,
        html:
          '<h2 class="text-2xl font-semibold mb-4">Détection d\'objets</h2>' +
          '<p class="mb-4">Faster R-CNN (propositions régionales), YOLO (full-convolutionnel one-shot). <strong>IoU</strong> mesure le recouvrement prédiction-vérité; des <em>anchors</em> multi-échelles facilitent la régression de boîtes.</p>' +
          '<img src="/lms/iou.svg" alt="IoU" class="my-4 max-w-full" />' +
          '<img src="/lms/anchors.svg" alt="Anchors" class="my-4 max-w-full" />' +
          '<h3 class="text-xl font-semibold mt-6 mb-2">Segmentation</h3>' +
          '<p class="mb-4">U-Net/DeepLab pour la segmentation sémantique; métriques: IoU moyen, Dice.</p>',
        quiz: [
          { id: 'q1', question: 'L\'IoU mesure…', options: [
              { id: 'a', text: 'Le score de classification' },
              { id: 'b', text: 'Le recouvrement entre boîtes' },
              { id: 'c', text: 'Le temps d\'inférence' },
            ], correctOptionId: 'b' },
        ],
      },
    ],
  },
  {
    id: 'ethique-mlops',
    title: 'Éthique, biais et MLOps',
    level: 'beginner',
    category: 'Pratique',
    description: 'Biais de données, équité, reproductibilité et déploiement.',
    estimatedHours: 6,
    prerequisites: [],
    lessons: [
      {
        id: 'ethique',
        title: 'Biais et équité',
        durationMinutes: 30,
        html:
          '<h2 class="text-2xl font-semibold mb-4">Fairness</h2>' +
          '<p class="mb-4">Mesures: <em>demographic parity</em>, <em>equalized odds</em>, <em>calibration</em>. Les compromis entre ces critères dépendent du contexte.</p>' +
          '<img src="/lms/fairness.svg" alt="Fairness" class="my-4 max-w-full" />' +
          '<div class="p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded">' +
          'Pratiques: audits de biais, documentation des jeux de données (datasheets), évaluation en sous-groupes.</div>',
        quiz: [
          { id: 'q1', question: 'Equalized odds impose…', options: [
              { id: 'a', text: 'Même taux de prédiction positive' },
              { id: 'b', text: 'Même TPR et FPR entre groupes' },
              { id: 'c', text: 'Même distribution des features' },
            ], correctOptionId: 'b' },
        ],
      },
      {
        id: 'mlops',
        title: 'MLOps: du labo à la prod',
        durationMinutes: 40,
        html:
          '<h2 class="text-2xl font-semibold mb-4">Pipeline MLOps</h2>' +
          '<p class="mb-4">Cycle: données → entraînement → évaluation → déploiement → monitoring → gestion de la dérive.</p>' +
          '<img src="/lms/mlops-pipeline.svg" alt="MLOps" class="my-4 max-w-full" />' +
          '<p class="mb-4">Bonnes pratiques: versionnage (DVC/Git), traçabilité (MLflow/W&B), tests, canary/blue-green, alerte sur dérive.</p>',
        quiz: [
          { id: 'q1', question: 'Quel élément est spécifique au monitoring ML ?', options: [
              { id: 'a', text: 'Suivi de la dérive des données' },
              { id: 'b', text: 'Compilation du code' },
              { id: 'c', text: 'Minification des assets' },
            ], correctOptionId: 'a' },
        ],
      },
    ],
  },
  {
    id: 'web-avance',
    title: 'Développement Web Avancé (Front-end only LMS)',
    level: 'intermediate',
    category: 'Web',
    description:
      'Créez une mini-plateforme LMS côté client avec React/Next.js, localStorage et UI moderne.',
    estimatedHours: 8,
    prerequisites: [],
    lessons: [
      {
        id: 'architecture',
        title: 'Architecture front-end',
        durationMinutes: 35,
        html:
          '<h2 class="text-2xl font-semibold mb-4">Architecture</h2>' +
          '<p class="mb-4">Pages Next.js côté app router, composants client pour la logique (localStorage), données statiques.</p>' +
          '<pre class="bg-gray-900 text-gray-100 p-4 rounded">/teaching -> Accueil LMS\n/teaching/[course] -> Détails cours\n/teaching/[course]/lesson/[lesson] -> Leçon</pre>',
      },
      {
        id: 'progress',
        title: 'Gestion de la progression',
        durationMinutes: 25,
        html:
          '<p class="mb-4">Stockage persistant dans le navigateur via localStorage avec une clé versionnée.</p>',
        quiz: [
          {
            id: 'q1',
            question: 'Quel stockage est utilisé ici pour la progression ?',
            options: [
              { id: 'a', text: 'Serveur Node' },
              { id: 'b', text: 'localStorage' },
              { id: 'c', text: 'Base PostgreSQL' },
            ],
            correctOptionId: 'b',
          },
        ],
      },
      {
        id: 'quiz',
        title: 'Quizz interactifs',
        durationMinutes: 30,
        html:
          '<p class="mb-4">Les quiz valident les acquis, calculent un score et peuvent débloquer la leçon suivante.</p>',
      },
    ],
  },
];

export function getCourseById(id: string): Course | undefined {
  return courses.find((c) => c.id === id);
}

export function getLessonById(courseId: string, lessonId: string): { course: Course; lesson: Lesson } | undefined {
  const course = getCourseById(courseId);
  if (!course) return undefined;
  const lesson = course.lessons.find((l) => l.id === lessonId);
  if (!lesson) return undefined;
  return { course, lesson };
}
