import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'settings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Site Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Site Description',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required().max(160),
      description: 'Used for SEO meta description',
    }),
    defineField({
      name: 'keywords',
      title: 'SEO Keywords',
      type: 'array',
      of: [{type: 'string'}],
      options: {
        layout: 'tags',
      },
    }),
    defineField({
      name: 'author',
      title: 'Author Information',
      type: 'object',
      fields: [
        {
          name: 'name',
          title: 'Full Name',
          type: 'string',
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'title',
          title: 'Professional Title',
          type: 'string',
        },
        {
          name: 'bio',
          title: 'Bio',
          type: 'text',
          rows: 4,
        },
        {
          name: 'avatar',
          title: 'Profile Picture',
          type: 'image',
          options: {
            hotspot: true,
          },
        },
        {
          name: 'resume',
          title: 'Resume/CV',
          type: 'file',
          options: {
            accept: '.pdf,.doc,.docx',
          },
        },
      ],
    }),
    defineField({
      name: 'contact',
      title: 'Contact Information',
      type: 'object',
      fields: [
        {
          name: 'email',
          title: 'Email',
          type: 'string',
          validation: (Rule) => Rule.email(),
        },
        {
          name: 'phone',
          title: 'Phone',
          type: 'string',
        },
        {
          name: 'location',
          title: 'Location',
          type: 'string',
        },
        {
          name: 'timezone',
          title: 'Timezone',
          type: 'string',
        },
      ],
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social Links',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'platform',
              title: 'Platform',
              type: 'string',
              options: {
                list: [
                  {title: 'GitHub', value: 'github'},
                  {title: 'LinkedIn', value: 'linkedin'},
                  {title: 'Twitter/X', value: 'twitter'},
                  {title: 'Instagram', value: 'instagram'},
                  {title: 'YouTube', value: 'youtube'},
                  {title: 'Medium', value: 'medium'},
                  {title: 'Dev.to', value: 'devto'},
                  {title: 'Dribbble', value: 'dribbble'},
                  {title: 'Behance', value: 'behance'},
                  {title: 'Other', value: 'other'},
                ],
              },
            },
            {
              name: 'url',
              title: 'URL',
              type: 'url',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'username',
              title: 'Username',
              type: 'string',
            },
          ],
          preview: {
            select: {
              title: 'platform',
              subtitle: 'username',
            },
          },
        },
      ],
    }),
    defineField({
      name: 'seo',
      title: 'SEO Settings',
      type: 'object',
      fields: [
        {
          name: 'ogImage',
          title: 'Open Graph Image',
          type: 'image',
          description: 'Image for social media sharing',
          options: {
            hotspot: true,
          },
        },
        {
          name: 'twitterHandle',
          title: 'Twitter Handle',
          type: 'string',
          description: 'Without @ symbol',
        },
        {
          name: 'googleAnalyticsId',
          title: 'Google Analytics ID',
          type: 'string',
        },
      ],
    }),
    defineField({
      name: 'theme',
      title: 'Theme Settings',
      type: 'object',
      fields: [
        {
          name: 'primaryColor',
          title: 'Primary Color',
          type: 'string',
          description: 'Hex color code (e.g., #3B82F6)',
        },
        {
          name: 'secondaryColor',
          title: 'Secondary Color',
          type: 'string',
          description: 'Hex color code (e.g., #10B981)',
        },
        {
          name: 'darkMode',
          title: 'Enable Dark Mode',
          type: 'boolean',
          initialValue: true,
        },
      ],
    }),
    defineField({
      name: 'navigation',
      title: 'Navigation',
      type: 'object',
      fields: [
        {
          name: 'showBlog',
          title: 'Show Blog in Navigation',
          type: 'boolean',
          initialValue: true,
        },
        {
          name: 'showProjects',
          title: 'Show Projects in Navigation',
          type: 'boolean',
          initialValue: true,
        },
        {
          name: 'showAbout',
          title: 'Show About in Navigation',
          type: 'boolean',
          initialValue: true,
        },
        {
          name: 'showContact',
          title: 'Show Contact in Navigation',
          type: 'boolean',
          initialValue: true,
        },
      ],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Site Settings',
      }
    },
  },
})