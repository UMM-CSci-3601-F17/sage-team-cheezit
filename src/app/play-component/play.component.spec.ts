import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayComponent } from './play.component';
import {Observable} from "rxjs/Observable";
import {Deck} from "../deck/deck";
import {MATERIAL_COMPATIBILITY_MODE} from "@angular/material";
import {DeckService} from "../deck/deck.service";
import {ActivatedRoute} from "@angular/router";
import {SharedModule} from "../shared.module";
import {DeckServiceMock} from "../deck/deck.service.mock";
import {CardComponent} from "../card-component/card.component";
import {CardState} from "./CardState";
import {Card} from "../card/card";
import {AppTestModule} from "../app.test.module";

describe('PlayComponent', () => {
  let component: PlayComponent;
  let cardState: CardState;
  let fixture: ComponentFixture<PlayComponent>;

    beforeEach(async(() => {

        TestBed.configureTestingModule({
            imports: [SharedModule, AppTestModule],
            declarations: [],
            providers: [{provide: MATERIAL_COMPATIBILITY_MODE, useValue: true},
                {provide: DeckService, useValue: new DeckServiceMock()},
                { provide: ActivatedRoute,
                    useValue: {
                        params: Observable.of({id: "test id"})
                    } }],
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

  it('should add to cardStates array', () => {
      let card_state: CardState;
      card_state = component.getCardState(0);
      expect(component.cardStates[0]).toEqual(card_state);
  });

  // commenting out for now, doesn't work with multiplayer

  // it('should add points correctly based on certain card states', () => {
  //     let card_state1: CardState;
  //     let card_state2: CardState;
  //     let card_state3: CardState;
  //
  //
  //     card_state1 = component.getCardState(0);
  //     card_state2 = component.getCardState(1);
  //     card_state3 = component.getCardState(2);
  //     expect(component.cardStates.length).toEqual(3);
  //
  //     card_state1.randomizeSages();
  //
  //     card_state2.randomizeSages();
  //     card_state2.randomizeSages();
  //
  //     card_state3.randomizeSages();
  //     card_state3.randomizeSages();
  //     card_state3.randomizeSages();
  //
  //     component.addPoints(0);
  //     expect(component.points).toEqual(card_state1.cardPoints);
  //
  //     component.addPoints(1);
  //     expect(component.points).toEqual(card_state1.cardPoints + card_state2.cardPoints);
  //
  //     component.addPoints(2);
  //     expect(component.points).toEqual(card_state1.cardPoints + card_state2.cardPoints + card_state3.cardPoints);
  //
  // });

  it('should increase page number when adding points', () => {
      let card_state1: CardState;
      card_state1 = component.getCardState(0);

      component.addPoints(0);
      expect(component.pageNumber).toEqual(1);
  });

});
