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
 * Load lesson content from the API route
 */
export async function loadLessonContent(lessonId: string): Promise<LessonContent> {
  try {
    const response = await fetch(`/api/lessons?id=${encodeURIComponent(lessonId)}`);
    
    if (!response.ok) {
      throw new Error(`Failed to load lesson: ${response.statusText}`);
    }
    
    const lessonContent: LessonContent = await response.json();
    return lessonContent;
  } catch (error) {
    console.error('Error loading lesson content:', error);
    // Return fallback content
    return {
      content: '<p>Erreur de chargement du contenu de la lecon.</p>',
      metadata: {
        title: 'Erreur',
        description: 'Le contenu n a pas pu etre charge.',
      },
    };
  }
}
