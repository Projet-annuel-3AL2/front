import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostShareCardComponent } from './post-share-card.component';

describe('PostShareCardComponent', () => {
  let component: PostShareCardComponent;
  let fixture: ComponentFixture<PostShareCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostShareCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostShareCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
