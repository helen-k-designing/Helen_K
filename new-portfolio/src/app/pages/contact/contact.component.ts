import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  private viewportScroller = inject(ViewportScroller);

  ngOnInit(): void {
    this.viewportScroller.scrollToPosition([0, 0]);
    window.scrollTo(0, 0);
  }
}