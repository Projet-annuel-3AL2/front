import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ProfilOrganisationComponent} from './profil-organisation.component';

describe('ProfilOrganisationComponent', () => {
  let component: ProfilOrganisationComponent;
  let fixture: ComponentFixture<ProfilOrganisationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProfilOrganisationComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfilOrganisationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
