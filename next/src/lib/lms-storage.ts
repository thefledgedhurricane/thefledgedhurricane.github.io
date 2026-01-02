"use client";

// Local storage-based progress tracking
export type LessonProgress = {
  completed: boolean;
  completedAt?: string;
  quizScore?: number;
  timeSpent?: number; // in minutes
};

export type CourseProgress = {
  lessons: Record<string, LessonProgress>;
  lastAccessedLesson?: string;
  startedAt: string;
  totalTimeSpent: number;
};

export type LMSProgress = {
  version: number;
  courses: Record<string, CourseProgress>;
};

const STORAGE_KEY = 'lms:progress:v2';
const VERSION = 2;

function readProgress(): LMSProgress {
  if (typeof window === 'undefined') {
    return { version: VERSION, courses: {} };
  }
  
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return { version: VERSION, courses: {} };
    
    const parsed = JSON.parse(data);
    if (parsed.version !== VERSION) {
      // Migration logic if needed
      return { version: VERSION, courses: {} };
    }
    return parsed;
  } catch {
    return { version: VERSION, courses: {} };
  }
}

function writeProgress(progress: LMSProgress) {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch (error) {
    console.error('Failed to save progress:', error);
  }
}

export function getCourseProgress(courseId: string): CourseProgress {
  const progress = readProgress();
  
  if (!progress.courses[courseId]) {
    return {
      lessons: {},
      startedAt: new Date().toISOString(),
      totalTimeSpent: 0
    };
  }
  
  return progress.courses[courseId];
}

export function markLessonCompleted(courseId: string, lessonId: string, quizScore?: number) {
  const progress = readProgress();
  
  if (!progress.courses[courseId]) {
    progress.courses[courseId] = {
      lessons: {},
      startedAt: new Date().toISOString(),
      totalTimeSpent: 0
    };
  }
  
  progress.courses[courseId].lessons[lessonId] = {
    completed: true,
    completedAt: new Date().toISOString(),
    quizScore,
    timeSpent: progress.courses[courseId].lessons[lessonId]?.timeSpent || 0
  };
  
  progress.courses[courseId].lastAccessedLesson = lessonId;
  
  writeProgress(progress);
}

export function updateLessonProgress(
  courseId: string, 
  lessonId: string, 
  updates: Partial<LessonProgress>
) {
  const progress = readProgress();
  
  if (!progress.courses[courseId]) {
    progress.courses[courseId] = {
      lessons: {},
      startedAt: new Date().toISOString(),
      totalTimeSpent: 0
    };
  }
  
  const currentLesson = progress.courses[courseId].lessons[lessonId] || {
    completed: false
  };
  
  progress.courses[courseId].lessons[lessonId] = {
    ...currentLesson,
    ...updates
  };
  
  progress.courses[courseId].lastAccessedLesson = lessonId;
  
  writeProgress(progress);
}

export function getLessonProgress(courseId: string, lessonId: string): LessonProgress | undefined {
  const progress = readProgress();
  return progress.courses[courseId]?.lessons[lessonId];
}

export function getCompletedLessons(courseId: string): string[] {
  const courseProgress = getCourseProgress(courseId);
  return Object.entries(courseProgress.lessons)
    .filter(([_, progress]) => progress.completed)
    .map(([lessonId]) => lessonId);
}

export function getProgressPercentage(courseId: string, totalLessons: number): number {
  const completedCount = getCompletedLessons(courseId).length;
  return totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;
}

export function resetCourseProgress(courseId: string) {
  const progress = readProgress();
  delete progress.courses[courseId];
  writeProgress(progress);
}

export function exportProgress(): string {
  const progress = readProgress();
  return JSON.stringify(progress, null, 2);
}

export function importProgress(data: string): boolean {
  try {
    const parsed = JSON.parse(data) as LMSProgress;
    if (parsed.version === VERSION) {
      writeProgress(parsed);
      return true;
    }
    return false;
  } catch {
    return false;
  }
}
