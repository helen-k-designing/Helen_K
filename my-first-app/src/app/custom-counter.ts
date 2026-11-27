import { Component, model } from '@angular/core';

@Component({
  selector: 'app-custom-counter',
  standalone: true,
  template: `
    <div class="counter-box">
      <p>Поточне значення: {{ count() }}</p>
      <button type="button" (click)="increment()">Збільшити (+1)</button>
    </div>
  `
})
export class CustomCounterComponent {
  // Оголошуємо модель (вхідне значення за замовчуванням: 0)
  count = model<number>(0);

  increment() {
    // Оновлюємо значення сигналу. Батьківський компонент автоматично дізнається про зміни!
    this.count.update(value => value + 1);
  }
}