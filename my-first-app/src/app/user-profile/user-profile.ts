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
  // Дані картки користувача
  username = 'Олена';
  role = 'Frontend Developer';
  email = 'olena@example.com';
  age = 28;
  bio = 'Frontend розробниця, яка вивчає Angular та TypeScript.';
  avatarUrl = 'my-photo.jpg';
  isOnline = true;
  skillsCount = 5;

  // Дані для шапки (Header)
  headerUser = 'Олексій';
  headerAvatarUrl = 'https://angular.io/assets/images/logos/angular/angular.svg';
  isLoggedIn = true;

  // Перемикач деталей
  showDetails = false;
  toggleDetails() {
    this.showDetails = !this.showDetails;
  }

  // Відстеження замовлення
  orderStatus: OrderStatus = 'pending';
  changeStatus(status: OrderStatus) {
    this.orderStatus = status;
  }
}