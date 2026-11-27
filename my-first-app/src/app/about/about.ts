import { Component, signal } from '@angular/core';
import { MapLocationComponent } from '../map-location/map-location';
import { HighlightDirective } from '../directives/highlight.directive';
import { TruncatePipe } from '../pipes/truncate.pipe';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [MapLocationComponent, HighlightDirective, TruncatePipe],
  templateUrl: './about.html',
  styleUrl: './about.css'
})
export class AboutComponent {
  companyName = 'Vektor Studio';
  tagline = 'Створюємо зрозумілі вебсервіси та адаптивні інтерфейси на Angular.';

  expanded = signal(false);

  fullDescription =
    'Ми допомагаємо бізнесу та невеликим командам запускати зручні вебпродукти — від прототипу й інтерфейсу до стабільної клієнтської частини. Нам важливо, щоб користувачам було легко знайти потрібну дію, а система залишалася гнучкою для подальшого розвитку.';

  highlights = [
    'Продуманий UI/UX та увага до візуальної ієрархії',
    'Адаптивна верстка для смартфонів, планшетів і десктопів',
    'Чистий, підтримуваний фронтенд-код на TypeScript і Angular'
  ];
}