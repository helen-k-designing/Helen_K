import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { BLOG_POSTS } from '../blog/blog.data';
import { BlogPost } from '../blog/blog.model';

@Component({
  selector: 'app-blog-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.css']
})
export class BlogDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);

  post: BlogPost | undefined;

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const postId = params.get('id');
      this.post = postId
        ? BLOG_POSTS.find((p) => String(p.id) === postId)
        : undefined;
    });
  }
}