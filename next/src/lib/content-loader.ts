import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import remarkHtml from 'remark-html';

export type LessonContent = {
  content: string;
  metadata: {
    title?: string;
    description?: string;
    difficulty?: string;
    estimatedTime?: string;
    keywords?: string[];
  };
};

/**
 * Custom plugin to handle Mermaid code blocks
 */
function remarkMermaid() {
  return (tree: any) => {
    const visit = (node: any, callback: (node: any) => void) => {
      callback(node);
      if (node.children) {
        node.children.forEach((child: any) => visit(child, callback));
      }
    };

    visit(tree, (node: any) => {
      if (node.type === 'code' && node.lang === 'mermaid') {
        // Transform mermaid code blocks to HTML with proper class and data attribute
        node.type = 'html';
        node.value = `<pre class="mermaid-block"><code class="language-mermaid" data-mermaid="true">${node.value}</code></pre>`;
      }
    });
  };
}

/**
 * Custom plugin to enhance table styling
 */
function remarkTables() {
  return (tree: any) => {
    const visit = (node: any, callback: (node: any) => void) => {
      callback(node);
      if (node.children) {
        node.children.forEach((child: any) => visit(child, callback));
      }
    };

    visit(tree, (node: any) => {
      if (node.type === 'table') {
        // Add wrapper div for responsive tables
        const wrapper = {
          type: 'html',
          value: '<div class="table-wrapper">'
        };
        const closingWrapper = {
          type: 'html', 
          value: '</div>'
        };
        
        // Find parent and replace table with wrapped version
        node.data = {
          ...node.data,
          hProperties: {
            className: ['enhanced-table']
          }
        };
      }
    });
  };
}

/**
 * Get the content directory path
 */
function getContentDir(): string {
  return path.join(process.cwd(), '..', 'content', 'lessons');
}

/**
 * Load and parse a lesson from a Markdown file (server-side only)
 */
export async function loadLessonContent(lessonId: string): Promise<LessonContent> {
  try {
    const contentDir = getContentDir();
    const filePath = path.join(contentDir, `${lessonId}.md`);

    if (!fs.existsSync(filePath)) {
      throw new Error(`Lesson file not found: ${filePath}`);
    }

    const fileContent = fs.readFileSync(filePath, 'utf8');
    const { content, data } = matter(fileContent);

    // Convert markdown to HTML with custom plugins
    const processedContent = await remark()
      .use(remarkMermaid)
      .use(remarkTables)
      .use(remarkHtml, { 
        sanitize: false,
        allowDangerousHtml: true 
      })
      .process(content);

    return {
      content: processedContent.toString(),
      metadata: {
        title: data.title,
        description: data.description,
        difficulty: data.difficulty,
        estimatedTime: data.estimatedTime,
        keywords: data.keywords,
      },
    };
  } catch (error) {
    console.error('Error loading lesson content:', error);
    // Return fallback content
    return {
      content: '<p>Erreur de chargement du contenu de la leçon.</p>',
      metadata: {
        title: 'Erreur',
        description: 'Le contenu n\'a pas pu être chargé.',
      },
    };
  }
}

/**
 * Get all available lesson IDs (server-side only)
 */
export async function getAllLessonIds(): Promise<string[]> {
  try {
    const contentDir = getContentDir();
    
    if (!fs.existsSync(contentDir)) {
      return [];
    }
    
    const files = fs.readdirSync(contentDir);
    return files
      .filter(file => file.endsWith('.md'))
      .map(file => file.replace('.md', ''));
  } catch (error) {
    console.error('Error getting lesson IDs:', error);
    return [];
  }
}

/**
 * Pre-load all lesson content (for static generation)
 */
export async function preloadAllLessons(): Promise<Record<string, LessonContent>> {
  const lessonIds = await getAllLessonIds();
  const lessons: Record<string, LessonContent> = {};

  for (const lessonId of lessonIds) {
    lessons[lessonId] = await loadLessonContent(lessonId);
  }

  return lessons;
}
