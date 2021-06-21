import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListEventSuggestionComponent } from './list-event-suggestion.component';

describe('EventSuggestionListComponent', () => {
  let component: ListEventSuggestionComponent;
  let fixture: ComponentFixture<ListEventSuggestionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListEventSuggestionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListEventSuggestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
