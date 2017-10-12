import { Component, OnInit } from '@angular/core';
import {DeckService} from "../deck/deck.service";
import {ActivatedRoute} from "@angular/router";
import {Deck} from "../deck/deck";
import { TdBounceAnimation } from "@covalent/core";
import {CardState} from "./CardState";



@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.scss'],
    animations: [
        TdBounceAnimation()
    ]
})
export class PlayComponent implements OnInit {

    deckid : string;

    deck : Deck;

    public pageNumber: number = 0;
    public pageCount: number = 0;

    public points: number = 0;

    bounceState: boolean = false;
    public cardStates: CardState[];


    constructor(public deckService : DeckService, private route: ActivatedRoute) {
        this.cardStates = [];
    }


    public addPoints(): void {

        if(this.cardStates[this.pageNumber].isComplete == false && this.pageNumber < this.deck.cards.length){
            this.points += this.cardStates[this.pageNumber].cardPoints;
            this.bounceState = !this.bounceState;
            this.cardStates[this.pageNumber].selected = 0;
            this.cardStates[this.pageNumber].isDone();
            this.pageNumber = this.pageNumber + 1;

        }

    }

    public getCardState(i:number): CardState{
        if(this.cardStates[i] == null && i <= this.deck.cards.length) {
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
