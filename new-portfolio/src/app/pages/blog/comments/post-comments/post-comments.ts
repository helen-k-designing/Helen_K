import { CommonModule } from '@angular/common';
import { Component, computed, inject, input, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommentsService } from '../comments.service';

@Component({
  selector: 'app-post-comments',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './post-comments.html',
  styleUrl: './post-comments.css'
})
export class PostCommentsComponent {
  private readonly commentsService = inject(CommentsService);

  readonly postId = input.required<number | string>();

  authorName = '';
  commentText = '';
  readonly errorMessage = signal<string | null>(null);
  readonly submittedNotice = signal<boolean>(false);

  readonly comments = computed(() =>
    this.commentsService.commentsForPost(this.postId())()
  );

  onSubmit(): void {
    this.errorMessage.set(null);
    this.submittedNotice.set(false);

    if (!this.authorName.trim()) {
      this.errorMessage.set('Вкажіть, будь ласка, ваше ім’я.');
      return;
    }

    if (!this.commentText.trim()) {
      this.errorMessage.set('Напишіть текст коментаря перед відправленням.');
      return;
    }

    if (this.commentText.trim().length > 1000) {
      this.errorMessage.set('Коментар занадто довгий — обмежтеся 1000 символами.');
      return;
    }

    const added = this.commentsService.addComment(
      this.postId(),
      this.authorName,
      this.commentText
    );

    if (added) {
      this.commentText = '';
      this.submittedNotice.set(true);
    }
  }
}