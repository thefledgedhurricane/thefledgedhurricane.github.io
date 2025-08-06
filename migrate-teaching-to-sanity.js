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
    } else if (trimmedLine.startsWith('#### ')) {
      blocks.push({
        _type: 'block',
        _key: uuidv4(),
        style: 'h4',
        children: [{
          _type: 'span',
          _key: uuidv4(),
          text: trimmedLine.substring(5),
          marks: []
        }]
      });
    } else if (trimmedLine.startsWith('- ') || trimmedLine.startsWith('* ')) {
      // Handle list items
      blocks.push({
        _type: 'block',
        _key: uuidv4(),
        style: 'normal',
        listItem: 'bullet',
        children: [{
          _type: 'span',
          _key: uuidv4(),
          text: trimmedLine.substring(2),
          marks: []
        }]
      });
    } else if (/^\d+\. /.test(trimmedLine)) {
      // Handle numbered list items
      blocks.push({
        _type: 'block',
        _key: uuidv4(),
        style: 'normal',
        listItem: 'number',
        children: [{
          _type: 'span',
          _key: uuidv4(),
          text: trimmedLine.replace(/^\d+\. /, ''),
          marks: []
        }]
      });
    } else if (trimmedLine !== '<!--more-->' && trimmedLine !== '---') {
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

// Function to determine teaching type from content or folder structure
function determineTeachingType(frontMatter, folderName) {
  const tags = frontMatter.tags || [];
  const title = (frontMatter.title || '').toLowerCase();
  const folder = folderName.toLowerCase();
  
  if (tags.includes('TP') || title.includes('pratique') || title.includes('lab')) {
    return 'lab';
  }
  if (tags.includes('Cours') || title.includes('cours') || folder.includes('cours')) {
    return 'undergraduate';
  }
  if (title.includes('atelier') || folder.includes('workshop')) {
    return 'workshop';
  }
  if (title.includes('tutoriel') || folder.includes('tutorial')) {
    return 'tutorial';
  }
  
  return 'undergraduate'; // default
}

// Function to determine level from content
function determineLevel(frontMatter, content) {
  const tags = frontMatter.tags || [];
  const text = ((frontMatter.title || '') + ' ' + (frontMatter.summary || '') + ' ' + content).toLowerCase();
  
  if (tags.includes('Débutant') || text.includes('débutant') || text.includes('introduction') || text.includes('bases')) {
    return 'beginner';
  }
  if (tags.includes('Avancé') || text.includes('avancé') || text.includes('advanced')) {
    return 'advanced';
  }
  if (tags.includes('Intermédiaire') || text.includes('intermédiaire')) {
    return 'intermediate';
  }
  
  return 'beginner'; // default for most courses
}

// Function to migrate a single teaching course
async function migrateTeaching(coursePath, courseName, parentFolder = '') {
  try {
    const indexPath = path.join(coursePath, 'index.md');
    
    if (!fs.existsSync(indexPath)) {
      console.log(`Skipping ${courseName}: no index.md found`);
      return null;
    }

    const fileContent = fs.readFileSync(indexPath, 'utf8');
    const { data: frontMatter, content } = matter(fileContent);

    // Skip collection/index files
    if (frontMatter.type === 'collection') {
      console.log(`Skipping collection file: ${courseName}`);
      return null;
    }

    const teachingType = determineTeachingType(frontMatter, parentFolder);
    const level = determineLevel(frontMatter, content);

    // Create teaching document
    const teachingDoc = {
      _type: 'teaching',
      _id: uuidv4(),
      title: frontMatter.title || courseName,
      slug: {
        _type: 'slug',
        current: createSlug(frontMatter.title || courseName)
      },
      description: frontMatter.summary || content.split('\n')[0] || '',
      content: markdownToPortableText(content),
      publishedAt: frontMatter.date ? new Date(frontMatter.date).toISOString() : new Date().toISOString(),
      startDate: frontMatter.date ? new Date(frontMatter.date).toISOString() : new Date().toISOString(),
      tags: frontMatter.tags || [],
      teachingType: teachingType,
      level: level,
      role: 'instructor', // default role
      status: 'published',
      institution: frontMatter.institution || 'Université',
      course: frontMatter.course || parentFolder || 'Course',
      credits: frontMatter.credits || null
    };

    // Check if featured image exists
    const featuredImagePath = path.join(coursePath, 'featured.png');
    const featuredImageJpgPath = path.join(coursePath, 'featured.jpg');
    
    if (fs.existsSync(featuredImagePath) || fs.existsSync(featuredImageJpgPath)) {
      const imagePath = fs.existsSync(featuredImagePath) ? featuredImagePath : featuredImageJpgPath;
      console.log(`Found featured image for ${courseName}: ${imagePath}`);
      teachingDoc.hasFeaturedImage = true;
      teachingDoc.featuredImagePath = imagePath;
    }

    return teachingDoc;
  } catch (error) {
    console.error(`Error processing teaching ${courseName}:`, error);
    return null;
  }
}

// Function to recursively find all teaching courses
function findTeachingCourses(dir, parentFolder = '') {
  const courses = [];
  
  try {
    const items = fs.readdirSync(dir);
    
    for (const item of items) {
      const itemPath = path.join(dir, item);
      const stat = fs.statSync(itemPath);
      
      if (stat.isDirectory()) {
        // Check if this directory has an index.md
        const indexPath = path.join(itemPath, 'index.md');
        if (fs.existsSync(indexPath)) {
          courses.push({
            path: itemPath,
            name: item,
            parentFolder: parentFolder
          });
        }
        
        // Recursively search subdirectories
        const subCourses = findTeachingCourses(itemPath, item);
        courses.push(...subCourses);
      }
    }
  } catch (error) {
    console.error(`Error reading directory ${dir}:`, error);
  }
  
  return courses;
}

// Main migration function
async function migrateAllTeaching() {
  try {
    const teachingDir = path.join(__dirname, 'content', 'en', 'teaching');
    
    if (!fs.existsSync(teachingDir)) {
      console.error('Teaching directory not found:', teachingDir);
      return;
    }

    const teachingCourses = findTeachingCourses(teachingDir);
    console.log(`Found ${teachingCourses.length} teaching courses`);

    const teachings = [];
    
    for (const course of teachingCourses) {
      const teaching = await migrateTeaching(course.path, course.name, course.parentFolder);
      
      if (teaching) {
        teachings.push(teaching);
        console.log(`✓ Processed teaching: ${teaching.title}`);
      }
    }

    console.log(`\nMigrating ${teachings.length} teaching courses to Sanity...`);

    // Create teachings in Sanity
    for (const teaching of teachings) {
      try {
        const result = await client.create(teaching);
        console.log(`✓ Created teaching in Sanity: ${result.title} (ID: ${result._id})`);
      } catch (error) {
        console.error(`✗ Failed to create teaching ${teaching.title}:`, error.message);
      }
    }

    console.log('\n=== Migration Summary ===');
    console.log(`Total teaching courses processed: ${teachings.length}`);
    console.log('\nNote: Featured images need to be uploaded manually to Sanity.');
    console.log('Courses with images:', teachings.filter(t => t.hasFeaturedImage).map(t => t.title));
    
  } catch (error) {
    console.error('Migration failed:', error);
  }
}

// Run migration
const isMainModule = process.argv[1] && import.meta.url === `file://${process.argv[1]}`
const isDirectExecution = process.argv[1] && process.argv[1].endsWith('migrate-teaching-to-sanity.js')

if (isMainModule || isDirectExecution) {
  console.log('Starting teaching migration to Sanity...');
  migrateAllTeaching().catch(error => {
    console.error('Migration failed:', error);
    process.exit(1);
  });
}

export { migrateAllTeaching, migrateTeaching };