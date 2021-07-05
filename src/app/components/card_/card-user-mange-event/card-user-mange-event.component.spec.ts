import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardUserMangeEventComponent } from './card-user-mange-event.component';

describe('CardUserMangeEventComponent', () => {
  let component: CardUserMangeEventComponent;
  let fixture: ComponentFixture<CardUserMangeEventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardUserMangeEventComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardUserMangeEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
