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
const CONTENT_DIR = path.join(__dirname, 'content/en')

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

function convertMarkdownToBlocks(content) {
  if (!content) return []
  
  const blocks = []
  const lines = content.split('\n')
  let currentBlock = ''
  
  for (const line of lines) {
    if (line.trim() === '') {
      if (currentBlock.trim()) {
        blocks.push({
          _type: 'block',
          _key: Math.random().toString(36).substr(2, 9),
          style: 'normal',
          children: [{
            _type: 'span',
            _key: Math.random().toString(36).substr(2, 9),
            text: currentBlock.trim(),
            marks: []
          }]
        })
        currentBlock = ''
      }
    } else {
      currentBlock += (currentBlock ? ' ' : '') + line
    }
  }
  
  if (currentBlock.trim()) {
    blocks.push({
      _type: 'block',
      _key: Math.random().toString(36).substr(2, 9),
      style: 'normal',
      children: [{
        _type: 'span',
        _key: Math.random().toString(36).substr(2, 9),
        text: currentBlock.trim(),
        marks: []
      }]
    })
  }
  
  return blocks
}

async function migratePosts() {
  console.log('📝 Migrating posts...')
  const postsDir = path.join(CONTENT_DIR, 'post')
  
  if (!fs.existsSync(postsDir)) {
    console.log('❌ Posts directory not found')
    return
  }
  
  const postDirs = fs.readdirSync(postsDir).filter(dir => {
    const fullPath = path.join(postsDir, dir)
    return fs.statSync(fullPath).isDirectory()
  })
  
  for (const postDir of postDirs) {
    const indexPath = path.join(postsDir, postDir, 'index.md')
    
    if (!fs.existsSync(indexPath)) {
      console.log(`⚠️  No index.md found in ${postDir}`)
      continue
    }
    
    try {
      const fileContent = fs.readFileSync(indexPath, 'utf-8')
      const { data: frontmatter, content } = matter(fileContent)
      
      const post = {
        _type: 'post',
        _id: `post-${postDir}`,
        title: frontmatter.title || postDir,
        slug: { current: postDir },
        excerpt: frontmatter.summary || frontmatter.abstract || '',
        content: convertMarkdownToBlocks(content),
        publishedAt: parseDate(frontmatter.date),
        tags: frontmatter.tags || [],
        language: 'en',
        featured: frontmatter.featured || false,
        draft: frontmatter.draft || false
      }
      
      await client.createOrReplace(post)
      console.log(`✅ Migrated post: ${post.title} (${postDir})`)
    } catch (error) {
      console.error(`❌ Error migrating post ${postDir}:`, error.message)
    }
  }
}

async function createRequiredAuthors() {
  console.log('👤 Creating required authors...')
  
  const defaultAuthor = {
    _type: 'author',
    _id: 'author-default',
    name: 'Default Author',
    slug: { current: 'default-author' },
    bio: 'Default author for migrated content',
    email: 'author@example.com'
  }
  
  try {
    await client.createOrReplace(defaultAuthor)
    console.log('✅ Created default author')
  } catch (error) {
    console.error('❌ Error creating default author:', error.message)
  }
}

async function main() {
  console.log('🚀 Starting Hugo Academic to Sanity migration...')
  console.log(`📁 Content directory: ${CONTENT_DIR}`)
  
  try {
    // Test Sanity connection
    await client.fetch('*[_type == "post"] | order(_createdAt desc) [0...1]')
    console.log('✅ Sanity connection successful')
    
    // Create required authors first
    await createRequiredAuthors()
    
    // Migrate content
    await migratePosts()
    
    console.log('🎉 Migration completed successfully!')
  } catch (error) {
    console.error('❌ Migration failed:', error)
    process.exit(1)
  }
}

const isMainModule = process.argv[1] && import.meta.url === `file://${process.argv[1]}`
const isDirectExecution = process.argv[1] && process.argv[1].endsWith('migrate-content-to-sanity.js')

if (isMainModule || isDirectExecution) {
  console.log('🔧 Script started, calling main function...')
  main().catch(error => {
    console.error('💥 Fatal error:', error)
    process.exit(1)
  })
} else {
  console.log('📦 Script loaded as module')
}

export { main as migrateContent }