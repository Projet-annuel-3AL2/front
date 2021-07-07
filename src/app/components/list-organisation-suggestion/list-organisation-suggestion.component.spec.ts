import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ListOrganisationSuggestionComponent} from './list-organisation-suggestion.component';

describe('OrgaSuggestionListComponent', () => {
  let component: ListOrganisationSuggestionComponent;
  let fixture: ComponentFixture<ListOrganisationSuggestionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListOrganisationSuggestionComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListOrganisationSuggestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
