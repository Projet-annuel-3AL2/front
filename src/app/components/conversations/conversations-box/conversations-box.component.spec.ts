import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ConversationsBoxComponent} from './conversations-box.component';

describe('ConversationsBoxComponent', () => {
  let component: ConversationsBoxComponent;
  let fixture: ComponentFixture<ConversationsBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConversationsBoxComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConversationsBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
