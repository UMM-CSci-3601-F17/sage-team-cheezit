import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayComponent } from './play.component';
import {Observable} from "rxjs/Observable";
import {Deck} from "../deck/deck";
import {MATERIAL_COMPATIBILITY_MODE} from "@angular/material";
import {DeckService} from "../deck/deck.service";
import {ActivatedRoute} from "@angular/router";
import {SharedModule} from "../shared.module";
import {CardComponent} from "../card-component/card.component";

describe('PlayComponent', () => {
  let component: PlayComponent;
  let fixture: ComponentFixture<PlayComponent>;

    let deckServiceStub: {
        getDeck: (id) => Observable<Deck>
    };

  beforeEach(async(() => {

      deckServiceStub = {
          getDeck: (id) => Observable.of({
              _id : {
                  $oid: "test id"
              },
              name: "test deck",
              cards: [
                  {   _id : "test id",
                      word : "test word",
                      synonym : "test synonym",
                      antonym: "test antonym",
                      general_sense: "test general_sense",
                      example_usage: "test example_usage",
                  }
              ]
          })
      };

    TestBed.configureTestingModule({
        imports: [SharedModule],
      declarations: [ PlayComponent, CardComponent ],
        providers: [{provide: MATERIAL_COMPATIBILITY_MODE, useValue: true},
            {provide: DeckService, useValue: deckServiceStub}, {
                provide: ActivatedRoute,
                useValue: {
                    params: Observable.of({id: "test id"})
                }
            }],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
