import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardOrganisationLeaveComponent } from './card-organisation-leave.component';

describe('CardOrganisationLeaveComponent', () => {
  let component: CardOrganisationLeaveComponent;
  let fixture: ComponentFixture<CardOrganisationLeaveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardOrganisationLeaveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardOrganisationLeaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
