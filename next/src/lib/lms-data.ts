import pythonCourseData from '../../content/courses/python.json';
import algorithmiqueCourseData from '../../content/courses/algorithmique.json';
import developpementWebCourseData from '../../content/courses/developpement-web.json';
import langageCCourseData from '../../content/courses/langage-c.json';
import iaApprentissageCourseData from '../../content/courses/ia-apprentissage.json';
import sqlDatabasesCourseData from '../../content/courses/sql-databases.json';
import dataEngineeringCourseData from '../../content/courses/data-engineering.json';

export type DemoType = 'interactive' | 'visualization' | 'code-editor' | 'notebook';

export type CodeExample = {
  title: string;
  language: 'python' | 'javascript' | 'typescript' | 'html' | 'css';
  code: string;
  explanation?: string;
  runnable?: boolean;
};

export type Demo = {
  id: string;
  type: DemoType;
  title: string;
  description: string;
  component?: string;
  notebookPath?: string;
  codeExamples?: CodeExample[];
};

export type QuizOption = {
  id: string;
  text: string;
};

export type QuizQuestion = {
  id: string;
  question: string;
  options: QuizOption[];
  correctOptionId: string;
  explanation?: string;
};

export type LessonSection = {
  id: string;
  title: string;
  content: string;
  estimatedMinutes?: number;
  demos?: Demo[];
  codeExamples?: CodeExample[];
  keyTakeaways?: string[];
};

export type PracticeExercise = {
  title: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard';
  hints?: string[];
  solution?: string;
};

export type Lesson = {
  id: string;
  title: string;
  description: string;
  estimatedMinutes: number;
  objectives: string[];
  sections: LessonSection[];
  quiz?: QuizQuestion[];
  notebookUrl?: string;
  references?: {
    title: string;
    url: string;
    type: 'documentation' | 'article' | 'video' | 'book';
  }[];
  practiceExercises?: PracticeExercise[];
  type?: 'text' | 'interactive' | 'quiz' | 'video';
  interactiveCategory?: 'algorithms' | 'dataStructures' | 'graphs' | 'math' | 'all';
  interactiveId?: string;
  cheatSheet?: string;
};

export type Course = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  category: 'Software Engineering' | 'Data Science' | 'Data Engineering';
  icon: string;
  color: string;
  estimatedHours: number;
  prerequisites?: string[];
  learningOutcomes: string[];
  lessons: Lesson[];
  projectIdeas?: {
    title: string;
    description: string;
    difficulty: 'easy' | 'medium' | 'hard';
  }[];
};

export const pythonFundamentalsCourse = {
  ...pythonCourseData,
  id: pythonCourseData.courseId,
} as Course;

export const algorithmiqueCourse = {
  ...algorithmiqueCourseData,
  id: algorithmiqueCourseData.courseId,
} as Course;

export const developpementWebCourse = {
  ...developpementWebCourseData,
  id: developpementWebCourseData.courseId,
} as Course;

export const langageCCourse = {
  ...langageCCourseData,
  id: langageCCourseData.courseId,
} as Course;

export const iaApprentissageCourse = {
  ...iaApprentissageCourseData,
  id: iaApprentissageCourseData.courseId,
} as Course;

export const sqlDatabasesCourse = {
  ...sqlDatabasesCourseData,
  id: sqlDatabasesCourseData.courseId,
} as Course;

export const dataEngineeringCourse = {
  ...dataEngineeringCourseData,
  id: dataEngineeringCourseData.courseId,
} as Course;

export const courses: Course[] = [
  algorithmiqueCourse,
  developpementWebCourse,
  langageCCourse,
  pythonFundamentalsCourse,
  iaApprentissageCourse,
  sqlDatabasesCourse,
  dataEngineeringCourse,
];

export function getCourseById(id: string): Course | undefined {
  return courses.find((course) => course.id === id);
}

export function getLessonById(
  courseId: string,
  lessonId: string,
): { course: Course; lesson: Lesson } | undefined {
  const course = getCourseById(courseId);
  if (!course) return undefined;

  const lesson = course.lessons.find((candidate) => candidate.id === lessonId);
  if (!lesson) return undefined;

  return { course, lesson };
}

export function getProgressPercentage(courseId: string, completedLessonIds: string[]): number {
  const course = getCourseById(courseId);
  if (!course || course.lessons.length === 0) return 0;

  return Math.round((completedLessonIds.length / course.lessons.length) * 100);
}
