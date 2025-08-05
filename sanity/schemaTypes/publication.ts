import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'publication',
  title: 'Publication',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Publication Title',
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
      name: 'abstract',
      title: 'Abstract',
      type: 'text',
      rows: 6,
      description: 'Brief summary of the publication',
    }),
    defineField({
      name: 'content',
      title: 'Content',
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
      name: 'authors',
      title: 'Authors',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'author' }],
        },
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'publicationType',
      title: 'Publication Type',
      type: 'string',
      options: {
        list: [
          { title: 'Journal Article', value: 'journal' },
          { title: 'Conference Paper', value: 'conference' },
          { title: 'Book Chapter', value: 'chapter' },
          { title: 'Book', value: 'book' },
          { title: 'Thesis', value: 'thesis' },
          { title: 'Technical Report', value: 'report' },
          { title: 'Preprint', value: 'preprint' },
          { title: 'Blog Post', value: 'blog' },
          { title: 'Other', value: 'other' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'journal',
      title: 'Journal/Conference/Publisher',
      type: 'string',
      description: 'Name of the journal, conference, or publisher',
    }),
    defineField({
      name: 'volume',
      title: 'Volume',
      type: 'string',
    }),
    defineField({
      name: 'issue',
      title: 'Issue',
      type: 'string',
    }),
    defineField({
      name: 'pages',
      title: 'Pages',
      type: 'string',
      description: 'Page range (e.g., 123-145)',
    }),
    defineField({
      name: 'doi',
      title: 'DOI',
      type: 'string',
      description: 'Digital Object Identifier',
    }),
    defineField({
      name: 'isbn',
      title: 'ISBN',
      type: 'string',
      description: 'International Standard Book Number',
    }),
    defineField({
      name: 'publishedDate',
      title: 'Published Date',
      type: 'date',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'language',
      title: 'Language',
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
      name: 'keywords',
      title: 'Keywords',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Research keywords and topics',
    }),
    defineField({
      name: 'urls',
      title: 'URLs',
      type: 'object',
      fields: [
        {
          name: 'pdf',
          title: 'PDF URL',
          type: 'url',
        },
        {
          name: 'publisher',
          title: 'Publisher URL',
          type: 'url',
        },
        {
          name: 'arxiv',
          title: 'arXiv URL',
          type: 'url',
        },
        {
          name: 'github',
          title: 'GitHub Repository',
          type: 'url',
        },
        {
          name: 'dataset',
          title: 'Dataset URL',
          type: 'url',
        },
      ],
    }),
    defineField({
      name: 'citations',
      title: 'Citation Count',
      type: 'number',
      description: 'Number of citations (if available)',
    }),
    defineField({
      name: 'impactFactor',
      title: 'Impact Factor',
      type: 'number',
      description: 'Journal impact factor (if applicable)',
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
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'Published', value: 'published' },
          { title: 'In Press', value: 'inpress' },
          { title: 'Under Review', value: 'review' },
          { title: 'In Preparation', value: 'preparation' },
          { title: 'Draft', value: 'draft' },
        ],
      },
      initialValue: 'published',
    }),
    defineField({
      name: 'featured',
      title: 'Featured Publication',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'openAccess',
      title: 'Open Access',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'peerReviewed',
      title: 'Peer Reviewed',
      type: 'boolean',
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'journal',
      media: 'featuredImage',
      date: 'publishedDate',
      type: 'publicationType',
    },
    prepare(selection) {
      const { title, subtitle, media, date, type } = selection
      return {
        title,
        subtitle: `${type} • ${subtitle || 'No journal'} • ${new Date(date).getFullYear()}`,
        media,
      }
    },
  },
  orderings: [
    {
      title: 'Published Date, New',
      name: 'publishedDateDesc',
      by: [{ field: 'publishedDate', direction: 'desc' }],
    },
    {
      title: 'Published Date, Old',
      name: 'publishedDateAsc',
      by: [{ field: 'publishedDate', direction: 'asc' }],
    },
    {
      title: 'Citation Count',
      name: 'citationsDesc',
      by: [{ field: 'citations', direction: 'desc' }],
    },
  ],
})