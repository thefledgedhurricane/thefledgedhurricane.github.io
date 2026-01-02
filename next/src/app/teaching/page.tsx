'use client';

import React from 'react';
import Link from 'next/link';
import FadeIn from '@/components/FadeIn';
import Counter from '@/components/Counter';
import { ArrowRight, BookOpen, Clock, Code, GraduationCap, Layers, Terminal, Brain, Globe, Cpu } from 'lucide-react';

const courses = [
  {
    id: 'ia-1-introduction',
    icon: Brain,
    title: "IA — Introduction & Fondements",
    description: "Découvrez les fondements de l'IA, le Machine Learning, le Deep Learning et les mathématiques essentielles (algèbre, gradients, probabilités).",
    difficulty: 'débutant',
    duration: '8h',
    lessons: 2,
    href: '/teaching/modules/ia-1-introduction',
    tags: ['IA', 'ML', 'Mathématiques', 'Fondamentaux'],
    color: 'from-purple-500 to-indigo-500'
  },
  {
    id: 'ia-2-apprentissage-supervise',
    icon: Brain,
    title: "IA — Apprentissage Supervisé",
    description: "Régression linéaire approfondie, MSE, gradient descent, équation normale, régularisation Ridge/Lasso avec implémentations complètes.",
    difficulty: 'intermédiaire',
    duration: '12h',
    lessons: 1,
    href: '/teaching/modules/ia-2-apprentissage-supervise',
    tags: ['Régression', 'Gradient Descent', 'Régularisation'],
    color: 'from-blue-500 to-purple-500'
  },
  {
    id: 'ia-3-apprentissage-non-supervise',
    icon: Brain,
    title: "IA — Apprentissage Non-Supervisé",
    description: "Clustering K-Means, K-Means++, PCA avec décomposition spectrale, t-SNE et applications réelles avec code from scratch.",
    difficulty: 'intermédiaire',
    duration: '14h',
    lessons: 2,
    href: '/teaching/modules/ia-3-apprentissage-non-supervise',
    tags: ['Clustering', 'PCA', 't-SNE', 'Dimensionnalité'],
    color: 'from-teal-500 to-cyan-500'
  },
  {
    id: 'ia-4-deep-learning-tabular',
    icon: Brain,
    title: "IA — Deep Learning (Tabulaire)",
    description: "Réseaux de neurones MLP, fonctions d'activation, forward pass, universal approximation theorem et loss functions.",
    difficulty: 'avancé',
    duration: '16h',
    lessons: 1,
    href: '/teaching/modules/ia-4-deep-learning-tabular',
    tags: ['Neural Networks', 'MLP', 'Activations', 'Forward Pass'],
    color: 'from-indigo-500 to-purple-500'
  },
  {
    id: 'intelligence-artificielle',
    icon: Brain,
    title: "Intelligence Artificielle (Ancien)",
    description: "Version originale du cours IA (7 leçons). Les nouveaux modules ci-dessus sont plus approfondis.",
    difficulty: 'intermédiaire',
    duration: '12h',
    lessons: 7,
    href: '/teaching/modules/intelligence-artificielle',
    tags: ['Machine Learning', 'Deep Learning', 'Neural Networks', 'Python'],
    color: 'from-gray-500 to-gray-600'
  },
  {
    id: 'programmation-fondamentale',
    icon: Terminal,
    title: "Fondamentaux de la Programmation",
    description: "Apprenez les bases essentielles : logique, variables, structures de contrôle, fonctions et paradigmes de programmation pour bien débuter.",
    difficulty: 'débutant',
    duration: '8h',
    lessons: 10,
    href: '/teaching/modules/programmation-bases',
    tags: ['Logique', 'Variables', 'Fonctions', 'POO'],
    color: 'from-blue-500 to-cyan-500'
  },
  {
    id: 'algorithmique',
    icon: Layers,
    title: "Algorithmique & Structures de Données",
    description: "Maîtrisez les algorithmes de tri, recherche, graphes et les structures de données essentielles avec visualisations interactives.",
    difficulty: 'intermédiaire',
    duration: '10h',
    lessons: 12,
    href: '/teaching/modules/algorithmique',
    tags: ['Tri', 'Recherche', 'Graphes', 'Complexité'],
    color: 'from-emerald-500 to-teal-500'
  },
  {
    id: 'python',
    icon: Code,
    title: "Python — De Zéro à Expert",
    description: "Cours complet Python : syntaxe, structures de données, POO, modules, data science et projets pratiques avec exercices interactifs.",
    difficulty: 'débutant',
    duration: '15h',
    lessons: 14,
    href: '/teaching/modules/python',
    tags: ['Python', 'Data Science', 'Automation', 'Web'],
    color: 'from-yellow-500 to-orange-500'
  },
  {
    id: 'langage-c',
    icon: Cpu,
    title: "Langage C — Programmation Système",
    description: "Apprenez le C : gestion mémoire, pointeurs, structures, fichiers et programmation système pour comprendre le fonctionnement bas niveau.",
    difficulty: 'intermédiaire',
    duration: '12h',
    lessons: 11,
    href: '/teaching/modules/langage-c',
    tags: ['Pointeurs', 'Mémoire', 'Système', 'Performance'],
    color: 'from-red-500 to-pink-500'
  },
  {
    id: 'developpement-web',
    icon: Globe,
    title: "Développement Web Moderne",
    description: "HTML, CSS, JavaScript, React et Next.js : créez des applications web modernes, responsives et performantes.",
    difficulty: 'débutant',
    duration: '14h',
    lessons: 12,
    href: '/teaching/modules/developpement-web',
    tags: ['HTML/CSS', 'JavaScript', 'React', 'Next.js'],
    color: 'from-cyan-500 to-blue-500'
  }
];

