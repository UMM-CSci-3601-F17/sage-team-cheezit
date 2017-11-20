import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeckComponent } from './deck.component';
import {SharedModule} from "../shared.module";
import {MATERIAL_COMPATIBILITY_MODE} from "@angular/material";
import {CardComponent} from "../card-component/card.component";
import {DeckService} from "../deck/deck.service";
import {Observable} from "rxjs";
import {Deck} from "../deck/deck";
import {ActivatedRoute} from "@angular/router";
import {Card} from "../card/card";
import {AppTestModule} from "../app.test.module";
import {DeckServiceMock} from "../deck/deck.service.mock";
import {AngularFireAuth} from "angularfire2/auth";
import {ClassService} from "../class/class.service";
import {ClassServiceMock} from "../class/class.service.mock";

describe('DeckComponent', () => {
  let component: DeckComponent;
  let fixture: ComponentFixture<DeckComponent>;

    let mockFirebaseAuth = {
        auth: {
            currentUser: {
                uid: "testuid"
            }
        }
    };

  beforeEach(async(() => {

    TestBed.configureTestingModule({
        imports: [SharedModule, AppTestModule],
        declarations: [],
        providers: [{provide: MATERIAL_COMPATIBILITY_MODE, useValue: true},
            {provide: DeckService, useValue: new DeckServiceMock()},
            {provide: ClassService, useValue: new ClassServiceMock()}, {
                provide: ActivatedRoute,
                useValue: {
                    params: Observable.of({id: "test id"})
                }
            },
            {provide: AngularFireAuth, useValue: mockFirebaseAuth}],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
