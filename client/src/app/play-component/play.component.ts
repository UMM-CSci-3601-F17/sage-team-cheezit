import { Component, OnInit } from '@angular/core';
import {DeckService} from "../deck/deck.service";
import {ActivatedRoute} from "@angular/router";
import {Deck} from "../deck/deck";
import { TdBounceAnimation } from "@covalent/core";



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


    constructor(public deckService : DeckService, private route: ActivatedRoute) {

    }

    public addPoints(): void {
        if(this.points/5!=this.deck.cards.length){
            this.points = this.points + 5;
            this.bounceState = !this.bounceState;
        }

    }
    public subtractPoints(): void {
        if(this.points >= 5){
            this.points-= 5;
        }
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
