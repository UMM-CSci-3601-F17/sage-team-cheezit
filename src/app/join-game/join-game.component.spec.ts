import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JoinGameComponent } from './join-game.component';
import {SharedModule} from "../shared.module";
import {AppTestModule} from "../app.test.module";

describe('JoinGameComponent', () => {
  let component: JoinGameComponent;
  let fixture: ComponentFixture<JoinGameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
        imports: [SharedModule, AppTestModule],
      declarations: [ ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JoinGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
