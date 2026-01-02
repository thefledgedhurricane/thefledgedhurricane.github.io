'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import ArticleLayout from '@/components/article/ArticleLayout';
import { 
  Heading2, 
  Heading3, 
  Paragraph, 
  CodeBlock, 
  List,
  Quote,
  Callout 
} from '@/components/article/ArticleComponents';

interface Post {
  id: string;
  title: string;
  description: string;
  author: {
    name: string;
    avatar?: string;
    role: string;
  };
  publishedAt: string;
  readingTime: number;
  category: string;
  tags: string[];
  featured?: boolean;
  image?: string;
  content: () => React.ReactElement;
}

const posts: Post[] = [
  {
    id: 'hello-world',
    title: 'Hello World - Bienvenue sur mon blog!',
    description: 'Premier article de blog pour présenter ce nouvel espace de partage dédié au développement web et à l\'IA.',
    author: {
      name: 'Dr. Ihababdelbasset ANNAKI',
      role: 'Développeur Full-Stack & Chercheur IA'
    },
    publishedAt: '2024-01-15',
    readingTime: 5,
    category: 'Développement',
    tags: ['Blog', 'Next.js', 'TypeScript', 'Développement Web'],
    featured: true,
    image: 'https://images.unsplash.com/photo-1555255707-c07966088b7b?q=80&w=2070&auto=format&fit=crop',
    content: () => (
      <>
        <Paragraph>
          Bienvenue sur mon blog ! C'est avec grand plaisir que je lance ce nouvel espace 
          de partage où je vais documenter mes apprentissages, mes projets, et mes réflexions 
          sur le développement web et l'intelligence artificielle.
        </Paragraph>

        <Heading2>Pourquoi ce blog ?</Heading2>
        <Paragraph>
          Au fil de ma carrière, j'ai accumulé de nombreuses connaissances et expériences 
          que je souhaite partager avec la communauté. Ce blog sera un espace pour :
        </Paragraph>
        <List items={[
          'Partager mes projets et leurs défis techniques',
          'Expliquer des concepts complexes de manière accessible',
          'Documenter mes apprentissages et découvertes',
          'Contribuer à la communauté des développeurs'
        ]} />

        <Heading2>Les thématiques abordées</Heading2>
        <Paragraph>
          Vous trouverez ici des articles sur plusieurs thématiques :
        </Paragraph>

        <Heading3>Développement Web</Heading3>
        <Paragraph>
          React, Next.js, TypeScript, et toutes les technologies modernes du web. 
          Je partagerai des tutoriels, des bonnes pratiques, et des retours d'expérience 
          sur mes projets.
        </Paragraph>

        <Heading3>Intelligence Artificielle</Heading3>
        <Paragraph>
          Machine Learning, Deep Learning, Computer Vision... L'IA est au cœur de mes recherches 
          et je documenterai mes travaux, mes expérimentations et les avancées dans ce domaine.
        </Paragraph>

        <Callout type="info" title="Projet Next.js">
          Ce blog est développé avec Next.js 14, TypeScript, et Tailwind CSS. 
          Le code source est disponible sur mon GitHub !
        </Callout>

        <Heading2>Exemple de code</Heading2>
        <Paragraph>
          Voici un exemple de composant React que nous utilisons dans ce blog :
        </Paragraph>

        <CodeBlock 
          language="typescript" 
          title="Article.tsx"
          code={`export default function Article() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1>Mon Article</h1>
      <p>Contenu de l'article...</p>
    </div>
  );
}`} 
        />

        <Heading2>Restez connecté</Heading2>
        <Paragraph>
          N'hésitez pas à me suivre sur mes réseaux sociaux et à me contacter si vous avez 
          des questions ou des suggestions d'articles. Je suis toujours ouvert aux discussions 
          et collaborations !
        </Paragraph>

        <Quote author="Dr. Annaki">
          Le meilleur moyen d'apprendre est de partager ce que l'on sait.
        </Quote>
      </>
    )
  },
  {
    id: 'introduction-ia',
    title: 'Introduction à l\'Intelligence Artificielle',
    description: 'Découvrez les concepts fondamentaux de l\'IA et son impact sur notre société moderne.',
    author: {
      name: 'Dr. Ihababdelbasset ANNAKI',
      role: 'Chercheur en IA'
    },
    publishedAt: '2024-10-15',
    readingTime: 8,
    category: 'Intelligence Artificielle',
    tags: ['IA', 'Machine Learning', 'Deep Learning'],
    featured: true,
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=2070&auto=format&fit=crop',
    content: () => (
      <>
        <Paragraph>
          L'Intelligence Artificielle (IA) est devenue omniprésente dans notre quotidien, 
          transformant profondément notre manière de vivre, de travailler et d'interagir.
        </Paragraph>

        <Heading2>Qu'est-ce que l'IA ?</Heading2>
        <Paragraph>
          L'IA désigne la capacité d'une machine à imiter des fonctions cognitives humaines 
          comme l'apprentissage, la résolution de problèmes et la prise de décision.
        </Paragraph>

        <Heading3>Les différents types d'IA</Heading3>
        <List items={[
          'IA faible (Narrow AI) : spécialisée dans une tâche spécifique',
          'IA forte (General AI) : capable de raisonnement général (théorique)',
          'Super IA : dépassant l\'intelligence humaine (hypothétique)'
        ]} />

        <Callout type="info" title="Le saviez-vous ?">
          Le terme "Intelligence Artificielle" a été créé en 1956 lors de la conférence 
          de Dartmouth, marquant la naissance officielle du domaine.
        </Callout>

        <Heading2>Machine Learning vs Deep Learning</Heading2>
        <Paragraph>
          Ces deux concepts sont souvent confondus mais présentent des différences importantes :
        </Paragraph>

        <CodeBlock 
          language="python" 
          title="example.py"
          code={`# Machine Learning classique
from sklearn.linear_model import LogisticRegression
model = LogisticRegression()
model.fit(X_train, y_train)

# Deep Learning
import tensorflow as tf
model = tf.keras.Sequential([
    tf.keras.layers.Dense(128, activation='relu'),
    tf.keras.layers.Dense(10, activation='softmax')
])
model.compile(optimizer='adam', loss='categorical_crossentropy')`} 
        />

        <Heading2>Applications pratiques</Heading2>
        <Paragraph>
          L'IA trouve des applications dans de nombreux domaines :
        </Paragraph>
        <List items={[
          'Santé : diagnostic médical, découverte de médicaments',
          'Transport : véhicules autonomes, optimisation du trafic',
          'Finance : détection de fraude, trading algorithmique',
          'Éducation : apprentissage personnalisé, tuteurs virtuels'
        ]} />

        <Quote author="Andrew Ng">
          L'IA est la nouvelle électricité. Elle va transformer chaque industrie.
        </Quote>
      </>
    )
  },
  {
    id: 'vr-education',
    title: 'La Réalité Virtuelle dans l\'Éducation',
    description: 'Comment la VR transforme les méthodes d\'enseignement et d\'apprentissage.',
    author: {
      name: 'Dr. Ihababdelbasset ANNAKI',
      role: 'Chercheur en VR & Cognition'
    },
    publishedAt: '2024-09-20',
    readingTime: 6,
    category: 'Réalité Virtuelle',
    tags: ['VR', 'Éducation', 'Innovation'],
    featured: true,
    image: 'https://images.unsplash.com/photo-1617802690658-1173a812650d?q=80&w=2070&auto=format&fit=crop',
    content: () => (
      <>
        <Paragraph>
          La Réalité Virtuelle (VR) révolutionne l'éducation en offrant des expériences 
          d'apprentissage immersives et engageantes qui étaient impossibles auparavant.
        </Paragraph>

        <Heading2>Les avantages de la VR en éducation</Heading2>
        <List items={[
          'Apprentissage expérientiel : apprendre en faisant',
          'Visualisation de concepts abstraits',
          'Environnements d\'apprentissage sûrs',
          'Motivation et engagement accrus'
        ]} />

        <Callout type="success" title="Mes recherches">
          Mes travaux portent sur l'utilisation de la VR pour évaluer la navigation 
          spatiale et la mémoire à travers le "VR Magic Carpet", une adaptation 
          du test de Corsi en réalité virtuelle.
        </Callout>

        <Heading2>Le VR Magic Carpet</Heading2>
        <Paragraph>
          Le VR Magic Carpet est un outil d'évaluation neuropsychologique innovant 
          qui permet d'étudier la navigation humaine dans un environnement virtuel.
        </Paragraph>

        <Heading3>Comment ça fonctionne ?</Heading3>
        <Paragraph>
          Les participants doivent mémoriser et reproduire des séquences de positions 
          projetées sur un tapis virtuel en marchant vers chaque cible. Nous enregistrons 
          et analysons les trajectoires pour identifier des patterns de navigation.
        </Paragraph>

        <CodeBlock 
          language="python" 
          title="trajectory_analysis.py"
          code={`import numpy as np
from sklearn.cluster import KMeans

# Analyse des trajectoires
def analyze_trajectory(data):
    # Extraction des features cinématiques
    velocity = np.diff(data, axis=0)
    
    # Clustering K-means
    kmeans = KMeans(n_clusters=3)
    clusters = kmeans.fit_predict(velocity)
    
    return clusters`} 
        />

        <Heading2>Applications cliniques</Heading2>
        <Paragraph>
          Cette technologie a des applications importantes en neuropsychologie :
        </Paragraph>
        <List items={[
          'Détection précoce de troubles cognitifs',
          'Évaluation des troubles vestibulaires',
          'Rééducation de la navigation spatiale',
          'Recherche sur la mémoire et l\'orientation'
        ]} />

        <Quote author="Alain Berthoz">
          La navigation spatiale est une fenêtre sur les processus cognitifs du cerveau.
        </Quote>
      </>
    )
  },
  {
    id: 'python-data-science',
    title: 'Python pour la Data Science',
    description: 'Guide pratique pour débuter en analyse de données avec Python.',
    author: {
      name: 'Dr. Ihababdelbasset ANNAKI',
      role: 'Data Scientist'
    },
    publishedAt: '2024-08-10',
    readingTime: 12,
    category: 'Programmation',
    tags: ['Python', 'Data Science', 'Pandas', 'NumPy'],
    featured: false,
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop',
    content: () => (
      <>
        <Paragraph>
          Python est devenu le langage incontournable pour la Data Science grâce à son 
          écosystème riche et ses bibliothèques puissantes.
        </Paragraph>

        <Heading2>Les bibliothèques essentielles</Heading2>
        <Heading3>NumPy</Heading3>
        <Paragraph>
          NumPy est la base du calcul scientifique en Python, offrant des tableaux 
          multidimensionnels performants.
        </Paragraph>
        <CodeBlock 
          language="python"
          code={`import numpy as np

# Création d'un tableau
arr = np.array([1, 2, 3, 4, 5])
print(arr.mean())  # Moyenne: 3.0`}
        />

        <Heading3>Pandas</Heading3>
        <Paragraph>
          Pandas simplifie la manipulation et l'analyse de données structurées.
        </Paragraph>
        <CodeBlock 
          language="python"
          code={`import pandas as pd

# Lecture de données
df = pd.read_csv('data.csv')
print(df.describe())  # Statistiques descriptives`}
        />

        <List items={[
          'NumPy : calcul numérique',
          'Pandas : manipulation de données',
          'Matplotlib : visualisation',
          'Scikit-learn : machine learning'
        ]} />
      </>
    )
  }
];

