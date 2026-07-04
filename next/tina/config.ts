import { defineConfig } from 'tinacms';

const branch =
  process.env.GITHUB_HEAD_REF ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD ||
  'main';

export default defineConfig({
  branch,
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID || '',
  token: process.env.TINA_TOKEN || '',
  build: {
    outputFolder: 'admin',
    publicFolder: 'public',
  },
  media: {
    tina: {
      mediaRoot: '',
      publicFolder: 'public',
    },
  },
  schema: {
    collections: [
      {
        name: 'course',
        label: 'Courses',
        path: 'content/courses',
        format: 'json',
        ui: {
          filename: {
            readonly: true,
            slugify: (values) => values?.courseId || 'course',
          },
        },
        fields: [
          { type: 'string', name: 'courseId', label: 'Course ID', required: true },
          { type: 'string', name: 'title', label: 'Title', isTitle: true, required: true },
          { type: 'string', name: 'subtitle', label: 'Subtitle', required: true },
          { type: 'string', name: 'description', label: 'Description', required: true, ui: { component: 'textarea' } },
          {
            type: 'string',
            name: 'level',
            label: 'Level',
            required: true,
            options: ['beginner', 'intermediate', 'advanced'],
          },
          {
            type: 'string',
            name: 'category',
            label: 'Category',
            required: true,
            options: ['Programmation', 'Web', 'Intelligence Artificielle', 'Data Science'],
          },
          { type: 'string', name: 'icon', label: 'Icon' },
          { type: 'string', name: 'color', label: 'Color' },
          { type: 'number', name: 'estimatedHours', label: 'Estimated hours', required: true },
          { type: 'string', name: 'prerequisites', label: 'Prerequisites', list: true },
          { type: 'string', name: 'learningOutcomes', label: 'Learning outcomes', list: true, required: true },
          {
            type: 'object',
            name: 'lessons',
            label: 'Lessons',
            list: true,
            required: true,
            fields: [
              { type: 'string', name: 'id', label: 'Lesson ID', required: true },
              { type: 'string', name: 'title', label: 'Title', required: true },
              { type: 'string', name: 'description', label: 'Description', ui: { component: 'textarea' } },
              { type: 'number', name: 'estimatedMinutes', label: 'Estimated minutes', required: true },
              { type: 'string', name: 'objectives', label: 'Objectives', list: true },
              { type: 'string', name: 'notebookUrl', label: 'Google Colab Notebook URL' },
              {
                type: 'object',
                name: 'sections',
                label: 'Sections',
                list: true,
                fields: [
                  { type: 'string', name: 'id', label: 'Section ID', required: true },
                  { type: 'string', name: 'title', label: 'Title', required: true },
                  { type: 'string', name: 'content', label: 'Markdown content', required: true, ui: { component: 'textarea' } },
                  { type: 'number', name: 'estimatedMinutes', label: 'Estimated minutes' },
                  { type: 'string', name: 'keyTakeaways', label: 'Key takeaways', list: true },
                  {
                    type: 'object',
                    name: 'codeExamples',
                    label: 'Code examples',
                    list: true,
                    fields: [
                      { type: 'string', name: 'title', label: 'Title', required: true },
                      { type: 'string', name: 'language', label: 'Language', required: true },
                      { type: 'string', name: 'code', label: 'Code', required: true, ui: { component: 'textarea' } },
                      { type: 'string', name: 'explanation', label: 'Explanation', ui: { component: 'textarea' } },
                      { type: 'boolean', name: 'runnable', label: 'Runnable' },
                    ],
                  },
                ],
              },
              {
                type: 'object',
                name: 'quiz',
                label: 'Quiz',
                list: true,
                fields: [
                  { type: 'string', name: 'id', label: 'Question ID', required: true },
                  { type: 'string', name: 'question', label: 'Question', required: true },
                  {
                    type: 'object',
                    name: 'options',
                    label: 'Options',
                    list: true,
                    fields: [
                      { type: 'string', name: 'id', label: 'Option ID', required: true },
                      { type: 'string', name: 'text', label: 'Text', required: true },
                    ],
                  },
                  { type: 'string', name: 'correctOptionId', label: 'Correct option ID', required: true },
                  { type: 'string', name: 'explanation', label: 'Explanation', ui: { component: 'textarea' } },
                ],
              },
              {
                type: 'object',
                name: 'practiceExercises',
                label: 'Exercises',
                list: true,
                fields: [
                  { type: 'string', name: 'title', label: 'Title', required: true },
                  { type: 'string', name: 'description', label: 'Description', required: true, ui: { component: 'textarea' } },
                  { type: 'string', name: 'difficulty', label: 'Difficulty', options: ['easy', 'medium', 'hard'] },
                  { type: 'string', name: 'hints', label: 'Hints', list: true },
                  { type: 'string', name: 'solution', label: 'Solution', ui: { component: 'textarea' } },
                ],
              },
              {
                type: 'object',
                name: 'references',
                label: 'References',
                list: true,
                fields: [
                  { type: 'string', name: 'title', label: 'Title', required: true },
                  { type: 'string', name: 'url', label: 'URL', required: true },
                  { type: 'string', name: 'type', label: 'Type', options: ['documentation', 'article', 'video', 'book'] },
                ],
              },
            ],
          },
          {
            type: 'object',
            name: 'projectIdeas',
            label: 'Project ideas',
            list: true,
            fields: [
              { type: 'string', name: 'title', label: 'Title', required: true },
              { type: 'string', name: 'description', label: 'Description', required: true, ui: { component: 'textarea' } },
              { type: 'string', name: 'difficulty', label: 'Difficulty', options: ['easy', 'medium', 'hard'] },
            ],
          },
        ],
      },
    ],
  },
});
