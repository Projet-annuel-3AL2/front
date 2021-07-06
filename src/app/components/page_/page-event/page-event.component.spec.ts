import {ComponentFixture, TestBed} from '@angular/core/testing';

import {PageEventComponent} from './page-event.component';

describe('EventComponent', () => {
  let component: PageEventComponent;
  let fixture: ComponentFixture<PageEventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PageEventComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PageEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
