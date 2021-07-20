import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserJoinOrganisationComponent } from './user-join-organisation.component';

describe('UserJoinOrganisationComponent', () => {
  let component: UserJoinOrganisationComponent;
  let fixture: ComponentFixture<UserJoinOrganisationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserJoinOrganisationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserJoinOrganisationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
