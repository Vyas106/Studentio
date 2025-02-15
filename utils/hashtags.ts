// utils/hashtags.ts
export function extractHashtags(content: string): string[] {
    const hashtags = content.match(/#[a-zA-Z0-9_]+/g) || [];
    return hashtags.map(tag => tag.slice(1));
  }
  
  export const popularHashtags = [
    'webdev', 'programming', 'javascript', 'react', 'nodejs',
    'python', 'coding', 'developer', 'frontend', 'backend'
  ];
  