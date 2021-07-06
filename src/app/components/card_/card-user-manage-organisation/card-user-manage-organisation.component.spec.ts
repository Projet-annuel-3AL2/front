import {ComponentFixture, TestBed} from '@angular/core/testing';

import {CardUserManageOrganisationComponent} from './card-user-manage-organisation.component';

describe('CardUserManageOrganisationComponent', () => {
  let component: CardUserManageOrganisationComponent;
  let fixture: ComponentFixture<CardUserManageOrganisationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CardUserManageOrganisationComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardUserManageOrganisationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
