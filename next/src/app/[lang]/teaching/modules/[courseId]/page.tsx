import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import CourseOverview from '@/components/lms/CourseOverview';
import { courses, getCourseById, type Lesson, type LessonSection } from '@/lib/lms-data';
import { locales, type Locale } from '@/lib/dictionaries';

export const dynamicParams = false;

type CoursePageProps = {
  params: Promise<{ lang: Locale; courseId: string }>;
};

const levelLabels = {
  beginner: 'Débutant',
  intermediate: 'Intermédiaire',
  advanced: 'Avancé',
} as const;

function renderCodeExamples(section: LessonSection): string {
  if (!section.codeExamples?.length) return '';

  return section.codeExamples
    .map(
      (example) =>
        `### ${example.title}\n\n\`\`\`${example.language}\n${example.code}\n\`\`\`\n\n${example.explanation || ''}`,
    )
    .join('\n\n');
}

function renderSection(section: LessonSection): string {
  const takeaways = section.keyTakeaways?.length
    ? `## Points clés\n\n${section.keyTakeaways.map((item) => `- ${item}`).join('\n')}`
    : '';

  return [`# ${section.title}`, section.content, renderCodeExamples(section), takeaways]
    .filter(Boolean)
    .join('\n\n');
}

function renderReferences(lesson: Lesson): string {
  if (!lesson.references?.length) return '';

  return `## Pour aller plus loin\n\n${lesson.references
    .map((reference) => `- [${reference.title}](${reference.url})`)
    .join('\n')}`;
}

function compileLessonContent(lesson: Lesson): string {
  const objectives = lesson.objectives.length
    ? `## Objectifs pédagogiques\n\n${lesson.objectives.map((objective) => `- ${objective}`).join('\n')}`
    : '';

  return [
    objectives,
    lesson.sections.map(renderSection).join('\n\n---\n\n'),
    renderReferences(lesson),
  ]
    .filter(Boolean)
    .join('\n\n---\n\n');
}

export function generateStaticParams() {
  return locales.flatMap((lang) =>
    courses.map((course) => ({
      lang,
      courseId: course.id,
    }))
  );
}

export async function generateMetadata({ params }: CoursePageProps): Promise<Metadata> {
  const { courseId } = await params;
  const course = getCourseById(courseId);

  if (!course) return {};

  return {
    title: course.title,
    description: course.description,
  };
}

export default async function CoursePage({ params }: CoursePageProps) {
  const { lang, courseId } = await params;
  const course = getCourseById(courseId);

  if (!course) notFound();

  const lessons = course.lessons.map((lesson) => ({
    id: lesson.id,
    title: lesson.title,
    duration: `${lesson.estimatedMinutes} min`,
    details: lesson.description,
    content: compileLessonContent(lesson),
    type: (lesson.type || 'text') as any,
    interactiveCategory: lesson.interactiveCategory,
    interactiveId: lesson.interactiveId,
    exercises: lesson.practiceExercises?.map((exercise, index) => ({
      id: `${lesson.id}-exercise-${index + 1}`,
      title: exercise.title,
      description: [
        exercise.description,
        exercise.hints?.length ? `\n\nIndices : ${exercise.hints.join(' · ')}` : '',
      ].join(''),
      solution: exercise.solution,
    })),
    quiz: lesson.quiz?.map((question) => ({
      id: question.id,
      question: question.question,
      options: question.options.map((option) => option.text),
      correctAnswer: question.options.findIndex(
        (option) => option.id === question.correctOptionId,
      ),
      explanation: question.explanation,
    })),
    cheatSheet: lesson.cheatSheet || lesson.sections
      .flatMap((section) => section.keyTakeaways || [])
      .map((item) => `• ${item}`)
      .join('\n'),
    notebookUrl: lesson.notebookUrl,
  }));

  return (
    <CourseOverview
      courseId={course.id}
      title={course.title}
      description={course.description}
      level={levelLabels[course.level]}
      duration={`${course.estimatedHours}h`}
      lessonCount={course.lessons.length}
      lessons={lessons}
      objectives={course.learningOutcomes}
      prerequisites={course.prerequisites}
    />
  );
}
