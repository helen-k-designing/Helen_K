import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class Home {
  featuredProjects = [
    { title: 'Проєкт 1', description: 'Сучасний вебдодаток на Angular' },
    { title: 'Проєкт 2', description: 'Інтерактивна галерея та компоненти' },
    { title: 'Проєкт 3', description: 'Корпоративний сайт та блог' }
  ];
}