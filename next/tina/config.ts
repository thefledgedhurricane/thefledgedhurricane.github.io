import { defineConfig } from 'tinacms';

const text = (name: string, label?: string, textarea = false) => ({
  type: 'string' as const,
  name,
  label: label || name.replaceAll('_', ' '),
  ...(textarea ? { ui: { component: 'textarea' } } : {}),
});

const section = (name: string, label: string, fields: ReturnType<typeof text>[]) => ({
  type: 'object' as const,
  name,
  label,
  required: true,
  fields,
});

const metadataFields = [
  text('meta_title', 'Browser title'),
  text('meta_desc', 'Search description', true),
];

const localeField = {
  type: 'string' as const,
  name: 'locale',
  label: 'Language',
  options: [
    { value: 'ar', label: 'Arabic' },
    { value: 'fr', label: 'French' },
    { value: 'en', label: 'English' },
    { value: 'es', label: 'Spanish' },
  ],
};

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
        name: 'translation',
        label: 'Website translations',
        path: 'src/dictionaries',
        format: 'json',
        ui: {
          filename: { readonly: true },
          allowedActions: {
            create: false,
            delete: false,
            createNestedFolder: false,
          },
        },
        fields: [
          section('nav', 'Navigation', [
            text('about'), text('research'), text('teaching'), text('projects'),
            text('blog'), text('contact'), text('language'),
          ]),
          section('home', 'Home page', [
            text('hero_title'), text('hero_subtitle'), text('hero_desc', undefined, true),
            text('hero_cta_about'), text('hero_cta_contact'), text('stats_research'),
            text('stats_publications'), text('stats_projects'), text('stats_digitalization'),
            text('featured_badge'), text('featured_title'), text('featured_subtitle'),
            text('featured_desc', undefined, true), text('featured_link'), text('expertise_title'),
            text('expertise_desc', undefined, true), text('expertise_view_profile'),
            text('card_teaching_title'), text('card_teaching_desc', undefined, true),
            text('card_research_title'), text('card_research_desc', undefined, true),
            text('card_projects_title'), text('card_projects_desc', undefined, true),
            text('card_contact_title'), text('card_contact_btn'), text('teaching_badge'),
            text('teaching_title'), text('teaching_title2'), text('teaching_desc', undefined, true),
            text('teaching_cta'),
          ]),
          section('about', 'About page', [
            ...metadataFields, text('hero_badge'), text('hero_title'), text('hero_subtitle'),
            text('hero_desc', undefined, true), text('hero_cta_exp'), text('hero_cta_cv'),
            text('exp_title'), text('exp_desc', undefined, true), text('edu_title'),
            text('edu_desc', undefined, true), text('stats_research'), text('stats_publications'),
            text('stats_projects'), text('stats_digitalization'), text('cta_title'),
            text('cta_desc', undefined, true), text('cta_btn'), text('cta_publications'),
          ]),
          section('contact', 'Contact page', [
            ...metadataFields, text('badge'), text('title'), text('title_gradient'),
            text('desc', undefined, true), text('email_label'), text('location_label'),
            text('location_value'), text('social_title'), text('form_title'),
            text('form_name'), text('form_email'), text('form_subject'),
            text('form_message'), text('form_submit'), text('form_name_placeholder'),
            text('form_email_placeholder'), text('form_subject_placeholder'),
            text('form_message_placeholder'), text('form_sending'), text('form_error', undefined, true),
            text('form_name_error'), text('form_email_error'), text('form_subject_error'),
            text('form_message_error'), text('success_title'), text('success_message', undefined, true),
            text('success_follow'), text('success_close'),
          ]),
          ...['publications', 'projects', 'posts', 'events'].map((name) =>
            section(name, `${name[0].toUpperCase()}${name.slice(1)} page`, [
              ...metadataFields, text('badge'), text('title'), text('title_gradient'),
              text('desc', undefined, true),
            ]),
          ),
          section('teaching', 'Teaching page', [
            ...metadataFields, text('badge'), text('title'), text('title_gradient'),
            text('desc', undefined, true), text('courses_title'), text('explore_btn'),
          ]),
          section('footer', 'Footer', [text('tagline', undefined, true), text('rights')]),
        ],
      },
      {
        name: 'post',
        label: 'Blog posts',
        path: 'content/posts',
        format: 'mdx',
        ui: {
          filename: { slugify: (values) => values?.slug || 'new-post' },
        },
        fields: [
          localeField,
          text('translationKey', 'Translation key'),
          text('slug', 'URL slug'),
          { type: 'string', name: 'title', label: 'Title', isTitle: true, required: true },
          text('description', 'Summary', true),
          { type: 'datetime', name: 'publishedAt', label: 'Published at', required: true },
          { type: 'number', name: 'readingTime', label: 'Reading time (minutes)', required: true },
          text('category'),
          { type: 'string', name: 'tags', label: 'Tags', list: true },
          { type: 'boolean', name: 'featured', label: 'Featured' },
          { type: 'image', name: 'image', label: 'Hero image' },
          { type: 'rich-text', name: 'body', label: 'Article', isBody: true, required: true },
        ],
      },
      {
        name: 'project',
        label: 'Projects',
        path: 'content/projects',
        format: 'mdx',
        ui: {
          filename: { slugify: (values) => values?.slug || 'new-project' },
        },
        fields: [
          localeField,
          text('translationKey', 'Translation key'),
          text('slug', 'URL slug'),
          { type: 'string', name: 'title', label: 'Title', isTitle: true, required: true },
          text('description', 'Summary', true),
          text('category'),
          text('status'),
          { type: 'string', name: 'technologies', label: 'Technologies', list: true },
          text('year'),
          { type: 'string', name: 'githubUrl', label: 'GitHub URL' },
          { type: 'string', name: 'liveUrl', label: 'Live URL' },
          { type: 'boolean', name: 'featured', label: 'Featured' },
          { type: 'image', name: 'image', label: 'Hero image' },
          { type: 'rich-text', name: 'body', label: 'Project details', isBody: true, required: true },
        ],
      },
      {
        name: 'publication',
        label: 'Publications',
        path: 'content/publications',
        format: 'json',
        ui: { filename: { slugify: (values) => values?.publicationId || 'publication' } },
        fields: [
          localeField,
          text('translationKey', 'Translation key'),
          text('publicationId', 'Publication ID'),
          { type: 'string', name: 'title', label: 'Title', isTitle: true, required: true },
          { type: 'string', name: 'authors', label: 'Authors', list: true, required: true },
          text('venue'),
          text('year'),
          text('abstract', 'Abstract', true),
          { type: 'string', name: 'doi', label: 'DOI' },
          { type: 'string', name: 'url', label: 'Publication URL' },
          { type: 'string', name: 'tags', label: 'Tags', list: true },
        ],
      },
      {
        name: 'event',
        label: 'Events',
        path: 'content/events',
        format: 'json',
        ui: { filename: { slugify: (values) => values?.eventId || 'event' } },
        fields: [
          localeField,
          text('translationKey', 'Translation key'),
          text('eventId', 'Event ID'),
          { type: 'string', name: 'title', label: 'Title', isTitle: true, required: true },
          text('description', undefined, true),
          { type: 'datetime', name: 'startsAt', label: 'Starts at', required: true },
          { type: 'datetime', name: 'endsAt', label: 'Ends at' },
          text('location'),
          text('eventType', 'Event type'),
          { type: 'string', name: 'url', label: 'Event URL' },
          { type: 'image', name: 'image', label: 'Image' },
        ],
      },
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
          localeField,
          { type: 'string', name: 'translationKey', label: 'Translation key' },
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
            options: ['Software Engineering', 'Data Science', 'Data Engineering'],
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
                type: 'string',
                name: 'type',
                label: 'Lesson Type',
                options: ['text', 'interactive', 'quiz', 'video'],
              },
              {
                type: 'string',
                name: 'interactiveCategory',
                label: 'Interactive Category',
                options: ['algorithms', 'dataStructures', 'graphs', 'math', 'all'],
              },
              { type: 'string', name: 'interactiveId', label: 'Interactive ID' },
              { type: 'string', name: 'cheatSheet', label: 'Cheat Sheet', ui: { component: 'textarea' } },
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
