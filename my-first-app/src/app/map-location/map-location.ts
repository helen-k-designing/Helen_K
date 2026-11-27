import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-map-location',
  standalone: true,
  templateUrl: './map-location.html',
  styleUrl: './map-location.css'
})
export class MapLocationComponent {
  showMap = signal(false);

  toggleMap() {
    this.showMap.update(value => !value);
  }
}