import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrgaSuggestionListComponent } from './orga-suggestion-list.component';

describe('OrgaSuggestionListComponent', () => {
  let component: OrgaSuggestionListComponent;
  let fixture: ComponentFixture<OrgaSuggestionListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrgaSuggestionListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrgaSuggestionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