export default function PostsPage() {
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  if (selectedPost) {
    return (
      <ArticleLayout
        title={selectedPost.title}
        description={selectedPost.description}
        author={selectedPost.author}
        publishedAt={selectedPost.publishedAt}
        readingTime={selectedPost.readingTime}
        category={selectedPost.category}
        tags={selectedPost.tags}
        heroImage={selectedPost.image}
      >
        {selectedPost.content()}
      </ArticleLayout>
    );
  }

  return (
    <div className="min-h-screen bg-white text-gray-900">
       {/* Hero Section - Immersive */}
       <div className="relative h-[70vh] w-full overflow-hidden">
         <div className="absolute inset-0 bg-black/40 z-10" />
         <Image 
           src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2301&auto=format&fit=crop"
           alt="Hero Background"
           fill
           className="object-cover"
           priority
         />
         <div className="absolute inset-0 z-20 flex flex-col justify-center items-center text-center px-6">
           <span className="text-mckinsey-teal-400 tracking-normal text-sm  mb-6">Editorial</span>
           <h1 className="text-6xl md:text-8xl lg:text-9xl font-sans text-mckinsey-navy-800 mb-8 tracking-tight">
             JOURNAL
           </h1>
           <p className="max-w-xl text-mckinsey-gray-200 font-normal text-lg leading-relaxed">
             Exploration de l'intelligence artificielle, du développement web et de la cognition humaine.
           </p>
         </div>
       </div>

       {/* Content Grid */}
       <div className="max-w-[1800px] mx-auto px-6 py-24">
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-x-8 gap-y-24">
           {posts.map((post, index) => {
             const date = new Date(post.publishedAt);
             const day = date.getDate();
             const monthYear = date.toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' }).toUpperCase();
             
             // Layout logic: First item spans full width, others span 6 cols
             const isFirst = index === 0;
             const colSpan = isFirst ? 'lg:col-span-12' : 'lg:col-span-6';
             const imageHeight = isFirst ? 'h-[600px]' : 'h-[400px]';

             return (
               <div 
                 key={post.id} 
                 className={`group cursor-pointer ${colSpan}`}
                 onClick={() => setSelectedPost(post)}
               >
                 <div className="flex flex-col h-full">
                   {/* Image Container */}
                   <div className={`relative w-full ${imageHeight} mb-8 overflow-hidden bg-mckinsey-gray-50`}>
                     <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-700 z-10" />
                     {post.image ? (
                       <Image 
                         src={post.image} 
                         alt={post.title} 
                         fill 
                         className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105" 
                       />
                     ) : (
                       <div className="w-full h-full flex items-center justify-center text-mckinsey-gray-100">
                         <span className="font-sans text-6xl opacity-20">{index + 1}</span>
                       </div>
                     )}
                   </div>

                   {/* Content */}
                   <div className="flex flex-col md:flex-row gap-8 items-start">
                     {/* Date - Big & Bold */}
                     <div className="flex flex-col items-start md:w-32 flex-shrink-0 text-mckinsey-teal-500">
                       <span className="text-6xl md:text-7xl font-sans leading-none">{day}</span>
                       <span className="text-xs tracking-normal mt-2 border-t border-mckinsey-teal-500/30 pt-2 w-full">
                         {monthYear}
                       </span>
                     </div>

                     {/* Text Content */}
                     <div className="flex-1">
                       <div className="flex items-center gap-4 mb-4">
                         <span className="text-xs tracking-normal  text-mckinsey-navy-800/60">
                           {post.category}
                         </span>
                         <span className="w-px h-3 bg-white/20" />
                         <span className="text-xs tracking-normal  text-mckinsey-navy-800/40">
                           {post.readingTime} MIN READ
                         </span>
                       </div>

                       <h2 className={`font-serif text-mckinsey-navy-800 mb-4 leading-tight group-hover:text-mckinsey-teal-400 transition-colors ${isFirst ? 'text-4xl md:text-5xl' : 'text-3xl md:text-4xl'}`}>
                         {post.title}
                       </h2>
                       
                       <p className="text-mckinsey-gray-700 font-normal leading-relaxed max-w-2xl text-lg">
                         {post.description}
                       </p>

                       <div className="mt-8 inline-flex items-center text-xs  tracking-normal text-mckinsey-navy-800 group-hover:text-mckinsey-teal-400 transition-colors border-b border-white/20 pb-1 group-hover:border-mckinsey-teal-400">
                         Lire l'article
                       </div>
                     </div>
                   </div>
                 </div>
               </div>
             );
           })}
         </div>
       </div>

       {/* Floating Filter Bar */}
       <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50">
         <div className="bg-mckinsey-gray-50/90 backdrop-blur-md border border-white/10 px-8 py-4 rounded-full shadow-2xl shadow-black/50 flex items-center gap-8">
           <button className="text-xs  tracking-normal text-mckinsey-navy-800 hover:text-mckinsey-teal-400 transition-colors">
             Tous
           </button>
           <span className="w-px h-3 bg-white/10" />
           <button className="text-xs  tracking-normal text-mckinsey-navy-800/50 hover:text-mckinsey-navy-800 transition-colors">
             IA & Data
           </button>
           <button className="text-xs  tracking-normal text-mckinsey-navy-800/50 hover:text-mckinsey-navy-800 transition-colors">
             Développement
           </button>
           <button className="text-xs  tracking-normal text-mckinsey-navy-800/50 hover:text-mckinsey-navy-800 transition-colors">
             Recherche
           </button>
         </div>
       </div>
    </div>
  );
}