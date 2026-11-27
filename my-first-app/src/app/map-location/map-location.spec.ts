import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MapLocationComponent } from './map-location';

describe('MapLocationComponent', () => {
  let component: MapLocationComponent;
  let fixture: ComponentFixture<MapLocationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MapLocationComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MapLocationComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
