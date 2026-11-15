import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Type } from '@angular/core';
import * as AboutModule from './about.component';

describe('AboutComponent', () => {
  const aboutComponent = Object.values(AboutModule).find(
    (value) => typeof value === 'function' && 'ɵcmp' in value,
  ) as Type<unknown> | undefined;
  let component: unknown;
  let fixture: ComponentFixture<unknown>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: aboutComponent ? [aboutComponent] : [],
    }).compileComponents();

    if (!aboutComponent) {
      throw new Error('No Angular component exported from about.component');
    }
    fixture = TestBed.createComponent(aboutComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});