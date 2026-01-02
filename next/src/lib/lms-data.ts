// LMS Course Data - Modern pedagogical structure with integrated demos and code

export type DemoType = 'interactive' | 'visualization' | 'code-editor' | 'notebook';

export type CodeExample = {
  title: string;
  language: 'python' | 'javascript' | 'typescript' | 'html' | 'css';
  code: string;
  explanation: string;
  runnable?: boolean;
};

export type Demo = {
  id: string;
  type: DemoType;
  title: string;
  description: string;
  component?: string; // React component name
  notebookPath?: string; // Path to Jupyter notebook
  codeExamples?: CodeExample[];
};

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

export type LessonSection = {
  id: string;
  title: string;
  content: string; // Rich Markdown content
  estimatedMinutes: number;
  demos?: Demo[];
  codeExamples?: CodeExample[];
  keyTakeaways?: string[];
};

export type Lesson = {
  id: string;
  title: string;
  description: string;
  estimatedMinutes: number;
  objectives: string[];
  sections: LessonSection[];
  quiz?: QuizQuestion[];
  references?: {
    title: string;
    url: string;
    type: 'documentation' | 'article' | 'video' | 'book';
  }[];
  practiceExercises?: {
    title: string;
    description: string;
    difficulty: 'easy' | 'medium' | 'hard';
    hints?: string[];
  }[];
};

export type Course = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  category: 'Programmation' | 'Web' | 'Intelligence Artificielle' | 'Data Science';
  icon: string;
  color: string; // Tailwind color class
  estimatedHours: number;
  prerequisites?: string[];
  learningOutcomes: string[];
  lessons: Lesson[];
  projectIdeas?: {
    title: string;
    description: string;
    difficulty: 'easy' | 'medium' | 'hard';
  }[];
};

