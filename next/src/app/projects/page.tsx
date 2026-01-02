'use client';
import React, { useState } from 'react';
import ProjectLayout from '@/components/project/ProjectLayout';
import { 
  Heading2, 
  Heading3, 
  Paragraph, 
  CodeBlock, 
  List,
  Callout 
} from '@/components/project/ProjectComponents';
import FadeIn from '@/components/FadeIn';
import { ArrowRight, ArrowUpRight, Filter, X } from 'lucide-react';

interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  status: string;
  technologies: string[];
  year: string;
  githubUrl?: string;
  liveUrl?: string;
  featured: boolean;
  content: () => React.ReactElement;
}

const projects: Project[] = [
  {
    id: 'portfolio-website',
    title: 'Portfolio Personnel - Site Web Moderne',
    description: 'Site portfolio académique et professionnel développé avec Next.js 14, TypeScript et TailwindCSS. Design moderne, performant et accessible.',
    category: 'Développement Web',
    status: 'Terminé',
    technologies: ['Next.js 14', 'TypeScript', 'TailwindCSS', 'React', 'Vercel'],
    year: '2024',
    githubUrl: 'https://github.com/thefledgedhurricane/portfolio',
    liveUrl: 'https://thefledgedhurricane.github.io',
    featured: true,
    content: () => (
      <>
        <Paragraph>
          Ce portfolio représente mon identité numérique complète, conçu pour présenter 
          mes travaux de recherche, mes projets de développement, et mes compétences en 
          tant que développeur full-stack et chercheur en IA.
        </Paragraph>

        <Heading2>Objectifs du Projet</Heading2>
        <List items={[
          'Créer une plateforme centralisée pour mes publications académiques',
          'Présenter mes projets de développement avec documentation technique',
          'Offrir un système de cours interactif pour l\'enseignement',
          'Assurer une performance optimale et un SEO excellence'
        ]} />

        <Heading2>Architecture Technique</Heading2>
        <Heading3>Framework et Technologies</Heading3>
        <Paragraph>
          Le projet utilise Next.js 14 avec App Router, permettant le Server-Side Rendering 
          et la génération statique pour des performances optimales.
        </Paragraph>

        <CodeBlock 
          language="typescript"
            title="next.config.js"
          code={`/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: '',
  trailingSlash: true,
};

module.exports = nextConfig;`}
        />

        <Heading3>Système de Design</Heading3>
        <Paragraph>
          TailwindCSS permet une conception rapide avec un système de design cohérent. 
          Le mode sombre est implémenté nativement avec les classes dark: de Tailwind.
        </Paragraph>

        <Callout type="success" title="Performance">
          Le site atteint un score Lighthouse de 95+ sur tous les critères : Performance, 
          Accessibilité, Best Practices et SEO.
        </Callout>

        <Heading2>Fonctionnalités Clés</Heading2>
        <List items={[
          'Système de blog avec articles techniques',
          'Portfolio de projets avec descriptions détaillées',
          'Publications scientifiques avec intégration Scopus',
          'Plateforme d\'enseignement interactive',
          'Mode sombre/clair automatique',
          'SEO optimisé avec métadonnées dynamiques'
        ]} />

        <Heading2>Déploiement</Heading2>
        <Paragraph>
          Le site est déployé sur GitHub Pages avec un workflow CI/CD automatisé utilisant 
          GitHub Actions pour le build et le déploiement.
        </Paragraph>
      </>
    )
  },
  {
    id: 'vr-magic-carpet',
    title: 'VR Magic Carpet - Évaluation Neuropsychologique',
    description: 'Plateforme de réalité virtuelle pour l\'évaluation de la navigation spatiale et de la mémoire de travail. Adaptation du test de Corsi en VR.',
    category: 'Réalité Virtuelle & IA',
    status: 'En Recherche',
    technologies: ['Unity', 'C#', 'Python', 'Machine Learning', 'PyTorch', 'Scikit-learn'],
    year: '2021-2025',
    featured: true,
    content: () => (
      <>
        <Paragraph>
          Le VR Magic Carpet est une innovation majeure en neuropsychologie, permettant 
          d'évaluer la navigation spatiale dans un environnement virtuel immersif. C'est 
          une adaptation du célèbre test de Corsi, transposée en réalité virtuelle.
        </Paragraph>

        <Heading2>Contexte Scientifique</Heading2>
        <Paragraph>
          Le test de Corsi (Corsi Block-Tapping Test) est un outil classique d'évaluation 
          de la mémoire visuospatiale. Notre adaptation en VR permet une analyse beaucoup 
          plus riche des comportements de navigation.
        </Paragraph>

        <Callout type="info" title="Collaboration Internationale">
          Ce projet est développé en collaboration avec le Collège de France (Prof. Alain Berthoz), 
          la Sorbonne Université (Prof. Bernard Cohen) et l\'Université Mohammed Premier.
        </Callout>

        <Heading2>Méthodologie</Heading2>
        <Heading3>Protocole Expérimental</Heading3>
        <List items={[
          'Les participants portent un casque VR et se déplacent sur un tapis physique',
          'Des cibles sont projetées virtuellement en séquence',
          'Le participant doit mémoriser et reproduire la séquence',
          'Enregistrement de la trajectoire 3D avec capture de mouvement'
        ]} />

        <Heading3>Analyse par IA</Heading3>
        <Paragraph>
          Nous utilisons plusieurs techniques de Machine Learning pour analyser les trajectoires :
        </Paragraph>

        <CodeBlock 
          language="python"
            title="trajectory_clustering.py"
          code={`from sklearn.cluster import KMeans, DBSCAN
import numpy as np

def analyze_trajectory(data):
    # Extraction des features cinématiques
    velocity = np.diff(data, axis=0)
    acceleration = np.diff(velocity, axis=0)
    
    # K-means clustering
    kmeans = KMeans(n_clusters=3)
    clusters_kmeans = kmeans.fit_predict(velocity)
    
    # DBSCAN pour détecter les outliers
    dbscan = DBSCAN(eps=0.5, min_samples=5)
    clusters_dbscan = dbscan.fit_predict(velocity)
    
    return {
        'kmeans': clusters_kmeans,
        'dbscan': clusters_dbscan,
        'velocity': velocity,
        'acceleration': acceleration
    }`}
        />

        <Heading2>Résultats et Publications</Heading2>
        <Paragraph>
          Ce projet a donné lieu à 10 publications scientifiques dans des conférences 
          internationales et revues académiques, avec plus de 50 citations cumulées.
        </Paragraph>

        <List items={[
          'Identification de 3 clusters de comportements de navigation',
          'Distinction précise entre patients et sujets sains',
          'Détection de troubles vestibulaires et cognitifs',
          'Validation clinique avec des patients réels'
        ]} />
      </>
    )
  },
  {
    id: 'ml-toolkit',
    title: 'ML Research Toolkit - Outils de Recherche',
    description: 'Bibliothèque Python pour la recherche en Machine Learning. Preprocessing, data augmentation, clustering et visualisation pour time series.',
    category: 'Data Science & ML',
    status: 'Open Source',
    technologies: ['Python', 'PyTorch', 'Scikit-learn', 'Pandas', 'NumPy', 'Matplotlib'],
    year: '2023-2024',
    githubUrl: 'https://github.com/thefledgedhurricane',
    featured: false,
    content: () => (
      <>
        <Paragraph>
          Un ensemble d'outils et de scripts Python pour faciliter la recherche en 
          Machine Learning, avec un focus particulier sur l'analyse de séries temporelles 
          et le clustering.
        </Paragraph>

        <Heading2>Fonctionnalités</Heading2>
        <Heading3>Data Augmentation</Heading3>
        <Paragraph>
          Techniques avancées d'augmentation de données pour séries temporelles :
        </Paragraph>

        <CodeBlock 
          language="python"
          code={`import numpy as np

class TimeSeriesAugmentation:
    def jitter(self, data, sigma=0.03):
        """Ajoute du bruit gaussien"""
        noise = np.random.normal(0, sigma, data.shape)
        return data + noise
    
    def scaling(self, data, sigma=0.1):
        """Mise à l'échelle aléatoire"""
        factor = np.random.normal(1.0, sigma)
        return data * factor
    
    def time_warp(self, data, sigma=0.2):
        """Déformation temporelle"""
        # Implementation...
        pass`}
        />

        <Heading3>Clustering Avancé</Heading3>
        <List items={[
          'K-Means optimisé avec recherche automatique du nombre de clusters',
          'DBSCAN pour détection d\'outliers',
          'Hierarchical clustering avec dendrogrammes',
          'Ant Colony Optimization pour clustering'
        ]} />

        <Heading2>Utilisation</Heading2>
        <Paragraph>
          Installation simple via pip et documentation complète :
        </Paragraph>

        <CodeBlock 
          language="bash"
          code={`# Installation
pip install ml-research-toolkit

# Utilisation
from ml_toolkit import TimeSeriesAnalyzer
analyzer = TimeSeriesAnalyzer()
results = analyzer.analyze(data)`}
        />
      </>
    )
  },
  {
    id: 'teaching-platform',
    title: 'Plateforme d\'Enseignement Interactive',
    description: 'Système de gestion de cours interactif avec visualisations d\'algorithmes, exercices pratiques et suivi de progression.',
    category: 'Éducation & Tech',
    status: 'Terminé',
    technologies: ['Next.js', 'TypeScript', 'React', 'D3.js', 'TailwindCSS'],
    year: '2024',
    featured: true,
    content: () => (
      <>
        <Paragraph>
          Une plateforme d'apprentissage moderne intégrée à mon portfolio, offrant des 
          cours interactifs en programmation, algorithmique et intelligence artificielle.
        </Paragraph>

        <Heading2>Modules Pédagogiques</Heading2>
        <List items={[
          'Fondamentaux de la Programmation (Python, C)',
          'Algorithmique et Structures de Données',
          'Intelligence Artificielle et Machine Learning',
          'Développement Web (HTML, CSS, JavaScript)',
          'Bases de Données et SQL'
        ]} />

        <Heading2>Fonctionnalités Interactives</Heading2>
        <Heading3>Visualisations d\'Algorithmes</Heading3>
        <Paragraph>
          Des visualisations interactives permettent aux étudiants de comprendre 
          le fonctionnement des algorithmes en temps réel :
        </Paragraph>

        <List items={[
          'Tri à bulles, insertion, fusion et rapide',
          'Structures de données : piles, files, arbres',
          'Algorithmes de graphes : DFS, BFS, Dijkstra',
          'Régressions linéaire et logistique'
        ]} />

        <Callout type="success" title="Impact Pédagogique">
          Plus de 200 étudiants utilisent actuellement la plateforme à l\'Université 
          Mohammed Premier.
        </Callout>

        <Heading2>Système de Navigation</Heading2>
        <Paragraph>
          Chaque cours est organisé en leçons progressives avec navigation fluide et 
          suivi de la progression de l'étudiant.
        </Paragraph>
      </>
    )
  }
];

