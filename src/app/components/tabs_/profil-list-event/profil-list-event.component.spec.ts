import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ProfilListEventComponent} from './profil-list-event.component';

describe('ProfilListEventComponent', () => {
  let component: ProfilListEventComponent;
  let fixture: ComponentFixture<ProfilListEventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProfilListEventComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfilListEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
