import { computed, Injectable, signal } from '@angular/core';
import { BlogComment } from './comment.model';

const STORAGE_KEY = 'helen_k_blog_comments_v1';

const INITIAL_COMMENTS: BlogComment[] = [
  {
    id: 'init-1',
    postId: 1,
    author: 'Оксана',
    text: 'Дуже влучне порівняння сіток і лекал — одразу зрозуміліше, чому варто мислити пропорціями, а не фіксованими пікселями.',
    createdAt: '14 Лис 2026'
  }
];

@Injectable({
  providedIn: 'root'
})
export class CommentsService {
  private readonly commentsSignal = signal<BlogComment[]>(this.loadInitialComments());

  readonly allComments = this.commentsSignal.asReadonly();

  commentsForPost(postId: number | string) {
    return computed(() =>
      this.commentsSignal().filter((comment) => String(comment.postId) === String(postId))
    );
  }

  addComment(postId: number | string, author: string, text: string): boolean {
    const cleanAuthor = author.trim();
    const cleanText = text.trim();

    if (!cleanAuthor || !cleanText) {
      return false;
    }

    const newComment: BlogComment = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      postId,
      author: cleanAuthor,
      text: cleanText,
      createdAt: this.formatToday()
    };

    this.commentsSignal.update((current) => {
      const updated = [newComment, ...current];
      this.saveToStorage(updated);
      return updated;
    });

    return true;
  }

  private loadInitialComments(): BlogComment[] {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) {
        return INITIAL_COMMENTS;
      }
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : INITIAL_COMMENTS;
    } catch {
      return INITIAL_COMMENTS;
    }
  }

  private saveToStorage(items: BlogComment[]): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // Ігноруємо помилки сховища
    }
  }

  private formatToday(): string {
    return new Date().toLocaleDateString('uk-UA', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  }
}