import {ComponentFixture, TestBed} from '@angular/core/testing';

import {UserAskJoinOrganisationComponent} from './user-ask-join-organisation.component';

describe('UserAskJoinOrganisationComponent', () => {
  let component: UserAskJoinOrganisationComponent;
  let fixture: ComponentFixture<UserAskJoinOrganisationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserAskJoinOrganisationComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserAskJoinOrganisationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
