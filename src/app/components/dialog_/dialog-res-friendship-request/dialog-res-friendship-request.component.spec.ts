import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogResFriendshipRequestComponent } from './dialog-res-friendship-request.component';

describe('DialogResFriendshipRequestComponent', () => {
  let component: DialogResFriendshipRequestComponent;
  let fixture: ComponentFixture<DialogResFriendshipRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogResFriendshipRequestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogResFriendshipRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
