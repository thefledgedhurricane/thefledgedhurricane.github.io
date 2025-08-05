import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'skill',
  title: 'Skill',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Skill Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          {title: 'Programming Languages', value: 'programming'},
          {title: 'Frontend', value: 'frontend'},
          {title: 'Backend', value: 'backend'},
          {title: 'Database', value: 'database'},
          {title: 'DevOps & Tools', value: 'devops'},
          {title: 'Design', value: 'design'},
          {title: 'Research & Analytics', value: 'research'},
          {title: 'Soft Skills', value: 'soft'},
          {title: 'Other', value: 'other'},
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'proficiency',
      title: 'Proficiency Level',
      type: 'string',
      options: {
        list: [
          {title: 'Beginner', value: 'beginner'},
          {title: 'Intermediate', value: 'intermediate'},
          {title: 'Advanced', value: 'advanced'},
          {title: 'Expert', value: 'expert'},
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'proficiencyScore',
      title: 'Proficiency Score (1-100)',
      type: 'number',
      validation: (Rule) => Rule.min(1).max(100),
      description: 'Numeric representation of skill level for charts/graphs',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      description: 'Brief description of your experience with this skill',
    }),
    defineField({
      name: 'yearsOfExperience',
      title: 'Years of Experience',
      type: 'number',
      validation: (Rule) => Rule.min(0),
    }),
    defineField({
      name: 'icon',
      title: 'Icon/Logo',
      type: 'image',
      options: {
        hotspot: true,
      },
      description: 'Icon or logo representing this skill',
    }),
    defineField({
      name: 'color',
      title: 'Brand Color',
      type: 'string',
      description: 'Hex color code for the skill (e.g., #3178C6 for TypeScript)',
    }),
    defineField({
      name: 'featured',
      title: 'Featured Skill',
      type: 'boolean',
      initialValue: false,
      description: 'Show this skill prominently on the homepage',
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Lower numbers appear first within category',
      initialValue: 0,
    }),
    defineField({
      name: 'relatedProjects',
      title: 'Related Projects',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{type: 'project'}],
        },
      ],
      description: 'Projects that showcase this skill',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      category: 'category',
      proficiency: 'proficiency',
      media: 'icon',
      featured: 'featured',
    },
    prepare(selection) {
      const {title, category, proficiency, media, featured} = selection
      return {
        title,
        subtitle: `${category} • ${proficiency}${featured ? ' • Featured' : ''}`,
        media,
      }
    },
  },
  orderings: [
    {
      title: 'Category, then Order',
      name: 'categoryOrder',
      by: [
        {field: 'category', direction: 'asc'},
        {field: 'order', direction: 'asc'},
      ],
    },
    {
      title: 'Proficiency Score, High to Low',
      name: 'proficiencyDesc',
      by: [{field: 'proficiencyScore', direction: 'desc'}],
    },
  ],
})