import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicDecksComponent } from './public-decks.component';

describe('PublicDecksComponent', () => {
  let component: PublicDecksComponent;
  let fixture: ComponentFixture<PublicDecksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PublicDecksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicDecksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
