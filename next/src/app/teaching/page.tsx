'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import FadeIn from '@/components/FadeIn';
import Counter from '@/components/Counter';
import { ArrowRight, BookOpen, Clock, Code, GraduationCap, Layers, Terminal, Brain, Globe, Cpu } from 'lucide-react';

import { courses } from '@/lib/lms-data';

const trackColors = {
  'Software Engineering': 'from-emerald-500 to-teal-500',
  'Data Science': 'from-blue-500 to-indigo-500',
  'Data Engineering': 'from-purple-500 to-pink-500'
} as const;

const difficultyLabels = {
  beginner: 'débutant',
  intermediate: 'intermédiaire',
  advanced: 'avancé'
} as const;

const stats = [
  { value: courses.length, label: 'Cours complets', icon: BookOpen },
  { value: courses.reduce((total, course) => total + course.lessons.length, 0), label: 'Leçons détaillées', icon: Layers },
  { value: courses.reduce((total, course) => total + course.estimatedHours, 0), label: 'Heures de contenu', icon: Clock },
  { value: 100, label: '% Accès libre', icon: GraduationCap }
];

export default function TeachingPage() {
  useEffect(() => {
    document.title = 'Cours & Enseignement | Dr. Ihababdelbasset ANNAKI';
  }, []);

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
              <Link
                href="/teaching/parcours"
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-mckinsey-navy-900 px-6 py-3 text-sm font-medium text-white shadow-lg shadow-mckinsey-navy-900/10 hover:bg-mckinsey-teal-600 hover:text-white transition-colors"
              >
                Choisir un parcours guidé
                <ArrowRight className="w-4 h-4" />
              </Link>
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
                <Link href={`/teaching/modules/${course.id}`} className="block h-full">
                  <div className="group h-full bg-white rounded-2xl border border-gray-100 hover:border-mckinsey-teal-200 hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col">
                    <div className={`h-2 bg-gradient-to-r ${trackColors[course.category]}`} />
                    <div className="p-8 flex flex-col flex-grow">
                      <div className="flex justify-between items-start mb-6">
                        <div className="p-2.5 bg-gray-50 rounded-xl group-hover:bg-mckinsey-teal-50 transition-colors flex items-center justify-center min-w-[3rem] min-h-[3rem]">
                          <span className="text-3xl select-none leading-none">{course.icon}</span>
                        </div>
                        <span className="px-3 py-1 bg-gray-50 rounded-full text-xs font-medium text-gray-600 uppercase tracking-wider">
                          {difficultyLabels[course.level]}
                        </span>
                      </div>
                      
                      <h3 className="text-2xl font-light text-mckinsey-navy-900 mb-3 group-hover:text-mckinsey-teal-600 transition-colors">
                        {course.title}
                      </h3>
                      
                      <p className="text-mckinsey-gray-600 mb-6 flex-grow">
                        {course.description}
                      </p>
                      
                      <div className="flex flex-wrap gap-2 mb-6">
                        <span className="px-2 py-1 bg-gray-50 rounded text-xs text-gray-500 font-medium">
                          {course.category}
                        </span>
                        <span className="px-2 py-1 bg-gray-50 rounded text-xs text-gray-500 font-medium">
                          {difficultyLabels[course.level]}
                        </span>
                      </div>
                      
                      <div className="flex items-center justify-between pt-6 border-t border-gray-100">
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {course.estimatedHours}h
                          </span>
                          <span className="flex items-center gap-1">
                            <Layers className="w-4 h-4" />
                            {course.lessons.length} leçons
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
