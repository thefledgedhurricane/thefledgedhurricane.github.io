import { NextRequest, NextResponse } from 'next/server';
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

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const lessonId = searchParams.get('id');

  if (!lessonId) {
    return NextResponse.json({ error: 'Lesson ID is required' }, { status: 400 });
  }

  try {
    const contentDir = path.join(process.cwd(), '..', 'content', 'lessons');
    const filePath = path.join(contentDir, `${lessonId}.md`);

    if (!fs.existsSync(filePath)) {
      return NextResponse.json({ error: 'Lesson not found' }, { status: 404 });
    }

    const fileContent = fs.readFileSync(filePath, 'utf8');
    const { content, data } = matter(fileContent);

    // Convert markdown to HTML
    const processedContent = await remark()
      .use(remarkHtml, { sanitize: false })
      .process(content);

    const lessonContent: LessonContent = {
      content: processedContent.toString(),
      metadata: {
        title: data.title,
        description: data.description,
        difficulty: data.difficulty,
        estimatedTime: data.estimatedTime,
        keywords: data.keywords,
      },
    };

    return NextResponse.json(lessonContent);
  } catch (error) {
    console.error('Error loading lesson:', error);
    return NextResponse.json(
      { error: 'Failed to load lesson content' },
      { status: 500 }
    );
  }
}