export default function ProjectsPage() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [filterCategory, setFilterCategory] = useState<string>('all');
  
  function mapCategory(cat: string): 'web' | 'mobile' | 'desktop' | 'ai' | 'data' | 'other' {
    const c = (cat || '').toLowerCase();
    if (c.includes('web') || c.includes('développement') || c.includes('portfolio')) return 'web';
    if (c.includes('mobile')) return 'mobile';
    if (c.includes('desktop')) return 'desktop';
    if (c.includes('vr') || c.includes('réalité') || c.includes('ia') || c.includes('intelligence') || c.includes('ai')) return 'ai';
    if (c.includes('data') || c.includes('ml') || c.includes('machine') || c.includes('science')) return 'data';
    return 'other';
  }

  function mapStatus(s: string): 'planning' | 'in-progress' | 'completed' | 'on-hold' | 'cancelled' {
    const st = (s || '').toLowerCase();
    if (st.includes('termin') || st.includes('finished') || st.includes('completed')) return 'completed';
    if (st.includes('en recherche') || st.includes('en cours') || st.includes('in progress') || st.includes('research')) return 'in-progress';
    if (st.includes('open source') || st.includes('released')) return 'completed';
    if (st.includes('pause') || st.includes('on hold')) return 'on-hold';
    if (st.includes('cancel')) return 'cancelled';
    return 'planning';
  }
  
  const categories = ['all', ...Array.from(new Set(projects.map(p => p.category)))];
  
  const filteredProjects = filterCategory === 'all' 
    ? projects 
    : projects.filter(p => p.category === filterCategory);

  if (selectedProject) {
    return (
      <div className="min-h-screen bg-white pt-24">
        <ProjectLayout
          title={selectedProject.title}
          description={selectedProject.description}
          category={mapCategory(selectedProject.category)}
          status={mapStatus(selectedProject.status)}
          technologies={selectedProject.technologies}
          year={selectedProject.year}
          githubUrl={selectedProject.githubUrl}
          liveUrl={selectedProject.liveUrl}
        >
          <div className="mb-8">
            <button
              onClick={() => setSelectedProject(null)}
              className="group inline-flex items-center text-sm font-medium text-mckinsey-gray-600 hover:text-mckinsey-teal-600 transition-colors"
            >
              <ArrowRight className="w-4 h-4 mr-2 rotate-180 group-hover:-translate-x-1 transition-transform" />
              Back to projects
            </button>
          </div>
          {selectedProject.content()}
        </ProjectLayout>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-white pt-32 pb-24 selection:bg-mckinsey-teal-100 selection:text-mckinsey-navy-900">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <FadeIn>
          <div className="text-center mb-24">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-mckinsey-gray-200 rounded-full text-xs font-medium text-mckinsey-navy-800 mb-8 shadow-sm">
              <span className="w-1.5 h-1.5 bg-mckinsey-teal-500 rounded-full animate-pulse" />
              Innovation & Development
            </div>
            
            <h1 className="text-5xl md:text-7xl font-light text-mckinsey-navy-900 mb-8 leading-[0.95] tracking-tight">
              Featured <span className="font-normal text-transparent bg-clip-text bg-gradient-to-r from-mckinsey-navy-800 to-mckinsey-teal-600">Projects</span>
            </h1>
            
            <p className="text-xl text-mckinsey-gray-600 font-light max-w-2xl mx-auto mb-12 leading-relaxed">
              Discover my research and development projects in AI, virtual reality, and web technologies.
            </p>
            
            {/* Filter */}
            <div className="flex justify-center gap-3 flex-wrap">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setFilterCategory(category)}
                  className={`px-6 py-2 text-sm font-medium rounded-full transition-all duration-300 border ${
                    filterCategory === category
                      ? 'bg-mckinsey-navy-900 text-white border-mckinsey-navy-900 shadow-lg shadow-mckinsey-navy-900/20'
                      : 'bg-white text-mckinsey-gray-600 border-gray-200 hover:border-mckinsey-navy-900 hover:text-mckinsey-navy-900'
                  }`}
                >
                  {category === 'all' ? 'All Projects' : category}
                </button>
              ))}
            </div>
          </div>
        </FadeIn>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <FadeIn key={project.id} delay={index * 100}>
              <article
                className="group relative bg-white rounded-2xl border border-gray-100 hover:border-mckinsey-teal-200 hover:shadow-xl transition-all duration-500 cursor-pointer flex flex-col h-full overflow-hidden"
                onClick={() => setSelectedProject(project)}
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-mckinsey-teal-50/50 to-transparent rounded-bl-full -mr-16 -mt-16 transition-transform duration-700 group-hover:scale-150" />
                
                <div className="p-8 flex flex-col h-full relative z-10">
                  <div className="flex items-center justify-between mb-6">
                    <span className="inline-block px-3 py-1 text-[10px] font-medium uppercase tracking-wider text-mckinsey-navy-700 bg-mckinsey-gray-50 rounded-full">
                      {project.category}
                    </span>
                    <span className="text-xs font-medium text-mckinsey-gray-400">
                      {project.year}
                    </span>
                  </div>

                  {project.featured && (
                    <div className="mb-4">
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-mckinsey-teal-600">
                        <span className="w-1.5 h-1.5 bg-mckinsey-teal-500 rounded-full animate-pulse" /> Featured
                      </span>
                    </div>
                  )}

                  <h2 className="text-2xl font-medium text-mckinsey-navy-900 mb-4 group-hover:text-mckinsey-teal-600 transition-colors duration-300">
                    {project.title}
                  </h2>

                  <p className="text-mckinsey-gray-600 font-light mb-8 line-clamp-3 flex-grow leading-relaxed">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-8">
                    {project.technologies.slice(0, 3).map((tech) => (
                      <span
                        key={tech}
                        className="text-[10px] font-medium px-2 py-1 bg-gray-50 text-mckinsey-gray-600 rounded-md border border-gray-100"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="text-[10px] font-medium px-2 py-1 bg-gray-50 text-mckinsey-gray-600 rounded-md border border-gray-100">
                        +{project.technologies.length - 3}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center justify-between pt-6 border-t border-gray-100 mt-auto">
                    <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                      project.status === 'Terminé' ? 'bg-green-50 text-green-700' :
                      project.status === 'En Recherche' ? 'bg-blue-50 text-blue-700' :
                      'bg-purple-50 text-purple-700'
                    }`}>
                      {project.status}
                    </span>

                    <button className="text-mckinsey-navy-900 text-sm font-medium flex items-center gap-2 group-hover:gap-3 transition-all duration-300">
                      View Details
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </article>
            </FadeIn>
          ))}
        </div>
      </div>
    </main>
  );
}