import {Component, OnDestroy, OnInit} from '@angular/core';
import {DeckService} from "../deck/deck.service";
import {ActivatedRoute} from "@angular/router";
import {Deck} from "../deck/deck";
import {CardState} from "./CardState";
import {Card} from "../card/card";
import {AngularFireDatabase} from "angularfire2/database";
import * as firebase from 'firebase/app';


@Component({
    selector: 'app-play',
    templateUrl: './play.component.html',
    styleUrls: ['./play.component.scss'],
})
export class PlayComponent implements OnInit, OnDestroy {

    deckid : string;

    deck : Deck;
    cards: Card[];

    private _pageNumber: number = 0;

    public get pageNumber(): number {
        return this._pageNumber;
    }

    public set pageNumber(i: number) {
        let oldI = this._pageNumber;
        this._pageNumber = i;
        if(i != oldI) {
            this.updateGame();
        }

    }

    public pageCount: number = 0;

    public points: number = 0;

    public gameId: string;

    public cardStates: CardState[];


    // from https://stackoverflow.com/a/27747377/8855259

    // dec2hex :: Integer -> String
    dec2hex (dec: number): string {
        return ('0' + dec.toString(16)).substr(-2);
    }

    // generateId :: Integer -> String
    generateId (len: number) : string {
        let arr = new Uint8Array((len || 40) / 2);
        window.crypto.getRandomValues(arr);
        return Array.from(arr, this.dec2hex).join('');
    }


    constructor(public deckService : DeckService, private route: ActivatedRoute, private db: AngularFireDatabase) {
        this.cardStates = [];
        this.gameId = this.generateId(8);

        const ref = firebase.database().ref('games').child(this.gameId);
        ref.onDisconnect().remove();
    }

    public updateGame() {
        console.log("update game called " + this.pageNumber);
        this.db.object('games/' + this.gameId).set({
            card: this.cards[this.pageNumber],
            points: this.points,
            selectedHints: this.getCardState(this.pageNumber).selectedCardHints
        });
    }


    public addPoints(pageNumber : number): void {

        if(this.cardStates[pageNumber].isComplete == false && pageNumber < this.cards.length){
            this.points += this.cardStates[pageNumber].cardPoints;
            this.cardStates[pageNumber].selectedCardHints = [];
            this.cardStates[pageNumber].isDone();
            this.pageNumber = pageNumber + 1;
        }
        //this.updateGame();
    }

    public getCardState(i:number): CardState{
        //console.log("getCardState called");
        if(this.cardStates[i] == null ) {
            this.cardStates[i] = new CardState;
        }
        return this.cardStates[i];
    }


    ngOnInit() {

        this.route.params.subscribe(params => {
            this.deckid = params['deck'];

            this.deckService.getDeck(this.deckid).subscribe(
                deck => {
                    this.deck = deck;
                }
            );

            this.deckService.getDeckCards(this.deckid).subscribe(cards => {
                this.cards = cards;
                this.updateGame();
            });
        });
    }

    ngOnDestroy() {
        if(this.gameId)
            this.db.object('games/' + this.gameId).remove();
    }

}
