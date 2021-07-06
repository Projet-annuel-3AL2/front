import {ComponentFixture, TestBed} from '@angular/core/testing';

import {EventListDisplayComponent} from './event-list-display.component';

describe('EventListDisplayComponent', () => {
  let component: EventListDisplayComponent;
  let fixture: ComponentFixture<EventListDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EventListDisplayComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EventListDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
