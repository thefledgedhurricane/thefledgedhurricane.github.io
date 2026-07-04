'use client';

import React, { ReactNode } from 'react';
import CourseOverview from '@/components/lms/CourseOverview';
import { 
  Section, 
  Paragraph, 
  BulletList, 
  CodeBlock, 
  Callout, 
  SubSection, 
  ExampleBox,
  Highlight,
  InlineCode 
} from '@/components/lesson/LessonContent';

const lessons = [
  { 
    id: 1, 
    title: "Introduction à l'Intelligence Artificielle", 
    duration: "45 min", 
    type: 'text' as const,
    exercises: [
      {
        id: 'ex1-1',
        title: 'Identifier les types d\'IA',
        description: 'Classez les applications suivantes en IA Faible ou IA Forte : \n1. Siri d\'Apple\n2. Un robot humanoïde capable d\'apprendre n\'importe quelle tâche humaine\n3. Système de recommandation Netflix\n4. AlphaGo',
        solution: '1. IA Faible (tâche spécifique : assistant vocal)\n2. IA Forte (intelligence générale - n\'existe pas encore)\n3. IA Faible (recommandations de contenu)\n4. IA Faible (jeu de Go uniquement, même si exceptionnelle)'
      },
      {
        id: 'ex1-2',
        title: 'Hiérarchie IA/ML/DL',
        description: 'Dessinez un diagramme montrant la relation entre Intelligence Artificielle, Machine Learning et Deep Learning. Donnez un exemple pour chaque niveau.',
        solution: 'IA (englobant tout) > Machine Learning (apprentissage à partir de données) > Deep Learning (réseaux de neurones profonds)\nExemples:\n- IA: Chatbot avec règles prédéfinies\n- ML: Filtre anti-spam qui apprend des emails\n- DL: Reconnaissance d\'images avec CNN'
      }
    ],
    quiz: [
      {
        id: 'q1-1',
        question: 'Qu\'est-ce qui différencie l\'IA Faible de l\'IA Forte ?',
        options: [
          'La puissance de calcul nécessaire',
          'L\'IA Faible est spécialisée dans une tâche, l\'IA Forte aurait une intelligence générale',
          'L\'IA Faible utilise des algorithmes simples, l\'IA Forte utilise le Deep Learning',
          'L\'IA Faible est gratuite, l\'IA Forte est payante'
        ],
        correctAnswer: 1,
        explanation: 'L\'IA Faible (ANI) excelle dans un domaine spécifique (échecs, reconnaissance faciale), tandis que l\'IA Forte (AGI) serait capable de résoudre n\'importe quel problème intellectuel comme un humain - elle n\'existe pas encore.'
      },
      {
        id: 'q1-2',
        question: 'Quel facteur N\'a PAS contribué à l\'explosion récente de l\'IA ?',
        options: [
          'La disponibilité massive de données (Big Data)',
          'L\'augmentation de la puissance des GPU',
          'L\'invention d\'Internet',
          'Les avancées algorithmiques (ex: Transformers)'
        ],
        correctAnswer: 2,
        explanation: 'Internet existe depuis les années 1990, bien avant l\'explosion de l\'IA moderne (2010s). Les vrais catalyseurs sont : Big Data, GPU puissants, et nouveaux algorithmes.'
      },
      {
        id: 'q1-3',
        question: 'Le Deep Learning est...',
        options: [
          'Un type de base de données',
          'Un sous-ensemble du Machine Learning utilisant des réseaux de neurones',
          'Un langage de programmation',
          'Une méthode de compression de données'
        ],
        correctAnswer: 1,
        explanation: 'Le Deep Learning est une technique de Machine Learning qui utilise des réseaux de neurones artificiels avec plusieurs couches (d\'où "profond"). C\'est particulièrement efficace pour les images, le son et le texte.'
      }
    ],
    cheatSheet: `📚 AIDE-MÉMOIRE : Introduction à l'IA

🔹 DÉFINITIONS CLÉS
• IA : Systèmes capables d'effectuer des tâches nécessitant l'intelligence humaine
• Machine Learning : L'IA apprend à partir de données (pas de règles explicites)
• Deep Learning : ML avec réseaux de neurones profonds

🔹 TYPES D'IA
• IA Faible (ANI) : Spécialisée dans UNE tâche
  Exemples : Siri, Netflix, AlphaGo
• IA Forte (AGI) : Intelligence générale (n'existe pas encore)

🔹 FACTEURS DE L'EXPLOSION IA
1. Big Data
2. GPU puissants
3. Nouveaux algorithmes (Transformers 2017)

🔹 APPLICATIONS
• Santé : Détection de cancers, AlphaFold
• Transport : Voitures autonomes
• Communication : ChatGPT, traduction
• Création : DALL-E, Midjourney

⚠️ ENJEUX ÉTHIQUES
• Biais algorithmiques
• Vie privée et surveillance
• Impact sur l'emploi
• Responsabilité juridique`,
    content: {
      component: () => (
        <>
          <Section title="Introduction à l'Intelligence Artificielle">
            <Paragraph>
              L'Intelligence Artificielle (IA) est sans doute la technologie la plus transformatrice de notre époque. 
              Mais qu'est-ce que c'est vraiment ?
            </Paragraph>

            <SubSection title="Définition">
              <Paragraph>
                L'IA est la branche de l'informatique dédiée à la création de systèmes capables d'effectuer des tâches 
                qui nécessitent normalement l'intelligence humaine. Ces tâches incluent la perception visuelle, 
                la reconnaissance vocale, la prise de décision et la traduction entre les langues.
              </Paragraph>
            </SubSection>

            <SubSection title="Les Types d'IA">
              <Paragraph>
                On distingue généralement deux grandes catégories d'IA :
              </Paragraph>
              
              <div className="my-6 space-y-6">
                <div>
                  <h4 className="text-lg font-medium text-mckinsey-navy-900 mb-3">
                    1. IA Faible (ANI - Artificial Narrow Intelligence)
                  </h4>
                  <Paragraph>
                    C'est l'IA que nous connaissons aujourd'hui. Elle est conçue pour effectuer une tâche spécifique 
                    de manière excellente, souvent mieux qu'un humain.
                  </Paragraph>
                  <BulletList items={[
                    'Exemples : Les échecs (Deep Blue), la reconnaissance faciale, les recommandations Netflix, Siri/Alexa.',
                    'Limitation : Elle ne peut pas opérer en dehors de son domaine de compétence.'
                  ]} />
                </div>

                <div>
                  <h4 className="text-lg font-medium text-mckinsey-navy-900 mb-3">
                    2. IA Forte (AGI - Artificial General Intelligence)
                  </h4>
                  <Paragraph>
                    C'est une IA hypothétique qui posséderait une intelligence comparable à celle de l'humain. 
                    Elle serait capable de comprendre, d'apprendre et d'appliquer ses connaissances à une grande variété de problèmes.
                  </Paragraph>
                  <BulletList items={[
                    'Statut : N\'existe pas encore (c\'est le "Saint Graal" de la recherche).'
                  ]} />
                </div>
              </div>
            </SubSection>

            <SubSection title="Machine Learning vs Deep Learning">
              <Paragraph>
                Il est crucial de comprendre la hiérarchie de ces termes :
              </Paragraph>
              <BulletList items={[
                'Intelligence Artificielle : Le grand domaine englobant.',
                'Machine Learning (Apprentissage Automatique) : Un sous-ensemble de l\'IA. Au lieu de programmer explicitement les règles ("si X alors Y"), on donne des données à la machine et elle apprend les règles elle-même.',
                'Deep Learning (Apprentissage Profond) : Un sous-ensemble du Machine Learning inspiré par la structure du cerveau humain (réseaux de neurones). Il est particulièrement puissant pour traiter des données non structurées comme les images, le son et le texte.'
              ]} />
            </SubSection>

            <SubSection title="Pourquoi maintenant ?">
              <Paragraph>
                Trois facteurs ont permis l'explosion récente de l'IA :
              </Paragraph>
              <BulletList items={[
                'Big Data : Nous générons des quantités massives de données pour entraîner les modèles.',
                'Puissance de Calcul (GPU) : Les cartes graphiques permettent de faire les calculs matriciels nécessaires au Deep Learning très rapidement.',
                'Algorithmes : Des avancées majeures (comme les Transformers en 2017) ont débloqué de nouvelles capacités.'
              ]} />
            </SubSection>

            <SubSection title="Applications Concrètes de l'IA Aujourd'hui">
              <Paragraph>
                L'IA est déjà partout dans votre quotidien, même si vous ne la voyez pas toujours :
              </Paragraph>
              
              <div className="my-6 space-y-4">
                <div className="bg-mckinsey-teal-50 p-4 rounded-lg">
                  <h5 className="font-semibold text-mckinsey-navy-900 mb-2">🏥 Santé</h5>
                  <Paragraph>
                    Les IA peuvent détecter des cancers sur des radiographies avec une précision supérieure à celle des médecins humains. 
                    L'algorithme AlphaFold de DeepMind a résolu le problème du repliement des protéines, ouvrant la voie à de nouveaux médicaments.
                  </Paragraph>
                </div>

                <div className="bg-mckinsey-teal-50 p-4 rounded-lg">
                  <h5 className="font-semibold text-mckinsey-navy-900 mb-2">🚗 Transport</h5>
                  <Paragraph>
                    Les voitures autonomes de Tesla, Waymo utilisent des réseaux de neurones pour percevoir leur environnement et prendre des décisions en temps réel.
                  </Paragraph>
                </div>

                <div className="bg-mckinsey-teal-50 p-4 rounded-lg">
                  <h5 className="font-semibold text-mckinsey-navy-900 mb-2">💬 Communication</h5>
                  <Paragraph>
                    ChatGPT, Claude et autres LLMs (Large Language Models) peuvent comprendre et générer du texte humain, traduire, coder, résumer des documents.
                  </Paragraph>
                </div>

                <div className="bg-mckinsey-teal-50 p-4 rounded-lg">
                  <h5 className="font-semibold text-mckinsey-navy-900 mb-2">🎨 Création</h5>
                  <Paragraph>
                    DALL-E, Midjourney, Stable Diffusion génèrent des images à partir de descriptions textuelles. 
                    Des IA composent de la musique, écrivent des scénarios.
                  </Paragraph>
                </div>
              </div>

              <Callout type="info">
                <Paragraph>
                  <strong>Le paradoxe de Moravec :</strong> Ce qui est facile pour les humains (marcher, reconnaître un visage) est difficile pour les IA. 
                  Ce qui est difficile pour les humains (calculs complexes, mémoriser des millions de données) est facile pour les IA.
                </Paragraph>
              </Callout>
            </SubSection>

            <SubSection title="Les Défis Éthiques et Sociétaux">
              <Paragraph>
                Avec de grands pouvoirs viennent de grandes responsabilités :
              </Paragraph>
              <BulletList items={[
                '🔒 Biais algorithmiques : Les IA reproduisent les biais présents dans les données d\'entraînement (racisme, sexisme).',
                '🕵️ Vie privée : La reconnaissance faciale massive, la surveillance.',
                '💼 Emploi : L\'automatisation pourrait remplacer certains métiers.',
                '⚖️ Responsabilité : Qui est responsable quand une voiture autonome cause un accident ?',
                '🤖 Superintelligence : Certains chercheurs (Nick Bostrom, Eliezer Yudkowsky) s\'inquiètent d\'une AGI incontrôlable.'
              ]} />
            </SubSection>
          </Section>
        </>
      )
    },
    details: "Découvrez les concepts fondamentaux, la différence entre IA faible et forte, et la hiérarchie IA > Machine Learning > Deep Learning."
  },
  { 
    id: 2, 
    title: "Histoire et évolution de l'IA", 
    duration: "30 min", 
    type: 'text' as const,
    exercises: [
      {
        id: 'ex2-1',
        title: 'Frise chronologique',
        description: 'Créez une frise chronologique des événements majeurs de l\'IA de 1950 à 2023.',
        solution: '1950: Test de Turing\n1956: Dartmouth\n1997: Deep Blue\n2012: AlexNet\n2016: AlphaGo\n2022: ChatGPT'
      }
    ],
    quiz: [
      {
        id: 'q2-1',
        question: 'Quel événement marque la naissance officielle de l\'IA ?',
        options: [
          'Invention du premier ordinateur (1945)',
          'Conférence de Dartmouth (1956)',
          'Victoire de Deep Blue (1997)',
          'Article d\'Alan Turing (1950)'
        ],
        correctAnswer: 1,
        explanation: 'La conférence de Dartmouth en 1956, organisée par John McCarthy, est l\'acte de naissance de l\'IA. Le terme "Intelligence Artificielle" y a été inventé.'
      },
      {
        id: 'q2-2',
        question: 'Différence entre Deep Blue et AlphaGo ?',
        options: [
          'Deep Blue = force brute, AlphaGo = apprentissage',
          'Échecs vs Go',
          'IBM vs DeepMind',
          'Toutes ces réponses'
        ],
        correctAnswer: 3
      }
    ],
    cheatSheet: `📚 HISTOIRE DE L'IA

1950: Test de Turing
1956: Dartmouth (naissance)
1997: Deep Blue (échecs)
2012: AlexNet (Deep Learning)
2016: AlphaGo (créativité IA)
2022: ChatGPT (LLM grand public)`,
    content: {
      component: () => (
        <>
          <Section title="Une Brève Histoire de l'IA">
            <Paragraph>
              L'histoire de l'IA est marquée par des cycles d'enthousiasme intense ("étés de l'IA") suivis de 
              périodes de désillusion ("hivers de l'IA").
            </Paragraph>

            <SubSection title="Les Dates Clés">
              <div className="space-y-6 my-6">
                <div>
                  <h4 className="text-lg font-semibold text-mckinsey-navy-900 mb-2">1950 : Le Test de Turing</h4>
                  <Paragraph>
                    Alan Turing propose un test pour déterminer si une machine peut faire preuve d'intelligence : 
                    si un humain ne peut pas distinguer la machine d'un autre humain lors d'une conversation textuelle, 
                    la machine est dite "intelligente".
                  </Paragraph>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-mckinsey-navy-900 mb-2">1956 : La Conférence de Dartmouth</h4>
                  <Paragraph>
                    C'est la naissance officielle du domaine. John McCarthy invente le terme "Intelligence Artificielle". 
                    Les participants pensaient qu'une machine aussi intelligente qu'un humain existerait en une génération. 
                    Ils étaient trop optimistes.
                  </Paragraph>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-mckinsey-navy-900 mb-2">1997 : Deep Blue vs Kasparov</h4>
                  <Paragraph>
                    L'ordinateur d'IBM bat le champion du monde d'échecs Garry Kasparov. C'était une victoire de la "force brute" 
                    (calculer tous les coups possibles) plutôt que de l'apprentissage.
                  </Paragraph>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-mckinsey-navy-900 mb-2">2012 : La Révolution Deep Learning (AlexNet)</h4>
                  <Paragraph>
                    Un réseau de neurones écrase la concurrence lors du concours de reconnaissance d'images ImageNet. 
                    C'est le début de l'ère moderne du Deep Learning.
                  </Paragraph>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-mckinsey-navy-900 mb-2">2016 : AlphaGo</h4>
                  <Paragraph>
                    L'IA de Google DeepMind bat Lee Sedol au jeu de Go, un jeu infiniment plus complexe que les échecs. 
                    L'IA a fait preuve de "créativité" avec le fameux coup 37.
                  </Paragraph>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-mckinsey-navy-900 mb-2">2022 : L'Ère Générative (ChatGPT)</h4>
                  <Paragraph>
                    OpenAI lance ChatGPT. Pour la première fois, une IA peut générer du texte, du code et des idées 
                    de manière fluide et conversationnelle.
                  </Paragraph>
                </div>
              </div>
            </SubSection>
          </Section>
        </>
      )
    },
    details: "De Turing à ChatGPT : comprenez les grandes étapes, les hivers de l'IA et les percées technologiques qui nous ont menés ici."
  },
  { 
    id: 3, 
    title: "Lab Interactif : Algorithmes de Tri", 
    duration: "45 min", 
    type: 'interactive' as const,
    interactiveCategory: 'algorithms' as const,
    interactiveId: 'bubble',
    exercises: [
      {
        id: 'ex3-1',
        title: 'Analyser la complexité',
        description: 'Pour 1000 éléments: comparaisons du tri à bulles vs tri rapide?',
        solution: '1. Bubble: ~500,000 (n²/2)\n2. Quick: ~10,000 (n log n)\n3. Pour 1M: Quick Sort sans hésiter!'
      },
      {
        id: 'ex3-2',
        title: 'Implémenter Bubble Sort',
        description: 'Écrivez bubble_sort(arr) en Python avec compteur d\'échanges.',
        solution: 'def bubble_sort(arr):\n    n = len(arr)\n    swaps = 0\n    for i in range(n):\n        for j in range(0, n-i-1):\n            if arr[j] > arr[j+1]:\n                arr[j], arr[j+1] = arr[j+1], arr[j]\n                swaps += 1\n    return arr'
      }
    ],
    quiz: [
      {
        id: 'q3-1',
        question: 'Complexité du tri à bulles (pire cas)?',
        options: ['O(n)', 'O(n log n)', 'O(n²)', 'O(2ⁿ)'],
        correctAnswer: 2,
        explanation: 'O(n²): deux boucles imbriquées. Pour 1000 éléments = ~1M comparaisons!'
      },
      {
        id: 'q3-2',
        question: 'Pourquoi Quick Sort est plus rapide?',
        options: [
          'Stratégie diviser pour régner',
          'Tri en parallèle',
          'Moins de comparaisons (pivot)',
          'Toutes ces réponses'
        ],
        correctAnswer: 3
      }
    ],
    cheatSheet: `📚 ALGORITHMES DE TRI

Bubble Sort: O(n²) - Simple mais lent
Quick Sort: O(n log n) - Rapide

💡 En Python: utilisez sorted() (Timsort)

Importance en IA:
• Optimisation des réseaux = comprendre O(n²) vs O(n log n)
• Random Forests = principe "diviser pour régner"`,
    content: {
      component: () => (
        <>
          <Section title="Comprendre par la Pratique : Les Algorithmes">
            <Paragraph>
              Avant de plonger dans les réseaux de neurones complexes, il est essentiel de comprendre comment 
              les ordinateurs "pensent" de manière algorithmique.
            </Paragraph>
            <Paragraph>
              Dans ce laboratoire interactif, vous allez visualiser comment différents algorithmes abordent 
              un problème simple : <Highlight>trier une liste de nombres</Highlight>.
            </Paragraph>

            <SubSection title="Ce que vous allez voir">
              <Paragraph>
                L'outil ci-dessous vous permet de visualiser :
              </Paragraph>
              <BulletList items={[
                'Tri à Bulles (Bubble Sort) : L\'approche naïve. On compare deux éléments côte à côte et on les échange s\'ils sont dans le mauvais ordre. C\'est lent mais facile à comprendre.',
                'Tri Rapide (Quick Sort) : Une approche "diviser pour régner" beaucoup plus efficace, utilisée dans la plupart des systèmes modernes.'
              ]} />
            </SubSection>

            <SubSection title="Objectifs du Lab">
              <BulletList items={[
                'Observez la différence de vitesse entre les algorithmes.',
                'Comprenez la notion de "complexité algorithmique" (O(n²) vs O(n log n)).',
                'Voyez comment l\'ordinateur déplace les données en mémoire.'
              ]} />
              <Callout type="info">
                <Paragraph>
                  <strong>Instructions :</strong> Utilisez le panneau de contrôle ci-dessous pour lancer les visualisations. 
                  Changez d'algorithme pour comparer leurs performances.
                </Paragraph>
              </Callout>
            </SubSection>
          </Section>
        </>
      )
    },
    details: "Visualisez en temps réel comment les algorithmes traitent les données. Une étape essentielle pour comprendre la logique machine."
  },
  {
    id: 4,
    title: "Apprentissage Supervisé",
    duration: "60 min",
    type: 'text' as const,
    content: {
      component: () => (
        <>
          <Section title="Apprentissage Supervisé">
            <Paragraph>
              C'est le type de Machine Learning le plus utilisé en entreprise aujourd'hui.
            </Paragraph>

            <SubSection title="Le Concept">
              <Paragraph>
                Imaginez que vous apprenez à un enfant à reconnaître des fruits.
              </Paragraph>
              <BulletList items={[
                'Vous lui montrez une pomme et dites "Pomme".',
                'Vous lui montrez une banane et dites "Banane".',
                'Après plusieurs exemples, vous lui montrez une nouvelle pomme et demandez "Qu\'est-ce que c\'est ?".'
              ]} />
              <Paragraph>
                C'est exactement comme ça que fonctionne l'apprentissage supervisé.
              </Paragraph>
              <BulletList items={[
                'Données d\'entraînement : Des exemples (images, chiffres) avec leurs étiquettes (la "bonne réponse").',
                'Objectif : L\'algorithme doit apprendre la relation entre l\'entrée et la sortie pour pouvoir prédire la sortie sur de nouvelles données qu\'il n\'a jamais vues.'
              ]} />
            </SubSection>

            <SubSection title="Les Deux Grandes Familles">
              <div className="space-y-6 my-6">
                <div>
                  <h4 className="text-lg font-semibold text-mckinsey-navy-900 mb-2">1. La Classification</h4>
                  <Paragraph>
                    L'objectif est de prédire une <strong>catégorie</strong> (une classe).
                  </Paragraph>
                  <BulletList items={[
                    'Exemple : Cet email est-il un "Spam" ou "Non-Spam" ?',
                    'Exemple : Cette image contient-elle un "Chat" ou un "Chien" ?',
                    'Sortie : Une valeur discrète.'
                  ]} />
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-mckinsey-navy-900 mb-2">2. La Régression</h4>
                  <Paragraph>
                    L'objectif est de prédire une <strong>valeur numérique continue</strong>.
                  </Paragraph>
                  <BulletList items={[
                    'Exemple : Quel sera le prix de cette maison en fonction de sa surface et de son quartier ?',
                    'Exemple : Quelle sera la température demain ?',
                    'Sortie : Un nombre.'
                  ]} />
                </div>
              </div>
            </SubSection>

            <SubSection title="Algorithmes Classiques">
              <BulletList items={[
                'Régression Linéaire : Trace une ligne droite à travers les données.',
                'Arbres de Décision : Une série de questions Oui/Non (ex: "Est-ce qu\'il a des ailes ?" -> "Oui" -> "Est-ce qu\'il nage ?"....).',
                'K-Nearest Neighbors (KNN) : "Dis-moi qui sont tes voisins, je te dirai qui tu es".'
              ]} />
            </SubSection>
          </Section>
        </>
      )
    },
    details: "Classification vs Régression. Comment apprendre à partir de données étiquetées. Exemples concrets."
  },
  {
    id: 5,
    title: "Lab Interactif : Structures de Données",
    duration: "50 min",
    type: 'interactive' as const,
    interactiveCategory: 'dataStructures' as const,
    interactiveId: 'bst',
    content: {
      component: () => (
        <>
          <Section title="Les Structures de Données">
            <Paragraph>
              Pour faire de l'IA efficace, il faut savoir stocker et organiser les données efficacement.
            </Paragraph>

            <SubSection title="Arbres Binaires de Recherche (BST)">
              <Paragraph>
                Dans ce module interactif, nous explorons les <Highlight>Arbres Binaires de Recherche</Highlight>. 
                C'est une structure fondamentale qui permet de retrouver une information très rapidement.
              </Paragraph>

              <ExampleBox title="Pourquoi c'est important pour l'IA ?">
                <Paragraph>
                  Les arbres sont à la base de nombreux algorithmes de Machine Learning, notamment les{' '}
                  <strong>Random Forests</strong> et le <strong>Gradient Boosting</strong> (XGBoost), qui sont 
                  parmi les algorithmes les plus performants pour les données tabulaires.
                </Paragraph>
              </ExampleBox>
            </SubSection>

            <SubSection title="Expérimentation">
              <Paragraph>
                Utilisez l'outil ci-dessous pour :
              </Paragraph>
              <BulletList items={[
                'Insérer des nombres dans l\'arbre.',
                'Voir comment l\'arbre s\'organise automatiquement (les petits nombres à gauche, les grands à droite).',
                'Lancer une recherche pour voir à quelle vitesse l\'ordinateur trouve un élément.'
              ]} />
            </SubSection>
          </Section>
        </>
      )
    },
    details: "Manipulez des arbres et des graphes pour comprendre comment les données sont structurées en mémoire pour une efficacité maximale."
  },
  {
    id: 6,
    title: "Réseaux de Neurones & Deep Learning",
    duration: "90 min",
    type: 'text' as const,
    content: {
      component: () => (
        <>
          <Section title="Réseaux de Neurones Artificiels">
            <Paragraph>
              C'est ici que la magie opère. Les réseaux de neurones sont inspirés de la biologie de notre cerveau.
            </Paragraph>

            <SubSection title="Le Neurone Artificiel (Perceptron)">
              <Paragraph>
                Un neurone mathématique est très simple. Il fait trois choses :
              </Paragraph>
              <BulletList items={[
                'Reçoit des entrées (Inputs) : $x_1, x_2, x_3...$',
                'Les pondère (Weights) : Chaque entrée a une importance différente ($w_1, w_2...$). On fait la somme : $S = \\sum (x_i \\cdot w_i) + b$ (b est le biais).',
                'Décide (Activation) : On passe cette somme dans une "fonction d\'activation". Si le signal est assez fort, le neurone "s\'active" et envoie un signal aux suivants.'
              ]} />
            </SubSection>

            <SubSection title="Le Réseau (Deep Learning)">
              <Paragraph>
                Un seul neurone ne peut pas faire grand chose. Mais si on en connecte des milliers, voire des milliards, 
                en couches successives, on obtient un <Highlight>Réseau de Neurones Profond</Highlight> (Deep Neural Network).
              </Paragraph>
              <BulletList items={[
                'Couche d\'entrée : Reçoit les pixels d\'une image.',
                'Couches cachées : Détectent des motifs de plus en plus complexes (bords -> formes -> yeux -> visages).',
                'Couche de sortie : Donne la réponse finale ("C\'est un chat à 98%").'
              ]} />
            </SubSection>

            <SubSection title="L'Entraînement (Backpropagation)">
              <Paragraph>
                Comment le réseau apprend-il ?
              </Paragraph>
              <Paragraph>
                Au début, il répond n'importe quoi.
              </Paragraph>
              <BulletList items={[
                'On lui montre une image de chat. Il dit "Chien".',
                'On calcule l\'erreur (la différence entre sa réponse et la vérité).',
                'On utilise un algorithme appelé Rétropropagation du Gradient (Backpropagation) pour remonter en arrière dans le réseau et ajuster légèrement tous les poids ($w$) pour que la prochaine fois, l\'erreur soit plus petite.',
                'On répète ça des millions de fois.'
              ]} />
            </SubSection>
          </Section>
        </>
      )
    },
    details: "Plongez au cœur du Deep Learning : Perceptrons, fonctions d'activation et l'algorithme de rétropropagation."
  },
  {
    id: 7,
    title: "Lab Interactif : Graphes & Réseaux",
    duration: "60 min",
    type: 'interactive' as const,
    interactiveCategory: 'graphs' as const,
    interactiveId: 'bfs',
    content: {
      component: () => (
        <>
          <Section title="Graphes et Réseaux">
            <Paragraph>
              Les réseaux de neurones sont, mathématiquement, des <strong>graphes</strong>. Comprendre comment on 
              parcourt un graphe est essentiel pour comprendre comment l'information circule dans une IA.
            </Paragraph>

            <SubSection title="Parcours de Graphe">
              <Paragraph>
                Dans cette démo, vous allez voir deux méthodes fondamentales pour explorer un réseau :
              </Paragraph>
              <BulletList items={[
                'BFS (Breadth-First Search) : Parcours en largeur. On explore tous les voisins directs avant d\'aller plus loin. C\'est comme une onde qui se propage.',
                'DFS (Depth-First Search) : Parcours en profondeur. On va le plus loin possible dans une direction avant de revenir sur ses pas.'
              ]} />
            </SubSection>

            <SubSection title="Application en IA">
              <BulletList items={[
                'La Backpropagation dans un réseau de neurones est une forme de parcours de graphe (du dernier neurone vers le premier).',
                'Les Knowledge Graphs (Graphes de Connaissance) utilisés par Google pour la recherche sont basés sur ces principes.'
              ]} />
            </SubSection>
          </Section>
        </>
      )
    },
    details: "Visualisez les algorithmes de parcours de graphes (BFS/DFS), fondamentaux pour comprendre l'architecture des réseaux."
  }
];

const objectives = [
  "Comprendre les concepts fondamentaux de l'IA",
  "Différencier apprentissage supervisé et non supervisé",
  "Construire des réseaux de neurones simples",
  "Appliquer le deep learning à des cas réels",
  "Comprendre les enjeux éthiques de l'IA"
];

const prerequisites = [
  "Bases de programmation Python",
  "Notions de mathématiques (algèbre linéaire)",
  "Curiosité et motivation !"
];

export default function IntelligenceArtificiellePage() {
  return (
    <CourseOverview
      courseId="intelligence-artificielle"
      title="Intelligence Artificielle"
      description="Maîtrisez les fondamentaux de l'IA moderne"
      level="Intermédiaire"
      duration="12h de contenu"
      lessonCount={lessons.length}
      lessons={lessons}
      objectives={objectives}
      prerequisites={prerequisites}
    />
  );
}
