'use client';

import { useState, useEffect, useCallback } from 'react';
import { usePathname } from 'next/navigation';
import { courseModules, LearningPath, checkPrerequisites } from '@/lib/curriculum-structure';
import { getCourseProgress, markLessonCompleted, type CourseProgress } from '@/lib/lms-storage';

interface CurriculumSidebarClientProps {
  learningPaths: LearningPath[];
  courseModules: typeof courseModules;
}

// Structure simple d'un cours pour l'affichage
interface SimpleCourse {
  id: string;
  title: string;
  slug: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  duration: string;
  level: string;
}

// Mapping des modules vers une structure d'affichage simplifiée
function createSimpleCourse(module: typeof courseModules[string], id: string): SimpleCourse {
  return {
    id,
    title: module.name,
    slug: id.replace(/[^a-z0-9]/g, '-'),
    difficulty: 'beginner', // par défaut
    duration: `${module.estimatedHours}h`,
    level: '1'
  };
}

export default function CurriculumSidebarClient({ 
  learningPaths, 
  courseModules 
}: CurriculumSidebarClientProps) {
  const [isHydrated, setIsHydrated] = useState(false);
  const [progressData, setProgressData] = useState<Record<string, CourseProgress>>({});
  const [expandedPaths, setExpandedPaths] = useState<Record<string, boolean>>({});
  const pathname = usePathname();

  // Initialisation côté client uniquement
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Charger la progression pour tous les cours
      const allProgress: Record<string, CourseProgress> = {};
      learningPaths.forEach(path => {
        path.courses.forEach(courseId => {
          allProgress[courseId] = getCourseProgress(courseId);
        });
      });
      setProgressData(allProgress);
      setIsHydrated(true);
      
      // Ouvrir par défaut le premier path
      setExpandedPaths({ [learningPaths[0]?.id]: true });
    }
  }, [learningPaths]);

  const handleCourseCompletion = useCallback((courseId: string) => {
    if (typeof window !== 'undefined') {
      markLessonCompleted(courseId, 'completed');
      const newProgress = getCourseProgress(courseId);
      setProgressData(prev => ({
        ...prev,
        [courseId]: newProgress
      }));
    }
  }, []);

  const togglePath = useCallback((pathId: string) => {
    setExpandedPaths(prev => ({
      ...prev,
      [pathId]: !prev[pathId]
    }));
  }, []);

  const isCurrentLesson = useCallback((lessonId: string) => {
    return pathname?.includes(lessonId);
  }, [pathname]);

  const calculatePathProgress = useCallback((path: LearningPath) => {
    const totalCourses = path.courses.length;
    const completedCourses = path.courses.filter(courseId => {
      const progress = progressData[courseId];
      return progress && progress.completedLessons.includes('completed');
    }).length;
    return totalCourses > 0 ? (completedCourses / totalCourses) * 100 : 0;
  }, [progressData]);

  const isCompleted = useCallback((courseId: string) => {
    const progress = progressData[courseId];
    return progress && progress.completedLessons.includes('completed');
  }, [progressData]);

  const hasBasicPrerequisites = useCallback((courseId: string) => {
    const completed = Object.keys(progressData).filter(id => isCompleted(id));
    const result = checkPrerequisites(courseId, completed);
    return result.satisfied;
  }, [progressData, isCompleted]);

  // Ne pas rendre jusqu'à l'hydratation
  if (!isHydrated) {
    return (
      <aside className="hidden lg:block fixed left-0 top-16 h-[calc(100vh-4rem)] w-80 bg-white border-r border-gray-200 overflow-y-auto">
        <div className="p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Chargement du curriculum...
          </h2>
        </div>
      </aside>
    );
  }

  return (
    <aside className="hidden lg:block fixed left-0 top-16 h-[calc(100vh-4rem)] w-80 bg-white border-r border-gray-200 overflow-y-auto">
      <div className="p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Curriculum IA & Data Science
        </h2>
        
        <div className="space-y-4">
          {learningPaths.map((path) => {
            const pathProgress = calculatePathProgress(path);
            const isExpanded = expandedPaths[path.id];
            
            return (
              <div key={path.id} className="border border-gray-200 rounded-lg">
                <button
                  onClick={() => togglePath(path.id)}
                  className="w-full p-4 text-left hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900">{path.name}</h3>
                      <p className="text-sm text-gray-600 mt-1">{path.description}</p>
                      
                      {/* Barre de progression */}
                      <div className="mt-2">
                        <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                          <span>Progression</span>
                          <span>{Math.round(pathProgress)}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${pathProgress}%` }}
                          />
                        </div>
                      </div>
                    </div>
                    
                    <svg
                      className={`w-5 h-5 text-gray-400 transition-transform ${
                        isExpanded ? 'rotate-90' : ''
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </button>
                
                {isExpanded && (
                  <div className="border-t border-gray-200">
                    <div className="p-4 space-y-3">
                      {path.courses.map((courseId) => {
                        const courseModule = courseModules[courseId];
                        if (!courseModule) return null;
                        
                        const course = createSimpleCourse(courseModule, courseId);
                        const courseCompleted = isCompleted(courseId);
                        const hasPrerequisites = hasBasicPrerequisites(courseId);
                        const isCurrent = isCurrentLesson(course.slug);
                        
                        return (
                          <div
                            key={courseId}
                            className={`flex items-center space-x-3 p-3 rounded-lg border ${
                              isCurrent 
                                ? 'border-blue-500 bg-blue-50' 
                                : 'border-gray-200 hover:bg-gray-50'
                            }`}
                          >
                            <div className="flex-shrink-0">
                              {courseCompleted ? (
                                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                  </svg>
                                </div>
                              ) : hasPrerequisites ? (
                                <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                                  <span className="text-white text-sm font-medium">
                                    {course.level}
                                  </span>
                                </div>
                              ) : (
                                <div className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center">
                                  <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m0 0v2m0-2h2m-2 0H10m8-8V9a4 4 0 00-8 0v2m0 0V9a4 4 0 818 0v2" />
                                  </svg>
                                </div>
                              )}
                            </div>
                            
                            <div className="flex-1 min-w-0">
                              <a
                                href={`/teaching/lessons/${course.slug}`}
                                className={`block text-sm font-medium ${
                                  hasPrerequisites 
                                    ? 'text-gray-900 hover:text-blue-600' 
                                    : 'text-gray-400 cursor-not-allowed'
                                }`}
                                onClick={hasPrerequisites ? undefined : (e) => e.preventDefault()}
                              >
                                {course.title}
                              </a>
                              
                              <div className="flex items-center mt-1 space-x-2">
                                <span className={`text-xs px-2 py-1 rounded-full ${
                                  course.difficulty === 'beginner' 
                                    ? 'bg-green-100 text-green-800'
                                    : course.difficulty === 'intermediate'
                                    ? 'bg-yellow-100 text-yellow-800'
                                    : 'bg-red-100 text-red-800'
                                }`}>
                                  {course.difficulty}
                                </span>
                                <span className="text-xs text-gray-500">
                                  {course.duration}
                                </span>
                              </div>
                              
                              {!hasPrerequisites && courseModule.prerequisites.length > 0 && (
                                <p className="text-xs text-red-500 mt-1">
                                  Prérequis: {courseModule.prerequisites.map(p => p.name).join(', ')}
                                </p>
                              )}
                            </div>
                            
                            {hasPrerequisites && !courseCompleted && (
                              <button
                                onClick={() => handleCourseCompletion(courseId)}
                                className="flex-shrink-0 text-xs bg-green-100 text-green-800 px-2 py-1 rounded hover:bg-green-200 focus:outline-none focus:ring-2 focus:ring-green-500"
                              >
                                Marquer terminé
                              </button>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </aside>
  );
}