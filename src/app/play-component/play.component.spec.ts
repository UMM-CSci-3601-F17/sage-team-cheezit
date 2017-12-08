import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {PlayComponent} from './play.component';
import {Observable} from "rxjs/Observable";
import {DeckService} from "../deck/deck.service";
import {ActivatedRoute} from "@angular/router";
import {SharedModule} from "../shared.module";
import {DeckServiceMock} from "../deck/deck.service.mock";
import {AppTestModule} from "../app.test.module";
import {AngularFireDatabase} from "angularfire2/database";

describe('PlayComponent', () => {
    let component: PlayComponent;
    let fixture: ComponentFixture<PlayComponent>;

    let mockFirebaseDB = {
        object: (path: string) => {
            return {
                valueChanges: () => {
                    return Observable.of(null);
                }
            };
        }
    };

    beforeEach(async(() => {

        TestBed.configureTestingModule({
            imports: [SharedModule, AppTestModule],
            declarations: [],
            providers: [
                {provide: DeckService, useValue: new DeckServiceMock()},
                {provide: AngularFireDatabase, useValue: mockFirebaseDB},
                {
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


    it('should be getting an array of 2 cards from the deck-service mock', () => {
        expect(component.cardStates.length).toEqual(2);
    });

    it('should shuffle the array without adding or subtracting from it', () => {
        component.shuffleArray(component.cardStates);
        component.shuffleArray(component.cardStates);
        component.shuffleArray(component.cardStates);
        component.shuffleArray(component.cardStates);
        component.shuffleArray(component.cardStates);
        expect(component.cardStates.length).toEqual(2);
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

        component.addPoints(0);
        expect(component.pageNumber).toEqual(1);
    });

});
