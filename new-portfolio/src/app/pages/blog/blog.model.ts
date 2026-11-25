export type BlogCategory = 'all' | 'frontend' | 'design' | 'career';

export interface BlogPost {
  id: number | string;
  title: string;
  excerpt: string;
  content: string[];
  codeSnippet?: string;
  category: string;
  categoryLabel: string;
  date: string;
  readTime: string;
  imageUrl?: string;
  tags: string[];
}