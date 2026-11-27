import { Component, signal } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { UserProfileComponent } from './user-profile/user-profile';
import { CustomCounterComponent } from './custom-counter';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, UserProfileComponent, CustomCounterComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class AppComponent {
  title = 'my-first-app';

  // Сигнал для двостороннього зв'язування [(count)]="parentCount"
  parentCount = signal(10);

  // Звичайна змінна для двостороннього зв'язування [(count)]="plainCount"
  plainCount = 5;
}