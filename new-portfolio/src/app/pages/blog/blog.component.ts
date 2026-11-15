import { Component, computed, signal, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ViewportScroller } from '@angular/common';
import { BlogCategory, BlogPost } from './blog.model';
import { INITIAL_POSTS } from './blog.data';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {
  private viewportScroller = inject(ViewportScroller);

  posts = signal<BlogPost[]>(INITIAL_POSTS);
  selectedCategory = signal<BlogCategory>('all');
  searchQuery = signal<string>('');
  activePost = signal<BlogPost | null>(null);

  categories: { id: BlogCategory; label: string }[] = [
    { id: 'all', label: 'Усі дописи' },
    { id: 'frontend', label: 'Frontend' },
    { id: 'design', label: 'Дизайн та UI' },
    { id: 'career', label: 'Кар’єрний шлях' }
  ];

  ngOnInit(): void {
    // Гарантуємо, що при відкритті сторінки блогу скрол зверху
    this.viewportScroller.scrollToPosition([0, 0]);
    window.scrollTo(0, 0);
  }

  filteredPosts = computed(() => {
    const category = this.selectedCategory();
    const query = this.searchQuery().toLowerCase().trim();

    return this.posts().filter(post => {
      const matchesCategory = category === 'all' || post.category === category;
      const matchesSearch =
        !query ||
        post.title.toLowerCase().includes(query) ||
        post.excerpt.toLowerCase().includes(query) ||
        post.tags.some((tag: string) => tag.toLowerCase().includes(query));

      return matchesCategory && matchesSearch;
    });
  });

  setCategory(cat: BlogCategory): void {
    this.selectedCategory.set(cat);
  }

  openPost(post: BlogPost): void {
    this.activePost.set(post);
    document.body.style.overflow = 'hidden';
  }

  closePost(): void {
    this.activePost.set(null);
    document.body.style.overflow = '';
  }
}