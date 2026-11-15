export type BlogCategory = 'all' | 'frontend' | 'design' | 'career';

export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: string[];
  codeSnippet?: string;
  category: Exclude<BlogCategory, 'all'>;
  categoryLabel: string;
  date: string;
  readTime: string;
  imageUrl?: string;
  tags: string[];
}