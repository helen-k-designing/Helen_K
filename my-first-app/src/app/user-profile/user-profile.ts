import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

type OrderStatus = 'pending' | 'shipping' | 'delivered' | 'cancelled';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-profile.html',
  styleUrl: './user-profile.css'
})
export class UserProfileComponent {
 // --- Ваші попередні дані картки ---
  username = 'Олена';
  role = 'Frontend Developer';
  email = 'olena@example.com';
  age = 28;
  bio = 'Frontend розробниця, яка вивчає Angular та TypeScript.';
  avatarUrl = 'my-photo.jpg';
  isOnline = true;
  skillsCount = 5;
  isLoggedIn = true;

  // --- ЛОГІКА ДЛЯ ЗАВДАННЯ 1 (Деталі) ---
  showDetails = false;
  toggleDetails() {
    this.showDetails = !this.showDetails;
  }

  // --- ЛОГІКА ДЛЯ ЗАВДАННЯ 2 (Статус замовлення) ---
  orderStatus: OrderStatus = 'pending';
  changeStatus(status: OrderStatus) {
    this.orderStatus = status;
  }
}