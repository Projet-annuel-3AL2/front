import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogUpdateOrganisationComponent } from './dialog-update-organisation.component';

describe('DialogModifOrganisationComponent', () => {
  let component: DialogUpdateOrganisationComponent;
  let fixture: ComponentFixture<DialogUpdateOrganisationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogUpdateOrganisationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogUpdateOrganisationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
