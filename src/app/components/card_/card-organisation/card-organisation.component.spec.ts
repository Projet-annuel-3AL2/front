import {ComponentFixture, TestBed} from '@angular/core/testing';

import {CardOrganisationComponent} from './card-organisation.component';

describe('OrganisationCardComponent', () => {
  let component: CardOrganisationComponent;
  let fixture: ComponentFixture<CardOrganisationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CardOrganisationComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardOrganisationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
