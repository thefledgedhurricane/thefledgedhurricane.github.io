import { createClient } from '@sanity/client'

const client = createClient({
  projectId: process.env.SANITY_STUDIO_PROJECT_ID || 'quz6kxvy',
  dataset: process.env.SANITY_STUDIO_DATASET || 'production',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
  apiVersion: '2023-05-03',
})

async function createSampleData() {
  try {
    console.log('Creating sample data for revised academic portfolio schema...')

    // Create sample authors
    const authors = await Promise.all([
      client.create({
        _type: 'author',
        name: 'Pr. John Smith',
        slug: { current: 'john-smith' },
        bio: 'Professor of Computer Science specializing in AI and Machine Learning',
        email: 'john.smith@university.edu',
        website: 'https://johnsmith.edu',
        socialLinks: {
          github: 'https://github.com/johnsmith',
          linkedin: 'https://linkedin.com/in/johnsmith',
        },
        expertise: ['Artificial Intelligence', 'Machine Learning', 'Data Science'],
        featured: true,
        displayOrder: 1,
      }),
      client.create({
        _type: 'author',
        name: 'Pr. Marie Dubois',
        slug: { current: 'marie-dubois' },
        bio: 'Research Scientist in Natural Language Processing',
        email: 'marie.dubois@research.fr',
        socialLinks: {
          github: 'https://github.com/mariedubois',
        },
        expertise: ['Natural Language Processing', 'Computational Linguistics'],
        featured: false,
        displayOrder: 2,
      }),
    ])

    console.log('✓ Created sample authors')

    // Create sample publications
    await Promise.all([
      client.create({
        _type: 'publication',
        title: 'Enhancement: Revise Journal Quality Analyzer article',
        slug: { current: 'journal-quality-analyzer-enhancement' },
        abstract: 'This paper presents an enhanced approach to analyzing journal quality metrics using machine learning techniques.',
        authors: [{ _type: 'reference', _ref: authors[0]._id }],
        publicationType: 'journal',
        journal: 'Journal of Academic Research',
        publishedDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 5 days ago
        language: 'en',
        keywords: ['journal analysis', 'quality metrics', 'machine learning'],
        urls: {
          pdf: 'https://example.com/paper.pdf',
          github: 'https://github.com/example/journal-analyzer',
        },
        status: 'published',
        featured: true,
        openAccess: true,
        peerReviewed: true,
      }),
      client.create({
        _type: 'publication',
        title: 'French Version Research Article',
        slug: { current: 'french-research-article' },
        abstract: 'Une approche innovante pour l\'analyse de données en français.',
        authors: [{ _type: 'reference', _ref: authors[1]._id }],
        publicationType: 'conference',
        journal: 'Conférence Française d\'IA',
        publishedDate: new Date(Date.now() - 8 * 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 8 months ago
        language: 'fr',
        keywords: ['analyse de données', 'intelligence artificielle'],
        status: 'published',
        featured: false,
        openAccess: false,
        peerReviewed: true,
      }),
    ])

    console.log('✓ Created sample publications')

    // Create sample events
    await Promise.all([
      client.create({
        _type: 'event',
        title: 'AI Research Conference 2024',
        slug: { current: 'ai-research-conference-2024' },
        description: 'Annual conference on artificial intelligence research and applications.',
        eventType: 'conference',
        startDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days from now
        endDate: new Date(Date.now() + 32 * 24 * 60 * 60 * 1000).toISOString(), // 32 days from now
        location: {
          venue: 'Convention Center',
          city: 'San Francisco',
          country: 'USA',
          isVirtual: false,
        },
        organizer: 'AI Research Society',
        website: 'https://aiconf2024.com',
        speakers: [{ _type: 'reference', _ref: authors[0]._id }],
        tags: ['AI', 'research', 'conference'],
        status: 'upcoming',
        featured: true,
        publishedAt: new Date().toISOString(),
      }),
    ])

    console.log('✓ Created sample events')

    // Create sample teaching entries
    await Promise.all([
      client.create({
        _type: 'teaching',
        title: 'Introduction to Machine Learning',
        slug: { current: 'intro-machine-learning' },
        courseCode: 'CS 229',
        description: 'Comprehensive introduction to machine learning algorithms and applications.',
        teachingType: 'undergraduate',
        institution: 'Stanford University',
        department: 'Computer Science',
        level: 'intermediate',
        subjects: ['Machine Learning', 'Statistics', 'Python Programming'],
        technologies: ['Python', 'scikit-learn', 'TensorFlow', 'Jupyter'],
        startDate: new Date(Date.now() - 4 * 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 4 months ago
        endDate: new Date(Date.now() - 1 * 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 1 month ago
        semester: 'Fall 2023',
        studentCount: 150,
        role: 'instructor',
        evaluations: {
          averageRating: 4.7,
          responseRate: 85,
          highlights: ['Clear explanations', 'Practical examples', 'Helpful office hours'],
        },
        achievements: ['Best Teaching Award 2023'],
        language: 'en',
        featured: true,
        current: false,
      }),
    ])

    console.log('✓ Created sample teaching entries')

    // Create sample posts with authors
    await Promise.all([
      client.create({
        _type: 'post',
        title: 'Get Started with Your Academic Journey',
        slug: { current: 'get-started' },
        excerpt: 'A comprehensive guide for new researchers entering academia.',
        content: [
          {
            _type: 'block',
            _key: 'block1',
            style: 'normal',
            children: [
              {
                _type: 'span',
                _key: 'span1',
                text: 'Academic research can be challenging but rewarding. This guide will help you get started with your research journey.',
                marks: [],
              },
            ],
          },
        ],
        authors: [{ _type: 'reference', _ref: authors[0]._id }],
        tags: ['research', 'academia', 'guide'],
        language: 'en',
        category: 'Education',
        featured: true,
        readingTime: 5,
        publishedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days ago
      }),
      client.create({
        _type: 'post',
        title: 'Building Your Second Brain: A Digital Knowledge System',
        slug: { current: 'second-brain' },
        excerpt: 'Learn how to create a digital second brain for managing knowledge and research.',
        content: [
          {
            _type: 'block',
            _key: 'block1',
            style: 'normal',
            children: [
              {
                _type: 'span',
                _key: 'span1',
                text: 'A second brain is a digital extension of your mind that helps you capture, organize, and retrieve information efficiently.',
                marks: [],
              },
            ],
          },
        ],
        authors: [{ _type: 'reference', _ref: authors[0]._id }],
        tags: ['productivity', 'knowledge management', 'digital tools'],
        language: 'en',
        category: 'Productivity',
        featured: true,
        readingTime: 8,
        publishedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days ago
      }),
    ])

    console.log('✓ Created sample posts')

    // Update settings
    const existingSettings = await client.fetch('*[_type == "settings"][0]')
    if (existingSettings) {
      await client.patch(existingSettings._id).set({
        navigation: [
          { title: 'Home', href: '/', external: false },
          { title: 'Publications', href: '/publications', external: false },
          { title: 'Teaching', href: '/teaching', external: false },
          { title: 'Events', href: '/events', external: false },
          { title: 'Projects', href: '/projects', external: false },
          { title: 'Posts', href: '/posts', external: false },
          { title: 'About', href: '/about', external: false },
        ],
      }).commit()
      console.log('✓ Updated navigation settings')
    }

    console.log('\n🎉 Sample data created successfully!')
    console.log('\nNew content types available:')
    console.log('- Authors: Manage author profiles and information')
    console.log('- Publications: Academic papers, articles, and research')
    console.log('- Events: Conferences, workshops, and academic events')
    console.log('- Teaching: Courses, lectures, and educational activities')
    console.log('- Enhanced Posts: Now with author references and language support')

  } catch (error) {
    console.error('Error creating sample data:', error)
  }
}

createSampleData()