import { Metadata } from 'next';
import { generateJsonLd } from '@/lib/jsonld';
import { courses } from '@/lib/lms-data';
import { learningPaths, courseModules } from '@/lib/curriculum-structure';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Enseignement IA — Parcours d\'apprentissage structuré',
  description: 'Apprenez l\'Intelligence Artificielle avec nos parcours pédagogiques structurés, des prérequis aux applications avancées.',
  openGraph: {
    title: 'Enseignement IA — Parcours d\'apprentissage | Dr. Ihababdelbasset ANNAKI',
    description: 'Formation complète en IA avec progression pédagogique, prérequis et objectifs clairs.',
    type: 'website',
  },
};

export default async function TeachingPage() {
  
  const jsonLd = generateJsonLd({
    type: 'WebPage',
    name: 'Enseignement IA — Parcours d\'apprentissage',
    url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://thefledgedhurricane.github.io'}/teaching`,
    description: 'Formation complète en IA avec progression pédagogique, prérequis et objectifs clairs.',
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'débutant':
        return 'text-green-700 bg-green-100 border-green-200';
      case 'intermédiaire':
        return 'text-orange-700 bg-orange-100 border-orange-200';
      case 'avancé':
        return 'text-red-700 bg-red-100 border-red-200';
      default:
        return 'text-gray-700 bg-gray-100 border-gray-200';
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <main>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-6">
              🧠 Formation Intelligence Artificielle
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-8">
              Apprenez l&apos;IA avec une approche pédagogique structurée : prérequis clairs, 
              progression logique et objectifs d&apos;apprentissage définis.
            </p>
            
            {/* Statistiques rapides */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">{learningPaths.length}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Parcours</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">{courses.length}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Cours</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600">
                  {courses.reduce((acc, course) => acc + course.lessons.length, 0)}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Leçons</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-600">
                  {Math.round(Object.values(courseModules).reduce((acc, module) => acc + module.estimatedHours, 0))}h
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Contenu</div>
              </div>
            </div>
          </div>

          {/* Parcours d'apprentissage recommandés */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-8 text-center">
              🎯 Parcours d&apos;apprentissage recommandés
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {learningPaths.map((path) => (
                <div 
                  key={path.id}
                  className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-3xl">{path.icon}</span>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                        {path.name}
                      </h3>
                      <div className="flex items-center gap-2 mt-1">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getDifficultyColor(path.difficulty)}`}>
                          {path.difficulty}
                        </span>
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          {path.estimatedWeeks} semaines
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    {path.description}
                  </p>
                  
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Cours inclus ({path.courses.length}) :
                    </h4>
                    <div className="space-y-1">
                      {path.courses.slice(0, 3).map((courseId, index) => {
                        const course = courses.find(c => c.id === courseId);
                        return course ? (
                          <div key={courseId} className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-2">
                            <span className="w-4 h-4 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 flex items-center justify-center text-xs font-bold">
                              {index + 1}
                            </span>
                            <span>{course.title}</span>
                          </div>
                        ) : null;
                      })}
                      {path.courses.length > 3 && (
                        <div className="text-sm text-gray-500 dark:text-gray-400 ml-6">
                          +{path.courses.length - 3} cours supplémentaires
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <Link
                    href={`/teaching/${path.courses[0]}`}
                    className="inline-flex items-center justify-center w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                  >
                    Commencer ce parcours →
                  </Link>
                </div>
              ))}
            </div>
          </section>

          {/* Vue par catégories */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-8 text-center">
              📂 Explorer par domaine
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from(new Map(
                courses
                  .filter(c => !!c.category)
                  .map(c => [
                    (c.category as string)
                      .toLowerCase()
                      .normalize('NFD')
                      .replace(/[\u0300-\u036f]/g, '')
                      .replace(/[^a-z0-9]+/g, '-')
                      .replace(/(^-|-$)/g, ''),
                    c.category as string
                  ])
              ).entries()).map(([slug, label]) => {
                const categoryCourses = courses.filter(c => c.category && (
                  (c.category as string)
                    .toLowerCase()
                    .normalize('NFD')
                    .replace(/[\u0300-\u036f]/g, '')
                    .replace(/[^a-z0-9]+/g, '-')
                    .replace(/(^-|-$)/g, '')
                ) === slug);

                const totalHours = categoryCourses.reduce((acc, course) => {
                  const courseModule = courseModules[course.id];
                  return acc + (courseModule?.estimatedHours || 0);
                }, 0);

                return (
                  <Link 
                    key={slug} 
                    href={`/teaching/category/${slug}`} 
                    className="group p-6 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 hover:shadow-lg hover:border-blue-300 dark:hover:border-blue-600 transition-all"
                  >
                    <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Domaine</div>
                    <div className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                      {label}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                      {categoryCourses.length} cours • {totalHours}h de contenu
                    </div>
                    <div className="text-sm font-medium text-blue-600 dark:text-blue-400 group-hover:text-blue-700 dark:group-hover:text-blue-300">
                      Explorer →
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>

          {/* Call to action */}
          <section className="text-center bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-8 border border-blue-200 dark:border-blue-800">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              Prêt à commencer votre formation en IA ?
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-2xl mx-auto">
              Choisissez un parcours adapté à votre niveau et vos objectifs. 
              Chaque cours est conçu avec des prérequis clairs et des objectifs pédagogiques précis.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/teaching/intro-ia"
                className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              >
                🚀 Commencer par les bases
              </Link>
              <Link
                href={`/teaching/${learningPaths.find(p => p.id === 'ml-engineer')?.courses[0]}`}
                className="inline-flex items-center justify-center px-6 py-3 border border-blue-600 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
              >
                ⚡ Formation accélérée
              </Link>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}