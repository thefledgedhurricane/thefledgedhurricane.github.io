import Link from 'next/link';
import { ArrowRight, Brain, Network, Route } from 'lucide-react';

const paths = [
  {
    title: 'Fondements de l’intelligence artificielle',
    description: 'Définitions, repères historiques et grandes familles d’approches pour construire un socle conceptuel solide.',
    href: '/teaching/parcours/intro-ia-fondamentaux',
    icon: Brain,
    label: 'Introduction',
  },
  {
    title: 'Types d’apprentissage automatique',
    description: 'Apprentissage supervisé, non supervisé et formalisation mathématique des principaux problèmes.',
    href: '/teaching/parcours/intro-ia-types-ml',
    icon: Network,
    label: 'Concepts essentiels',
  },
  {
    title: 'Parcours IA spécialisé',
    description: 'Une progression guidée des fondements vers le deep learning, avec modules disponibles et feuille de route.',
    href: '/teaching/parcours/ia-specialise',
    icon: Route,
    label: 'Parcours complet',
  },
];

export default function ParcoursIndex() {
  return (
    <main className="min-h-screen bg-white pt-32 pb-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="max-w-3xl mb-14">
          <span className="inline-flex items-center px-3 py-1 rounded-full bg-mckinsey-teal-50 text-mckinsey-teal-700 text-xs font-medium uppercase tracking-wider mb-6">
            Parcours pédagogiques
          </span>
          <h1 className="text-4xl md:text-6xl font-light text-mckinsey-navy-900 mb-6">
            Comprendre avant de <span className="text-mckinsey-teal-600">construire</span>
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed">
            Des itinéraires structurés pour relier intuition, formalisation et pratique sans brûler les étapes.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {paths.map((path) => {
            const Icon = path.icon;
            return (
              <Link
                key={path.href}
                href={path.href}
                className="group rounded-2xl border border-gray-200 bg-white p-7 shadow-sm hover:-translate-y-1 hover:border-mckinsey-teal-200 hover:shadow-xl transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-mckinsey-navy-900 text-white flex items-center justify-center mb-6 group-hover:bg-mckinsey-teal-600 transition-colors">
                  <Icon className="w-6 h-6" />
                </div>
                <div className="text-xs uppercase tracking-wider text-mckinsey-teal-600 font-medium mb-3">{path.label}</div>
                <h2 className="text-xl font-medium text-mckinsey-navy-900 mb-3">{path.title}</h2>
                <p className="text-sm text-gray-600 leading-relaxed mb-6">{path.description}</p>
                <span className="inline-flex items-center gap-2 text-sm font-medium text-mckinsey-navy-800 group-hover:text-mckinsey-teal-700">
                  Explorer <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </main>
  );
}
