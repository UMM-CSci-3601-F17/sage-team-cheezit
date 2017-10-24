import { Component, OnInit } from '@angular/core';
import {DeckService} from "../deck/deck.service";
import {ActivatedRoute} from "@angular/router";
import {Deck} from "../deck/deck";
import {CardState} from "./CardState";



@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.scss'],
})
export class PlayComponent implements OnInit {

    deckid : string;

    deck : Deck;

    public pageNumber: number = 0;
    public pageCount: number = 0;

    public points: number = 0;

    public cardStates: CardState[];


    constructor(public deckService : DeckService, private route: ActivatedRoute) {
        this.cardStates = [];
    }


    public addPoints(pageNumber : number): void {

        if(this.cardStates[pageNumber].isComplete == false && pageNumber < this.deck.cards.length){
            this.points += this.cardStates[pageNumber].cardPoints;
            this.cardStates[pageNumber].selectedCardHints = [];
            this.cardStates[pageNumber].isDone();
            this.pageNumber = pageNumber + 1;

        }

    }

    public getCardState(i:number): CardState{
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
        });
    }

}
