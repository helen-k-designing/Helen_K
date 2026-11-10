import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-profile.html',
  styleUrl: './user-profile.css'
})
export class UserProfileComponent {
  // Дані з обох завдань
  username = 'Олена';
  role = 'Frontend Developer';
  email = 'olena@example.com';
  age = 28;
  bio = 'Frontend розробниця, яка вивчає Angular та TypeScript.';
  avatarUrl = 'my-photo.jpg';
  isOnline = true;
  skillsCount = 5;
}