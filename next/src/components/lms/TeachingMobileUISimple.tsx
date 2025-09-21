'use client';

import { useState, useEffect } from 'react';
import { learningPaths, courseModules } from '@/lib/curriculum-structure';
import { getCourseProgress } from '@/lib/lms-storage';

export default function TeachingMobileUISimple() {
  const [isOpen, setIsOpen] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);
  const [progressData, setProgressData] = useState<Record<string, any>>({});

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Charger la progression de manière simple
      const allProgress: Record<string, any> = {};
      learningPaths.forEach(path => {
        path.courses.forEach(courseId => {
          allProgress[courseId] = getCourseProgress(courseId);
        });
      });
      setProgressData(allProgress);
      setIsHydrated(true);
    }
  }, []);

  const isCompleted = (courseId: string) => {
    const progress = progressData[courseId];
    return progress && progress.completedLessons.includes('completed');
  };

  const calculateOverallProgress = () => {
    if (!isHydrated) return 0;
    
    const allCourses = learningPaths.flatMap(path => path.courses);
    const completedCourses = allCourses.filter(courseId => isCompleted(courseId));
    return allCourses.length > 0 ? (completedCourses.length / allCourses.length) * 100 : 0;
  };

  const progress = calculateOverallProgress();

  return (
    <>
      {/* Mobile Header */}
      <div className="lg:hidden sticky top-0 z-50 bg-white border-b border-gray-200 px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setIsOpen(true)}
              className="p-2 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <h1 className="text-lg font-semibold text-gray-900">Formation IA</h1>
          </div>
          
          {isHydrated && (
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">{Math.round(progress)}%</span>
              <div className="w-16 bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Sidebar Overlay */}
      {isOpen && (
        <div className="lg:hidden fixed inset-0 z-50">
          <div className="fixed inset-0 bg-black bg-opacity-50" onClick={() => setIsOpen(false)} />
          <div className="fixed left-0 top-0 h-full w-80 bg-white shadow-xl overflow-y-auto">
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">Curriculum</h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-md text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            
            <div className="p-4">
              {learningPaths.map((path) => (
                <div key={path.id} className="mb-6">
                  <h3 className="font-medium text-gray-900 mb-2">{path.name}</h3>
                  <div className="space-y-2">
                    {path.courses.map((courseId) => {
                      const courseModule = courseModules[courseId];
                      if (!courseModule) return null;
                      
                      const courseCompleted = isCompleted(courseId);
                      
                      return (
                        <div key={courseId} className="flex items-center space-x-2 p-2 rounded-lg border border-gray-200">
                          <div className="flex-shrink-0">
                            {courseCompleted ? (
                              <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                                <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                              </div>
                            ) : (
                              <div className="w-4 h-4 bg-gray-300 rounded-full" />
                            )}
                          </div>
                          <a
                            href={`/teaching/lessons/${courseId.replace(/[^a-z0-9]/g, '-')}`}
                            className="text-sm text-gray-900 hover:text-blue-600"
                            onClick={() => setIsOpen(false)}
                          >
                            {courseModule.name}
                          </a>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}