const stats = [
  { value: 6, label: 'Cours complets', icon: BookOpen },
  { value: 67, label: 'Leçons détaillées', icon: Layers },
  { value: 71, label: 'Heures de contenu', icon: Clock },
  { value: 100, label: '% Interactif', icon: GraduationCap }
];

export default function TeachingPage() {
  return (
    <main className="min-h-screen bg-white selection:bg-mckinsey-teal-100 selection:text-mckinsey-navy-900">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none">
          <div className="absolute top-20 left-20 w-96 h-96 bg-mckinsey-teal-50/40 rounded-full blur-3xl mix-blend-multiply animate-blob" />
          <div className="absolute top-40 right-20 w-96 h-96 bg-mckinsey-navy-50/40 rounded-full blur-3xl mix-blend-multiply animate-blob animation-delay-2000" />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <FadeIn>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-mckinsey-gray-200 rounded-full text-xs font-medium text-mckinsey-navy-800 mb-8 shadow-sm">
                <span className="w-1.5 h-1.5 bg-mckinsey-teal-500 rounded-full animate-pulse" />
                Espace d'Apprentissage
              </div>
              <h1 className="text-5xl lg:text-7xl font-light text-mckinsey-navy-900 mb-6 tracking-tight">
                Excellence <span className="font-normal text-mckinsey-teal-600">Pédagogique</span>
              </h1>
              <p className="text-xl text-mckinsey-gray-600 leading-relaxed">
                Une approche moderne de l'enseignement, combinant théorie rigoureuse et pratique interactive pour former les ingénieurs de demain.
              </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20">
              {stats.map((stat, idx) => (
                <div key={idx} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow text-center group">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-mckinsey-gray-50 text-mckinsey-teal-600 mb-4 group-hover:scale-110 transition-transform">
                    <stat.icon className="w-6 h-6" />
                  </div>
                  <div className="text-3xl font-light text-mckinsey-navy-900 mb-1">
                    <Counter end={stat.value} suffix={stat.label.includes('%') ? '%' : ''} />
                  </div>
                  <div className="text-xs font-medium text-mckinsey-gray-500 uppercase tracking-wider">{stat.label}</div>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Courses Grid */}
      <section className="pb-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course, idx) => (
              <FadeIn key={course.id} delay={idx * 100}>
                <Link href={course.href} className="block h-full">
                  <div className="group h-full bg-white rounded-2xl border border-gray-100 hover:border-mckinsey-teal-200 hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col">
                    <div className={`h-2 bg-gradient-to-r ${course.color}`} />
                    <div className="p-8 flex flex-col flex-grow">
                      <div className="flex justify-between items-start mb-6">
                        <div className="p-3 bg-gray-50 rounded-xl group-hover:bg-mckinsey-teal-50 transition-colors">
                          <course.icon className="w-8 h-8 text-mckinsey-navy-700 group-hover:text-mckinsey-teal-600 transition-colors" />
                        </div>
                        <span className="px-3 py-1 bg-gray-50 rounded-full text-xs font-medium text-gray-600 uppercase tracking-wider">
                          {course.difficulty}
                        </span>
                      </div>
                      
                      <h3 className="text-2xl font-light text-mckinsey-navy-900 mb-3 group-hover:text-mckinsey-teal-600 transition-colors">
                        {course.title}
                      </h3>
                      
                      <p className="text-mckinsey-gray-600 mb-6 flex-grow">
                        {course.description}
                      </p>
                      
                      <div className="flex flex-wrap gap-2 mb-6">
                        {course.tags.map((tag, tIdx) => (
                          <span key={tIdx} className="px-2 py-1 bg-gray-50 rounded text-xs text-gray-500">
                            {tag}
                          </span>
                        ))}
                      </div>
                      
                      <div className="flex items-center justify-between pt-6 border-t border-gray-100">
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {course.duration}
                          </span>
                          <span className="flex items-center gap-1">
                            <Layers className="w-4 h-4" />
                            {course.lessons} leçons
                          </span>
                        </div>
                        <ArrowRight className="w-5 h-5 text-mckinsey-teal-500 transform group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </Link>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
