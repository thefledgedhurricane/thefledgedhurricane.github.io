'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  learningPaths, 
  courseModules, 
  checkPrerequisites,
  type LearningPath 
} from '@/lib/curriculum-structure';
import { courses } from '@/lib/lms-data';
import { getCourseProgress, getCourseCompletionPercent } from '@/lib/lms-storage';

interface CurriculumSidebarProps {
  className?: string;
  selectedPath?: string;
  onPathChange?: (pathId: string) => void;
}

export default function CurriculumSidebar({ 
  className = '', 
  selectedPath,
  onPathChange 
}: CurriculumSidebarProps) {
  const pathname = usePathname();
  const [activePath, setActivePath] = useState(selectedPath || 'ia-fundamentals');
  const [completedCourses, setCompletedCourses] = useState<string[]>([]);

  // Dans une vraie app, on chargerait depuis localStorage
  // const progress = getProgress();

  const handlePathChange = (pathId: string) => {
    setActivePath(pathId);
    onPathChange?.(pathId);
  };

  const currentPath = learningPaths.find(p => p.id === activePath);

  const getProgressPercentage = (courseId: string): number => {
    const course = courses.find(c => c.id === courseId);
    if (!course) return 0;
    return getCourseCompletionPercent(courseId, course.lessons.length);
  };

  const isCurrentCourse = (courseId: string): boolean => {
    return pathname.includes(`/teaching/${courseId}`);
  };

  const getCourseStatus = (courseId: string): 'available' | 'locked' | 'completed' => {
    const prereqCheck = checkPrerequisites(courseId, completedCourses);
    
    if (!prereqCheck.satisfied) return 'locked';
    if (completedCourses.includes(courseId)) return 'completed';
    return 'available';
  };

  const getStatusIcon = (status: string, progress: number) => {
    switch (status) {
      case 'completed':
        return '✅';
      case 'locked':
        return '🔒';
      default:
        return progress > 0 ? '📖' : '📚';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'débutant':
        return 'text-green-600 bg-green-100';
      case 'intermédiaire':
        return 'text-orange-600 bg-orange-100';
      case 'avancé':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className={`bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 ${className}`}>
      <div className="p-6">
        {/* Header */}
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            📚 Curriculum IA
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Parcours d&apos;apprentissage structuré
          </p>
        </div>

        {/* Sélecteur de parcours */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Choisissez votre parcours :
          </label>
          <select
            value={activePath}
            onChange={(e) => handlePathChange(e.target.value)}
            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
          >
            {learningPaths.map((path) => (
              <option key={path.id} value={path.id}>
                {path.icon} {path.name}
              </option>
            ))}
          </select>
        </div>

        {/* Informations du parcours actuel */}
        {currentPath && (
          <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl">{currentPath.icon}</span>
              <h3 className="font-semibold text-blue-900 dark:text-blue-100">
                {currentPath.name}
              </h3>
            </div>
            <p className="text-sm text-blue-700 dark:text-blue-300 mb-3">
              {currentPath.description}
            </p>
            <div className="flex items-center gap-4 text-xs">
              <span className={`px-2 py-1 rounded-full ${getDifficultyColor(currentPath.difficulty)}`}>
                {currentPath.difficulty}
              </span>
              <span className="text-gray-600 dark:text-gray-400">
                ⏱️ {currentPath.estimatedWeeks} semaines
              </span>
            </div>
          </div>
        )}

        {/* Liste des cours du parcours */}
        {currentPath && (
          <div className="space-y-3">
            <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-3">
              Cours du parcours ({currentPath.courses.length})
            </h4>
            
            {currentPath.courses.map((courseId, index) => {
              const course = courses.find(c => c.id === courseId);
              const courseModule = courseModules[courseId];
              if (!course || !courseModule) return null;

              const status = getCourseStatus(courseId);
              const progress = getProgressPercentage(courseId);
              const prereqCheck = checkPrerequisites(courseId, completedCourses);
              const isActive = isCurrentCourse(courseId);

              return (
                <div key={courseId} className="relative">
                  {/* Ligne de connexion pour montrer la progression */}
                  {index < currentPath.courses.length - 1 && (
                    <div className="absolute left-6 top-12 w-0.5 h-6 bg-gray-200 dark:bg-gray-700"></div>
                  )}

                  <Link 
                    href={`/teaching/${courseId}`}
                    className={`block p-4 rounded-lg border transition-all ${
                      isActive
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                        : status === 'locked'
                        ? 'border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 opacity-60'
                        : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      {/* Numéro d'ordre et statut */}
                      <div className="flex flex-col items-center">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                          status === 'completed' 
                            ? 'bg-green-500 text-white'
                            : status === 'locked'
                            ? 'bg-gray-300 dark:bg-gray-600 text-gray-500'
                            : isActive
                            ? 'bg-blue-500 text-white'
                            : 'bg-gray-200 dark:bg-gray-700 text-gray-600'
                        }`}>
                          {status === 'completed' ? '✓' : index + 1}
                        </div>
                      </div>

                      {/* Contenu du cours */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-lg">
                            {getStatusIcon(status, progress)}
                          </span>
                          <h5 className={`font-medium ${
                            status === 'locked' 
                              ? 'text-gray-400' 
                              : 'text-gray-900 dark:text-gray-100'
                          }`}>
                            {course.title}
                          </h5>
                        </div>

                        <p className={`text-xs mb-2 ${
                          status === 'locked'
                            ? 'text-gray-400'
                            : 'text-gray-600 dark:text-gray-400'
                        }`}>
                          {courseModule.description}
                        </p>

                        {/* Barre de progression */}
                        {status !== 'locked' && (
                          <div className="mb-2">
                            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                              <div 
                                className="bg-blue-500 h-1.5 rounded-full transition-all"
                                style={{ width: `${progress}%` }}
                              ></div>
                            </div>
                            <span className="text-xs text-gray-500 dark:text-gray-400">
                              {progress}% complété
                            </span>
                          </div>
                        )}

                        {/* Métadonnées */}
                        <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
                          <span>⏱️ {courseModule.estimatedHours}h</span>
                          <span className={`px-2 py-0.5 rounded-full ${getDifficultyColor(course.level)}`}>
                            {course.level}
                          </span>
                        </div>

                        {/* Prérequis manquants */}
                        {!prereqCheck.satisfied && (
                          <div className="mt-2 p-2 bg-yellow-50 dark:bg-yellow-900/20 rounded border border-yellow-200 dark:border-yellow-800">
                            <p className="text-xs font-medium text-yellow-800 dark:text-yellow-200 mb-1">
                              Prérequis manquants :
                            </p>
                            <ul className="text-xs text-yellow-700 dark:text-yellow-300">
                              {prereqCheck.missing.map((prereq) => (
                                <li key={prereq.id} className="flex items-center gap-1">
                                  <span>•</span>
                                  <span>{prereq.name}</span>
                                  {prereq.essential && (
                                    <span className="text-red-500">*</span>
                                  )}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        )}

        {/* Légende */}
        <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
          <h5 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Légende :
          </h5>
          <div className="space-y-1 text-xs text-gray-600 dark:text-gray-400">
            <div className="flex items-center gap-2">
              <span>✅</span> Complété
            </div>
            <div className="flex items-center gap-2">
              <span>📖</span> En cours
            </div>
            <div className="flex items-center gap-2">
              <span>📚</span> Disponible
            </div>
            <div className="flex items-center gap-2">
              <span>🔒</span> Verrouillé (prérequis manquants)
            </div>
            <div className="flex items-center gap-2">
              <span className="text-red-500">*</span> Prérequis essentiel
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}