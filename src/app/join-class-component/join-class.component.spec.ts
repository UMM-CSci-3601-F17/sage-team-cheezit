import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JoinClassComponent } from './join-class.component';

describe('JoinClassComponent', () => {
  let component: JoinClassComponent;
  let fixture: ComponentFixture<JoinClassComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JoinClassComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JoinClassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
