import {Component, Input, OnInit} from '@angular/core';
import {DeckId} from "../deck/deck";

@Component({
    selector: 'app-deck-list',
    templateUrl: './deck-list.component.html',
    styleUrls: ['./deck-list.component.css']
})
export class DeckListComponent implements OnInit {


    @Input() decks: DeckId[];

    //@Input() title: string;

    @Input() canEdit?: boolean;

    @Input() canAdd?: boolean = false;

    constructor() {

    }

    ngOnInit() {
        //this.deckService.getDecks();
        //this.deckService.getUserDecks().subscribe(
        //    decks => {
        //        this.decks = decks;
        //    }
        //);
    }


}
