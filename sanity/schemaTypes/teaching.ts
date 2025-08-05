import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'teaching',
  title: 'Teaching',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Course/Teaching Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'courseCode',
      title: 'Course Code',
      type: 'string',
      description: 'Official course code (e.g., CS101, MATH205)',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
      description: 'Brief description of the course or teaching activity',
    }),
    defineField({
      name: 'content',
      title: 'Detailed Content',
      type: 'array',
      of: [
        {
          type: 'block',
        },
        {
          type: 'image',
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alternative Text',
            },
            {
              name: 'caption',
              type: 'string',
              title: 'Caption',
            },
          ],
        },
        {
          type: 'object',
          name: 'codeBlock',
          title: 'Code Block',
          fields: [
            {
              name: 'language',
              title: 'Language',
              type: 'string',
            },
            {
              name: 'code',
              title: 'Code',
              type: 'text',
            },
            {
              name: 'filename',
              title: 'Filename',
              type: 'string',
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'teachingType',
      title: 'Teaching Type',
      type: 'string',
      options: {
        list: [
          { title: 'Undergraduate Course', value: 'undergraduate' },
          { title: 'Graduate Course', value: 'graduate' },
          { title: 'Workshop', value: 'workshop' },
          { title: 'Tutorial', value: 'tutorial' },
          { title: 'Seminar', value: 'seminar' },
          { title: 'Lab Session', value: 'lab' },
          { title: 'Guest Lecture', value: 'guest' },
          { title: 'Online Course', value: 'online' },
          { title: 'Other', value: 'other' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'institution',
      title: 'Institution',
      type: 'string',
      description: 'University or organization where teaching took place',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'department',
      title: 'Department',
      type: 'string',
      description: 'Academic department or division',
    }),
    defineField({
      name: 'level',
      title: 'Academic Level',
      type: 'string',
      options: {
        list: [
          { title: 'Beginner', value: 'beginner' },
          { title: 'Intermediate', value: 'intermediate' },
          { title: 'Advanced', value: 'advanced' },
          { title: 'Mixed', value: 'mixed' },
        ],
      },
    }),
    defineField({
      name: 'subjects',
      title: 'Subjects/Topics',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Main subjects or topics covered',
    }),
    defineField({
      name: 'technologies',
      title: 'Technologies Used',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Programming languages, tools, or technologies taught',
    }),
    defineField({
      name: 'startDate',
      title: 'Start Date',
      type: 'date',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'endDate',
      title: 'End Date',
      type: 'date',
    }),
    defineField({
      name: 'semester',
      title: 'Semester/Term',
      type: 'string',
      description: 'e.g., Fall 2023, Spring 2024, Summer 2023',
    }),
    defineField({
      name: 'studentCount',
      title: 'Number of Students',
      type: 'number',
      description: 'Approximate number of students taught',
    }),
    defineField({
      name: 'role',
      title: 'Teaching Role',
      type: 'string',
      options: {
        list: [
          { title: 'Primary Instructor', value: 'instructor' },
          { title: 'Teaching Assistant', value: 'ta' },
          { title: 'Guest Lecturer', value: 'guest' },
          { title: 'Lab Instructor', value: 'lab_instructor' },
          { title: 'Tutor', value: 'tutor' },
          { title: 'Co-Instructor', value: 'co_instructor' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'syllabus',
      title: 'Syllabus',
      type: 'file',
      description: 'Upload course syllabus (PDF)',
    }),
    defineField({
      name: 'materials',
      title: 'Course Materials',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'title',
              title: 'Material Title',
              type: 'string',
            },
            {
              name: 'type',
              title: 'Material Type',
              type: 'string',
              options: {
                list: [
                  { title: 'Lecture Slides', value: 'slides' },
                  { title: 'Assignment', value: 'assignment' },
                  { title: 'Lab Exercise', value: 'lab' },
                  { title: 'Reading Material', value: 'reading' },
                  { title: 'Video', value: 'video' },
                  { title: 'Code Examples', value: 'code' },
                  { title: 'Other', value: 'other' },
                ],
              },
            },
            {
              name: 'file',
              title: 'File',
              type: 'file',
            },
            {
              name: 'url',
              title: 'External URL',
              type: 'url',
            },
            {
              name: 'description',
              title: 'Description',
              type: 'text',
              rows: 2,
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'evaluations',
      title: 'Student Evaluations',
      type: 'object',
      fields: [
        {
          name: 'averageRating',
          title: 'Average Rating',
          type: 'number',
          description: 'Average student rating (e.g., 4.5/5.0)',
        },
        {
          name: 'responseRate',
          title: 'Response Rate',
          type: 'number',
          description: 'Percentage of students who responded',
        },
        {
          name: 'highlights',
          title: 'Evaluation Highlights',
          type: 'array',
          of: [{ type: 'string' }],
          description: 'Key positive feedback points',
        },
      ],
    }),
    defineField({
      name: 'achievements',
      title: 'Teaching Achievements',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Awards, recognitions, or notable achievements',
    }),
    defineField({
      name: 'featuredImage',
      title: 'Featured Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative Text',
        }
      ],
    }),
    defineField({
      name: 'language',
      title: 'Teaching Language',
      type: 'string',
      options: {
        list: [
          { title: 'English', value: 'en' },
          { title: 'French', value: 'fr' },
          { title: 'Spanish', value: 'es' },
          { title: 'German', value: 'de' },
          { title: 'Other', value: 'other' },
        ],
      },
      initialValue: 'en',
    }),
    defineField({
      name: 'featured',
      title: 'Featured Teaching',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'current',
      title: 'Currently Teaching',
      type: 'boolean',
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'institution',
      media: 'featuredImage',
      semester: 'semester',
      type: 'teachingType',
    },
    prepare(selection) {
      const { title, subtitle, media, semester, type } = selection
      return {
        title,
        subtitle: `${type} • ${subtitle} • ${semester || 'No semester'}`,
        media,
      }
    },
  },
  orderings: [
    {
      title: 'Start Date, New',
      name: 'startDateDesc',
      by: [{ field: 'startDate', direction: 'desc' }],
    },
    {
      title: 'Start Date, Old',
      name: 'startDateAsc',
      by: [{ field: 'startDate', direction: 'asc' }],
    },
    {
      title: 'Institution',
      name: 'institutionAsc',
      by: [{ field: 'institution', direction: 'asc' }],
    },
  ],
})