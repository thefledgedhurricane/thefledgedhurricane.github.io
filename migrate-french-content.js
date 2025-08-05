#!/usr/bin/env node

import { createClient } from '@sanity/client'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Configuration
const SANITY_PROJECT_ID = 'quz6kxvy'
const SANITY_DATASET = 'production'
const SANITY_TOKEN = process.env.SANITY_TOKEN || 'skkcyZnwieB2WukTFVvhGAaJRq9UagSYV9xyc3f5s9nElhCKZmwKzfcEsTL4SCk6oyodBSTUdpwbDJ2E2gmRe4n4JrrXLqqZBxGNCmAq9tLLnxrjiTyZwR2s7fmLRfmLTHw3P0KERSiuafJxLGW5DBS65c0ZTzUPVXIvsrx0mMc9pMW8cThZ'
const CONTENT_DIR = path.join(__dirname, 'content/fr')

// Initialize Sanity client
const client = createClient({
  projectId: SANITY_PROJECT_ID,
  dataset: SANITY_DATASET,
  useCdn: false,
  apiVersion: '2024-01-01',
  token: SANITY_TOKEN
})

// Utility functions
function generateSlug(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

function parseDate(dateString) {
  if (!dateString) return new Date().toISOString()
  const date = new Date(dateString)
  return isNaN(date.getTime()) ? new Date().toISOString() : date.toISOString()
}

function mapPublicationType(type) {
  const typeMap = {
    '1': 'conference',
    '2': 'journal',
    '3': 'preprint',
    '4': 'report',
    '5': 'book',
    '6': 'book_section',
    '7': 'thesis',
    '8': 'patent'
  }
  return typeMap[type] || 'journal'
}

function mapProjectCategory(category) {
  const categoryMap = {
    'web': 'web',
    'mobile': 'mobile',
    'research': 'research',
    'design': 'design',
    'data': 'data',
    'machine-learning': 'data',
    'ai': 'research'
  }
  return categoryMap[category] || 'other'
}

// Migration functions
async function migratePublications() {
  console.log('🔄 Migrating French publications...')
  const publicationsDir = path.join(CONTENT_DIR, 'publication')
  
  if (!fs.existsSync(publicationsDir)) {
    console.log('❌ Publications directory not found')
    return
  }

  const folders = fs.readdirSync(publicationsDir).filter(item => {
    const itemPath = path.join(publicationsDir, item)
    return fs.statSync(itemPath).isDirectory()
  })

  for (const folder of folders) {
    const indexPath = path.join(publicationsDir, folder, 'index.md')
    if (!fs.existsSync(indexPath)) continue

    try {
      const content = fs.readFileSync(indexPath, 'utf8')
      const { data, content: body } = matter(content)

      // Create author references (assuming admin author exists)
      const authorRefs = (data.authors || ['admin']).map(author => ({
        _type: 'reference',
        _ref: `author-${generateSlug(author)}`
      }))

      const publication = {
        _type: 'publication',
        _id: `publication-fr-${folder}`,
        title: data.title || 'Sans titre',
        slug: { current: generateSlug(data.title || folder) },
        authors: authorRefs,
        abstract: data.abstract || body.replace(/<!--more-->/g, '').trim(),
        content: [{
          _type: 'block',
          _key: 'content1',
          style: 'normal',
          children: [{
            _type: 'span',
            text: body.replace(/<!--more-->/g, '').trim()
          }]
        }],
        publicationType: mapPublicationType(data.publication_types?.[0]) || 'journal',
        journal: data.publication || null,
        publicationDate: parseDate(data.date),
        doi: data.doi || null,
        url: data.links?.[0]?.url || null,
        language: 'fr',
        featured: data.featured || false
      }

      await client.createOrReplace(publication)
      console.log(`✅ Migrated publication: ${publication.title}`)
    } catch (error) {
      console.error(`❌ Error migrating publication ${folder}:`, error.message)
    }
  }
}

async function migratePosts() {
  console.log('🔄 Migrating French posts...')
  const postsDir = path.join(CONTENT_DIR, 'post')
  
  if (!fs.existsSync(postsDir)) {
    console.log('❌ Posts directory not found')
    return
  }

  const folders = fs.readdirSync(postsDir).filter(item => {
    const itemPath = path.join(postsDir, item)
    return fs.statSync(itemPath).isDirectory()
  })

  for (const folder of folders) {
    const indexPath = path.join(postsDir, folder, 'index.md')
    if (!fs.existsSync(indexPath)) continue

    try {
      const content = fs.readFileSync(indexPath, 'utf8')
      const { data, content: body } = matter(content)

      // Create author references
      const authorRefs = (data.authors || ['admin']).map(author => ({
        _type: 'reference',
        _ref: `author-${generateSlug(author)}`
      }))

      const post = {
        _type: 'post',
        _id: `post-fr-${folder}`,
        title: data.title || 'Sans titre',
        slug: { current: generateSlug(data.title || folder) },
        excerpt: (data.summary || body.substring(0, 200)).substring(0, 200),
        content: [{
          _type: 'block',
          _key: 'content1',
          style: 'normal',
          children: [{
            _type: 'span',
            text: body.replace(/<!--more-->/g, '').trim()
          }]
        }],
        publishedAt: parseDate(data.date),
        tags: data.tags || [],
        authors: authorRefs,
        language: 'fr',
        featured: data.featured || false,
        readingTime: Math.ceil(body.split(' ').length / 200)
      }

      await client.createOrReplace(post)
      console.log(`✅ Migrated post: ${post.title}`)
    } catch (error) {
      console.error(`❌ Error migrating post ${folder}:`, error.message)
    }
  }
}

async function migrateProjects() {
  console.log('🔄 Migrating French projects...')
  const projectsDir = path.join(CONTENT_DIR, 'project')
  
  if (!fs.existsSync(projectsDir)) {
    console.log('❌ Projects directory not found')
    return
  }

  const folders = fs.readdirSync(projectsDir).filter(item => {
    const itemPath = path.join(projectsDir, item)
    return fs.statSync(itemPath).isDirectory()
  })

  for (const folder of folders) {
    const indexPath = path.join(projectsDir, folder, 'index.md')
    if (!fs.existsSync(indexPath)) continue

    try {
      const content = fs.readFileSync(indexPath, 'utf8')
      const { data, content: body } = matter(content)

      const project = {
        _type: 'project',
        _id: `project-fr-${folder}`,
        title: data.title || 'Sans titre',
        slug: { current: generateSlug(data.title || folder) },
        description: body.replace(/<!--more-->/g, '').trim(),
        content: [{
          _type: 'block',
          _key: 'content1',
          style: 'normal',
          children: [{
            _type: 'span',
            text: body.replace(/<!--more-->/g, '').trim()
          }]
        }],
        technologies: data.tags || [],
        category: mapProjectCategory(data.category) || 'other',
        status: 'completed',
        startDate: parseDate(data.date),
        liveUrl: data.external_link || null,
        githubUrl: data.github_url || null,
        language: 'fr',
        featured: data.featured || false
      }

      await client.createOrReplace(project)
      console.log(`✅ Migrated project: ${project.title}`)
    } catch (error) {
      console.error(`❌ Error migrating project ${folder}:`, error.message)
    }
  }
}

async function migrateTeaching() {
  console.log('🔄 Migrating French teaching content...')
  const teachingDir = path.join(CONTENT_DIR, 'teaching')
  
  if (!fs.existsSync(teachingDir)) {
    console.log('❌ Teaching directory not found')
    return
  }

  // Get main teaching categories
  const categories = fs.readdirSync(teachingDir).filter(item => {
    const itemPath = path.join(teachingDir, item)
    return fs.statSync(itemPath).isDirectory()
  })

  for (const category of categories) {
    const categoryPath = path.join(teachingDir, category)
    const indexPath = path.join(categoryPath, '_index.md')
    
    if (fs.existsSync(indexPath)) {
      try {
        const content = fs.readFileSync(indexPath, 'utf8')
        const { data, content: body } = matter(content)

        const teaching = {
          _type: 'teaching',
          _id: `teaching-fr-${generateSlug(category)}`,
          title: data.title || 'Sans titre',
          slug: { current: generateSlug(data.title || category) },
          description: data.summary || body.replace(/<!--more-->/g, '').trim(),
          content: [{
            _type: 'block',
            _key: 'content1',
            style: 'normal',
            children: [{
              _type: 'span',
              text: body.replace(/<!--more-->/g, '').trim()
            }]
          }],
          teachingType: 'undergraduate',
          institution: 'Université',
          startDate: parseDate(data.date) || new Date().toISOString().split('T')[0],
          language: 'fr',
          featured: data.featured || false
        }

        await client.createOrReplace(teaching)
        console.log(`✅ Migrated teaching category: ${teaching.title}`)
      } catch (error) {
        console.error(`❌ Error migrating teaching category ${category}:`, error.message)
      }
    }

    // Migrate individual courses within the category
    const courses = fs.readdirSync(categoryPath).filter(item => {
      const itemPath = path.join(categoryPath, item)
      return fs.statSync(itemPath).isDirectory()
    })

    for (const course of courses) {
      const coursePath = path.join(categoryPath, course)
      const courseIndexPath = path.join(coursePath, 'index.md')
      
      if (fs.existsSync(courseIndexPath)) {
        try {
          const content = fs.readFileSync(courseIndexPath, 'utf8')
          const { data, content: body } = matter(content)

          // Create a safe ID by removing special characters
          const safeId = `course-fr-${generateSlug(category)}-${generateSlug(course)}`
          
          const courseDoc = {
            _type: 'teaching',
            _id: safeId,
            title: data.title || course.replace(/-/g, ' '),
            slug: { current: generateSlug(data.title || course) },
            description: data.summary || body.replace(/<!--more-->/g, '').trim(),
            content: [{
              _type: 'block',
              _key: 'content1',
              style: 'normal',
              children: [{
                _type: 'span',
                text: body.replace(/<!--more-->/g, '').trim()
              }]
            }],
            teachingType: 'undergraduate',
            institution: 'Université',
            startDate: parseDate(data.date) || new Date().toISOString().split('T')[0],
            subjects: data.tags || [],
            language: 'fr',
            featured: data.featured || false
          }

          await client.createOrReplace(courseDoc)
          console.log(`✅ Migrated course: ${courseDoc.title}`)
        } catch (error) {
          console.error(`❌ Error migrating course ${course}:`, error.message)
        }
      }
    }
  }
}

async function migrateEvents() {
  console.log('🔄 Migrating French events...')
  const eventsDir = path.join(CONTENT_DIR, 'event')
  
  if (!fs.existsSync(eventsDir)) {
    console.log('❌ Events directory not found')
    return
  }

  const folders = fs.readdirSync(eventsDir).filter(item => {
    const itemPath = path.join(eventsDir, item)
    return fs.statSync(itemPath).isDirectory()
  })

  for (const folder of folders) {
    const indexPath = path.join(eventsDir, folder, 'index.md')
    if (!fs.existsSync(indexPath)) continue

    try {
      const content = fs.readFileSync(indexPath, 'utf8')
      const { data, content: body } = matter(content)

      const event = {
        _type: 'event',
        _id: `event-fr-${folder}`,
        title: data.title || 'Sans titre',
        slug: { current: generateSlug(data.title || folder) },
        description: data.summary || body.replace(/<!--more-->/g, '').trim(),
        content: [{
          _type: 'block',
          _key: 'content1',
          style: 'normal',
          children: [{
            _type: 'span',
            text: body.replace(/<!--more-->/g, '').trim()
          }]
        }],
        eventType: 'presentation',
        startDate: parseDate(data.date || data.event_date) || new Date().toISOString(),
        endDate: data.end_date ? parseDate(data.end_date) : null,
        location: {
          venue: data.location || 'Non spécifié',
          city: data.city || null,
          country: data.country || null
        },
        url: data.event_url || data.url || null,
        language: 'fr',
        featured: data.featured || false
      }

      await client.createOrReplace(event)
      console.log(`✅ Migrated event: ${event.title}`)
    } catch (error) {
      console.error(`❌ Error migrating event ${folder}:`, error.message)
    }
  }
}

// Create required authors if they don't exist
async function createRequiredAuthors() {
  const authors = [
    {
      _type: 'author',
      _id: 'author-admin',
      name: 'Admin',
      slug: { current: 'admin' },
      bio: 'Site administrator',
      email: 'admin@example.com'
    },
    {
      _type: 'author',
      _id: 'author-ihababdelbasset-annaki',
      name: 'Ihab Abdelbasset Annaki',
      slug: { current: 'ihababdelbasset-annaki' },
      bio: 'Researcher and academic',
      email: 'ihab.annaki@example.com'
    },
    {
      _type: 'author',
      _id: 'author-ted',
      name: 'Ted',
      slug: { current: 'ted' },
      bio: 'Content contributor',
      email: 'ted@example.com'
    }
  ]
  
  for (const author of authors) {
    try {
      await client.createIfNotExists(author)
      console.log(`✅ Author ${author.name} created/verified`)
    } catch (error) {
      console.log(`⚠️ Author ${author.name} creation skipped:`, error.message)
    }
  }
}

// Main migration function
async function main() {
  console.log('🚀 Starting French content migration to Sanity...')
  console.log(`📁 Content directory: ${CONTENT_DIR}`)
  console.log(`🎯 Sanity project: ${SANITY_PROJECT_ID}/${SANITY_DATASET}`)
  console.log(`🔑 Using token: ${SANITY_TOKEN.substring(0, 10)}...`)
  
  // Create required authors first
  await createRequiredAuthors()
  
  if (SANITY_TOKEN === 'YOUR_TOKEN_HERE') {
    console.error('❌ Please set your SANITY_TOKEN environment variable')
    process.exit(1)
  }

  try {
    // Test connection
    console.log('🔄 Testing Sanity connection...')
    await client.fetch('*[_type == "publication"][0]')
    console.log('✅ Connected to Sanity')

    // Run migrations
    console.log('\n📚 Starting migrations...')
    await migratePublications()
    await migratePosts()
    await migrateProjects()
    await migrateTeaching()
    await migrateEvents()

    console.log('\n🎉 French content migration completed successfully!')
    console.log('\n📊 Migration Summary:')
    console.log('- Publications migrated from content/fr/publication/')
    console.log('- Posts migrated from content/fr/post/')
    console.log('- Projects migrated from content/fr/project/')
    console.log('- Teaching content migrated from content/fr/teaching/')
    console.log('- Events migrated from content/fr/event/')
    console.log('\n🌐 Visit your Sanity Studio at: https://iannaki-portfolio.sanity.studio/')
  } catch (error) {
    console.error('❌ Migration failed:', error.message)
    console.error('Stack trace:', error.stack)
    process.exit(1)
  }
}

// Run if called directly
const isMainModule = process.argv[1] && import.meta.url === `file://${process.argv[1]}`
const isDirectExecution = process.argv[1] && process.argv[1].endsWith('migrate-french-content.js')

console.log('🔍 Debug info:')
console.log('  import.meta.url:', import.meta.url)
console.log('  process.argv[1]:', process.argv[1])
console.log('  isMainModule:', isMainModule)
console.log('  isDirectExecution:', isDirectExecution)

if (isMainModule || isDirectExecution) {
  console.log('🔧 Script started, calling main function...')
  main().catch(error => {
    console.error('❌ Unhandled error:', error)
    process.exit(1)
  })
} else {
  console.log('📦 Script loaded as module')
}

export { main as migrateFrenchContent }