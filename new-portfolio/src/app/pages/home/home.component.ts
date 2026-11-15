import { Component, OnInit, AfterViewInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit {
  private viewportScroller = inject(ViewportScroller);

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