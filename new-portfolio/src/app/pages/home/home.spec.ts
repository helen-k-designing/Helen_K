import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Type } from '@angular/core';
import * as HomeModule from './home.component';

describe('Home', () => {
  const homeComponent = Object.values(HomeModule).find(
    (value) => typeof value === 'function' && 'ɵcmp' in value,
  ) as Type<unknown> | undefined;
  let component: unknown;
  let fixture: ComponentFixture<unknown>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: homeComponent ? [homeComponent] : [],
    }).compileComponents();

    if (!homeComponent) {
      throw new Error('No Angular component exported from home.component');
    }
    fixture = TestBed.createComponent(homeComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
