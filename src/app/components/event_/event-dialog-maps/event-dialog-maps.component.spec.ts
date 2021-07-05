import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventDialogMapsComponent } from './event-dialog-maps.component';

describe('EventDialogMapsComponent', () => {
  let component: EventDialogMapsComponent;
  let fixture: ComponentFixture<EventDialogMapsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventDialogMapsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EventDialogMapsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
