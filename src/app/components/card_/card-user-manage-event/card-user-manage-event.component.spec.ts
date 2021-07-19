import {ComponentFixture, TestBed} from '@angular/core/testing';

import {CardUserManageEventComponent} from './card-user-manage-event.component';

describe('CardUserMangeEventComponent', () => {
  let component: CardUserManageEventComponent;
  let fixture: ComponentFixture<CardUserManageEventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CardUserManageEventComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardUserManageEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
