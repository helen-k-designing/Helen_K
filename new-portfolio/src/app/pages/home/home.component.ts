import { Component, OnInit, AfterViewInit, inject, signal } from '@angular/core';
import { CommonModule, ViewportScroller } from '@angular/common';
import { ChatModalComponent } from '../../chat-modal/chat-modal.component';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ChatModalComponent, RouterLink],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit {
  private viewportScroller = inject(ViewportScroller);
  isChatOpen = signal(false);

  ngOnInit(): void {
    // Примусово скидаємо скрол на самий верх при ініціалізації
    this.viewportScroller.scrollToPosition([0, 0]);
    window.scrollTo(0, 0);
  }

  ngAfterViewInit(): void {
    // Повторне скидання після повної побудови представлення (на випадок асинхронного завантаження)
    setTimeout(() => {
      this.viewportScroller.scrollToPosition([0, 0]);
      window.scrollTo(0, 0);
    }, 0);
  }
}