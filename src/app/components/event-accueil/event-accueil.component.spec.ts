import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventAccueilComponent } from './event-accueil.component';

describe('EventAccueilComponent', () => {
  let component: EventAccueilComponent;
  let fixture: ComponentFixture<EventAccueilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventAccueilComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EventAccueilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