// Course: Python Fundamentals
export const pythonFundamentalsCourse: Course = {
  id: 'python-fundamentals',
  title: 'Python - Fondamentaux',
  subtitle: 'Maîtriser les bases de la programmation en Python',
  description: 'Apprenez Python de zéro : variables, types de données, structures de contrôle, fonctions et manipulation de données.',
  level: 'beginner',
  category: 'Programmation',
  icon: '🐍',
  color: 'google-blue',
  estimatedHours: 12,
  prerequisites: [],
  learningOutcomes: [
    'Comprendre la syntaxe de base de Python',
    'Manipuler les types de données primitifs et complexes',
    'Écrire des fonctions et comprendre la portée des variables',
    'Utiliser les structures de données (listes, dictionnaires, sets)',
    'Lire et écrire des fichiers',
    'Gérer les erreurs avec les exceptions'
  ],
  lessons: [
    {
      id: 'introduction-python',
      title: 'Introduction à Python',
      description: 'Découverte de Python, installation et premier programme',
      estimatedMinutes: 45,
      objectives: [
        'Comprendre pourquoi Python est populaire',
        'Installer Python et un environnement de développement',
        'Écrire et exécuter votre premier programme Python'
      ],
      sections: [
        {
          id: 'why-python',
          title: 'Pourquoi Python ?',
          content: `Python est l'un des langages de programmation les plus populaires au monde, et pour de bonnes raisons :

**🚀 Simplicité et lisibilité**
Python a été conçu pour être facile à lire et à écrire. Sa syntaxe claire permet de se concentrer sur la résolution de problèmes plutôt que sur la complexité du langage.

**🌐 Polyvalence**
- Développement web (Django, Flask)
- Science des données et IA (TensorFlow, PyTorch)
- Automatisation et scripting
- Développement de jeux
- Applications desktop

**📚 Écosystème riche**
Plus de 300,000 packages disponibles sur PyPI (Python Package Index) pour pratiquement tous les besoins.

**👥 Grande communauté**
Des millions de développeurs dans le monde, de nombreuses ressources d'apprentissage et une communauté active.`,
          estimatedMinutes: 15,
          keyTakeaways: [
            'Python est conçu pour la simplicité et la lisibilité',
            'Utilisé dans de nombreux domaines (web, IA, data science)',
            'Écosystème très riche avec des milliers de bibliothèques'
          ]
        },
        {
          id: 'installation-setup',
          title: 'Installation et Configuration',
          content: `## Installation de Python

### Windows
1. Téléchargez Python depuis [python.org](https://www.python.org/downloads/)
2. Exécutez l'installateur
3. ⚠️ **Important** : Cochez "Add Python to PATH"
4. Vérifiez l'installation : \`python --version\`

### macOS
\`\`\`bash
# Avec Homebrew
brew install python3

# Vérification
python3 --version
\`\`\`

### Linux (Ubuntu/Debian)
\`\`\`bash
sudo apt update
sudo apt install python3 python3-pip

# Vérification
python3 --version
\`\`\`

## Environnement de développement

### VS Code (Recommandé)
1. Installez [VS Code](https://code.visualstudio.com/)
2. Installez l'extension Python
3. Configurez l'interpréteur Python

### Alternatives
- **PyCharm** : IDE complet pour Python
- **Jupyter Notebook** : Idéal pour l'analyse de données
- **Google Colab** : Gratuit, dans le navigateur`,
          estimatedMinutes: 20,
          codeExamples: [
            {
              title: 'Vérifier l\'installation',
              language: 'python',
              code: `# Vérifier la version de Python
import sys
print(f"Python version: {sys.version}")

# Vérifier les packages installés
import pip
installed_packages = pip.get_installed_distributions()
print(f"Nombre de packages installés: {len(list(installed_packages))}")`,
              explanation: 'Ce code vérifie que Python est correctement installé et affiche la version ainsi que le nombre de packages disponibles.'
            }
          ]
        },
        {
          id: 'first-program',
          title: 'Votre Premier Programme',
          content: `## Hello, World!

Le traditionnel premier programme dans n'importe quel langage :

\`\`\`python
print("Hello, World!")
\`\`\`

## Concepts de base

### Variables
En Python, pas besoin de déclarer le type d'une variable :

\`\`\`python
# Python détermine automatiquement le type
name = "Alice"      # string
age = 25           # integer
height = 1.75      # float
is_student = True  # boolean
\`\`\`

### Commentaires
\`\`\`python
# Ceci est un commentaire sur une ligne

"""
Ceci est un commentaire
sur plusieurs lignes
(docstring)
"""
\`\`\`

### Affichage et saisie
\`\`\`python
# Afficher du texte
print("Bonjour!")

# Demander une saisie
name = input("Quel est votre nom ? ")
print(f"Enchanté, {name}!")
\`\`\``,
          estimatedMinutes: 10,
          codeExamples: [
            {
              title: 'Programme interactif simple',
              language: 'python',
              code: `# Programme de présentation
name = input("Quel est votre nom ? ")
age = input("Quel est votre âge ? ")

print(f"\\nBonjour {name}!")
print(f"Vous avez {age} ans.")

# Calcul simple
birth_year = 2025 - int(age)
print(f"Vous êtes né(e) en {birth_year}.")`,
              explanation: 'Ce programme interactif demande des informations à l\'utilisateur et calcule son année de naissance.',
              runnable: true
            }
          ],
          demos: [
            {
              id: 'python-repl',
              type: 'code-editor',
              title: 'Testez Python en direct',
              description: 'Éditeur Python interactif pour expérimenter avec le code',
              component: 'PythonREPL'
            }
          ]
        }
      ],
      quiz: [
        {
          id: 'q1',
          question: 'Quelle est la fonction pour afficher du texte en Python ?',
          options: [
            { id: 'a', text: 'echo()' },
            { id: 'b', text: 'print()' },
            { id: 'c', text: 'display()' },
            { id: 'd', text: 'show()' }
          ],
          correctOptionId: 'b',
          explanation: 'print() est la fonction standard pour afficher du texte en Python.'
        },
        {
          id: 'q2',
          question: 'Comment écrit-on un commentaire sur une ligne en Python ?',
          options: [
            { id: 'a', text: '// commentaire' },
            { id: 'b', text: '/* commentaire */' },
            { id: 'c', text: '# commentaire' },
            { id: 'd', text: '<!-- commentaire -->' }
          ],
          correctOptionId: 'c',
          explanation: 'Le symbole # est utilisé pour les commentaires sur une ligne en Python.'
        }
      ],
      references: [
        {
          title: 'Documentation officielle Python',
          url: 'https://docs.python.org/3/',
          type: 'documentation'
        },
        {
          title: 'Python pour débutants (tutoriel)',
          url: 'https://www.python.org/about/gettingstarted/',
          type: 'article'
        }
      ]
    }
    // More lessons will be added...
  ],
  projectIdeas: [
    {
      title: 'Calculatrice interactive',
      description: 'Créez une calculatrice en ligne de commande avec opérations de base',
      difficulty: 'easy'
    },
    {
      title: 'Jeu de devinette',
      description: 'Programme qui génère un nombre aléatoire et demande à l\'utilisateur de le deviner',
      difficulty: 'easy'
    },
    {
      title: 'Analyseur de texte',
      description: 'Comptez les mots, caractères et phrases dans un texte',
      difficulty: 'medium'
    }
  ]
};

// Export all courses
export const courses: Course[] = [
  pythonFundamentalsCourse,
  // More courses will be added...
];

// Helper functions
export function getCourseById(id: string): Course | undefined {
  return courses.find(c => c.id === id);
}

export function getLessonById(courseId: string, lessonId: string): { course: Course; lesson: Lesson } | undefined {
  const course = getCourseById(courseId);
  if (!course) return undefined;
  
  const lesson = course.lessons.find(l => l.id === lessonId);
  if (!lesson) return undefined;
  
  return { course, lesson };
}

export function getProgressPercentage(courseId: string, completedLessonIds: string[]): number {
  const course = getCourseById(courseId);
  if (!course || course.lessons.length === 0) return 0;
  
  return Math.round((completedLessonIds.length / course.lessons.length) * 100);
}
