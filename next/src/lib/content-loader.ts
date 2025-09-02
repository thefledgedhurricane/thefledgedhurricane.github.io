import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const contentDirectory = path.join(process.cwd(), 'content');

export interface LessonContent {
  content: string;
  metadata?: {
    [key: string]: any;
  };
}

export async function loadLessonContent(lessonId: string): Promise<LessonContent> {
  try {
    const filePath = path.join(contentDirectory, 'lessons', `${lessonId}.md`);
    
    if (!fs.existsSync(filePath)) {
      // Fallback to inline content if file doesn't exist
      return { content: `<p>Contenu en cours de migration pour ${lessonId}</p>` };
    }

    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContents);
    
    // Process markdown to HTML
    const processedContent = await remark()
      .use(html, { sanitize: false })
      .process(content);
    
    return {
      content: processedContent.toString(),
      metadata: data,
    };
  } catch (error) {
    console.error(`Error loading lesson content for ${lessonId}:`, error);
    return { content: `<p>Erreur de chargement du contenu pour ${lessonId}</p>` };
  }
}

export function getAllLessonIds(): string[] {
  const lessonsDirectory = path.join(contentDirectory, 'lessons');
  
  if (!fs.existsSync(lessonsDirectory)) {
    return [];
  }
  
  const fileNames = fs.readdirSync(lessonsDirectory);
  return fileNames
    .filter(fileName => fileName.endsWith('.md'))
    .map(fileName => fileName.replace(/\.md$/, ''));
}
