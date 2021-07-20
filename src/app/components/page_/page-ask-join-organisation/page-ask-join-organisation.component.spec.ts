import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageAskJoinOrganisationComponent } from './page-ask-join-organisation.component';

describe('PageAskJoinOrganisationComponent', () => {
  let component: PageAskJoinOrganisationComponent;
  let fixture: ComponentFixture<PageAskJoinOrganisationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageAskJoinOrganisationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PageAskJoinOrganisationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
