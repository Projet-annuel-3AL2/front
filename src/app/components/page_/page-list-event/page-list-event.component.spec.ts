import {ComponentFixture, TestBed} from '@angular/core/testing';

import {PageListEventComponent} from './page-list-event.component';

describe('EventListComponent', () => {
  let component: PageListEventComponent;
  let fixture: ComponentFixture<PageListEventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PageListEventComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PageListEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
