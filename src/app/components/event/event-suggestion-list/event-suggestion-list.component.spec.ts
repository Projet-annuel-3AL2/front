import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventSuggestionListComponent } from './event-suggestion-list.component';

describe('EventSuggestionListComponent', () => {
  let component: EventSuggestionListComponent;
  let fixture: ComponentFixture<EventSuggestionListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventSuggestionListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EventSuggestionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
