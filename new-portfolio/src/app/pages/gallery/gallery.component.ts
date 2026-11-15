import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {
  private viewportScroller = inject(ViewportScroller);

  ngOnInit(): void {
    this.viewportScroller.scrollToPosition([0, 0]);
    window.scrollTo(0, 0);
  }
}