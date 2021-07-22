import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ProfileOrganisationComponent} from './profile-organisation.component';

describe('ProfilOrganisationComponent', () => {
  let component: ProfileOrganisationComponent;
  let fixture: ComponentFixture<ProfileOrganisationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProfileOrganisationComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileOrganisationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
