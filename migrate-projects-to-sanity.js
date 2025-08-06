import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { createClient } from '@sanity/client';
import { v4 as uuidv4 } from 'uuid';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const SANITY_PROJECT_ID = 'quz6kxvy'
const SANITY_DATASET = 'production'
const SANITY_TOKEN = process.env.SANITY_TOKEN || 'skkcyZnwieB2WukTFVvhGAaJRq9UagSYV9xyc3f5s9nElhCKZmwKzfcEsTL4SCk6oyodBSTUdpwbDJ2E2gmRe4n4JrrXLqqZBxGNCmAq9tLLnxrjiTyZwR2s7fmLRfmLTHw3P0KERSiuafJxLGW5DBS65c0ZTzUPVXIvsrx0mMc9pMW8cThZ'

// Initialize Sanity client
const client = createClient({
  projectId: SANITY_PROJECT_ID,
  dataset: SANITY_DATASET,
  useCdn: false,
  token: SANITY_TOKEN,
  apiVersion: '2024-01-01'
});

// Function to convert markdown content to Portable Text
function markdownToPortableText(markdown) {
  if (!markdown || markdown.trim() === '') {
    return [];
  }

  // Split content by paragraphs and headers
  const lines = markdown.split('\n').filter(line => line.trim() !== '');
  const blocks = [];

  for (const line of lines) {
    const trimmedLine = line.trim();
    
    if (trimmedLine.startsWith('# ')) {
      blocks.push({
        _type: 'block',
        _key: uuidv4(),
        style: 'h1',
        children: [{
          _type: 'span',
          _key: uuidv4(),
          text: trimmedLine.substring(2),
          marks: []
        }]
      });
    } else if (trimmedLine.startsWith('## ')) {
      blocks.push({
        _type: 'block',
        _key: uuidv4(),
        style: 'h2',
        children: [{
          _type: 'span',
          _key: uuidv4(),
          text: trimmedLine.substring(3),
          marks: []
        }]
      });
    } else if (trimmedLine.startsWith('### ')) {
      blocks.push({
        _type: 'block',
        _key: uuidv4(),
        style: 'h3',
        children: [{
          _type: 'span',
          _key: uuidv4(),
          text: trimmedLine.substring(4),
          marks: []
        }]
      });
    } else if (trimmedLine !== '<!--more-->') {
      blocks.push({
        _type: 'block',
        _key: uuidv4(),
        style: 'normal',
        children: [{
          _type: 'span',
          _key: uuidv4(),
          text: trimmedLine,
          marks: []
        }]
      });
    }
  }

  return blocks;
}

// Function to create slug from title
function createSlug(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

// Function to migrate a single project
async function migrateProject(projectPath, projectName) {
  try {
    const indexPath = path.join(projectPath, 'index.md');
    
    if (!fs.existsSync(indexPath)) {
      console.log(`Skipping ${projectName}: no index.md found`);
      return null;
    }

    const fileContent = fs.readFileSync(indexPath, 'utf8');
    const { data: frontMatter, content } = matter(fileContent);

    // Create project document
    const projectDoc = {
      _type: 'project',
      _id: uuidv4(),
      title: frontMatter.title || projectName,
      slug: {
        _type: 'slug',
        current: createSlug(frontMatter.title || projectName)
      },
      description: frontMatter.summary || content.split('\n')[0] || '',
      content: markdownToPortableText(content),
      publishedAt: frontMatter.date ? new Date(frontMatter.date).toISOString() : new Date().toISOString(),
      tags: frontMatter.tags || [],
      externalLink: frontMatter.external_link || null,
      status: 'published'
    };

    // Check if featured image exists
    const featuredImagePath = path.join(projectPath, 'featured.png');
    const featuredImageJpgPath = path.join(projectPath, 'featured.jpg');
    
    if (fs.existsSync(featuredImagePath) || fs.existsSync(featuredImageJpgPath)) {
      const imagePath = fs.existsSync(featuredImagePath) ? featuredImagePath : featuredImageJpgPath;
      console.log(`Found featured image for ${projectName}: ${imagePath}`);
      // Note: You'll need to upload images separately to Sanity
      // For now, we'll just note that an image exists
      projectDoc.hasFeaturedImage = true;
      projectDoc.featuredImagePath = imagePath;
    }

    return projectDoc;
  } catch (error) {
    console.error(`Error processing project ${projectName}:`, error);
    return null;
  }
}

// Main migration function
async function migrateAllProjects() {
  try {
    const projectsDir = path.join(__dirname, 'content', 'en', 'project');
    
    if (!fs.existsSync(projectsDir)) {
      console.error('Projects directory not found:', projectsDir);
      return;
    }

    const projectFolders = fs.readdirSync(projectsDir)
      .filter(item => {
        const itemPath = path.join(projectsDir, item);
        return fs.statSync(itemPath).isDirectory();
      });

    console.log(`Found ${projectFolders.length} project folders`);

    const projects = [];
    
    for (const folder of projectFolders) {
      const projectPath = path.join(projectsDir, folder);
      const project = await migrateProject(projectPath, folder);
      
      if (project) {
        projects.push(project);
        console.log(`✓ Processed project: ${project.title}`);
      }
    }

    console.log(`\nMigrating ${projects.length} projects to Sanity...`);

    // Create projects in Sanity
    for (const project of projects) {
      try {
        const result = await client.create(project);
        console.log(`✓ Created project in Sanity: ${result.title} (ID: ${result._id})`);
      } catch (error) {
        console.error(`✗ Failed to create project ${project.title}:`, error.message);
      }
    }

    console.log('\n=== Migration Summary ===');
    console.log(`Total projects processed: ${projects.length}`);
    console.log('\nNote: Featured images need to be uploaded manually to Sanity.');
    console.log('Projects with images:', projects.filter(p => p.hasFeaturedImage).map(p => p.title));
    
  } catch (error) {
    console.error('Migration failed:', error);
  }
}

// Run migration
const isMainModule = process.argv[1] && import.meta.url === `file://${process.argv[1]}`
const isDirectExecution = process.argv[1] && process.argv[1].endsWith('migrate-projects-to-sanity.js')

if (isMainModule || isDirectExecution) {
  console.log('Starting projects migration to Sanity...');
  migrateAllProjects().catch(error => {
    console.error('Migration failed:', error);
    process.exit(1);
  });
}

export { migrateAllProjects, migrateProject };