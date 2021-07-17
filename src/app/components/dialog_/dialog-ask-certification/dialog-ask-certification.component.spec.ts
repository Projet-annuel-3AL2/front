import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAskCertificationComponent } from './dialog-ask-certification.component';

describe('DialogAskCertificationComponent', () => {
  let component: DialogAskCertificationComponent;
  let fixture: ComponentFixture<DialogAskCertificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogAskCertificationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogAskCertificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
