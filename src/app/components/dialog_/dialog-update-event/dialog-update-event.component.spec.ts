import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogUpdateEventComponent } from './dialog-update-event.component';

describe('DialogUpdateEventComponent', () => {
  let component: DialogUpdateEventComponent;
  let fixture: ComponentFixture<DialogUpdateEventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogUpdateEventComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogUpdateEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
