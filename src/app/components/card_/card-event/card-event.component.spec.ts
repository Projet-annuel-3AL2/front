import {ComponentFixture, TestBed} from '@angular/core/testing';

import {CardEventComponent} from './card-event.component';


// @ts-ignore
describe('EventCardComponent', () => {
  let component: CardEventComponent;
  let fixture: ComponentFixture<CardEventComponent>;

  // @ts-ignore
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CardEventComponent]
    })
      .compileComponents();
  });

  // @ts-ignore
  beforeEach(() => {
    fixture = TestBed.createComponent(CardEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // @ts-ignore
  it('should create', () => {
    // @ts-ignore
    expect(component).toBeTruthy();
  });
});
