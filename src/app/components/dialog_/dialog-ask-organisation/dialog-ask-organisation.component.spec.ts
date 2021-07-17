import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAskOrganisationComponent } from './dialog-ask-organisation.component';

describe('DialogAskOrganisationComponent', () => {
  let component: DialogAskOrganisationComponent;
  let fixture: ComponentFixture<DialogAskOrganisationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogAskOrganisationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogAskOrganisationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
