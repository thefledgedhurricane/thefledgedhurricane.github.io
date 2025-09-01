"use client";

// Local storage-based progress tracking for the LMS
// Structure: { courses: { [courseId]: { completedLessons: string[], quizScores: { [lessonId]: number } } } }

export type CourseProgress = {
  completedLessons: string[];
  quizScores: Record<string, number>;
};

export type LMSState = {
  version: number;
  courses: Record<string, CourseProgress>;
};

const STORAGE_KEY = 'lms:v1';
const VERSION = 1;
export const PASS_THRESHOLD = 70; // score minimal (%) pour déverrouiller la leçon suivante

function readState(): LMSState {
  if (typeof window === 'undefined') {
    return { version: VERSION, courses: {} };
  }
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return { version: VERSION, courses: {} };
    const data = JSON.parse(raw);
    if (!data.version || data.version !== VERSION) {
      return { version: VERSION, courses: {} };
    }
    return data as LMSState;
  } catch {
    return { version: VERSION, courses: {} };
  }
}

function writeState(state: LMSState) {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

export function getCourseProgress(courseId: string): CourseProgress {
  const state = readState();
  return state.courses[courseId] || { completedLessons: [], quizScores: {} };
}

export function markLessonCompleted(courseId: string, lessonId: string) {
  const state = readState();
  const course = state.courses[courseId] || { completedLessons: [], quizScores: {} };
  if (!course.completedLessons.includes(lessonId)) {
    course.completedLessons.push(lessonId);
  }
  state.courses[courseId] = course;
  writeState(state);
}

export function saveQuizScore(courseId: string, lessonId: string, score: number) {
  const state = readState();
  const course = state.courses[courseId] || { completedLessons: [], quizScores: {} };
  course.quizScores[lessonId] = Math.max(course.quizScores[lessonId] || 0, score);
  state.courses[courseId] = course;
  writeState(state);
}

export function resetCourseProgress(courseId: string) {
  const state = readState();
  delete state.courses[courseId];
  writeState(state);
}

export function getCourseCompletionPercent(courseId: string, totalLessons: number): number {
  const progress = getCourseProgress(courseId);
  if (totalLessons <= 0) return 0;
  const pct = Math.round((progress.completedLessons.length / totalLessons) * 100);
  return Math.min(100, Math.max(0, pct));
}

export function isLessonUnlocked(
  courseId: string,
  lessonIdsInOrder: string[],
  lessonId: string,
  getPassThreshold?: (prevLessonId: string) => number
): boolean {
  // La première leçon est toujours disponible
  const idx = lessonIdsInOrder.indexOf(lessonId);
  if (idx <= 0) return true;
  // La leçon i est déverrouillée si la leçon i-1 a un score de quiz >= PASS_THRESHOLD
  const prevId = lessonIdsInOrder[idx - 1];
  const progress = getCourseProgress(courseId);
  const score = progress.quizScores[prevId] || 0;
  const threshold = getPassThreshold ? getPassThreshold(prevId) : PASS_THRESHOLD;
  return score >= threshold;
}
