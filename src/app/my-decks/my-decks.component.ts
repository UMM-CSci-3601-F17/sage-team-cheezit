import { Component, OnInit } from '@angular/core';
import {Deck} from "../deck/deck";
import {DeckService} from "../deck/deck.service";
import {AngularFireAuth} from "angularfire2/auth";
import {NewDeckDialogComponent} from "../new-deck-dialog/new-deck-dialog.component";
import {MdDialog} from "@angular/material";

@Component({
  selector: 'app-my-decks',
  templateUrl: './my-decks.component.html',
  styleUrls: ['./my-decks.component.css']
})
export class MyDecksComponent implements OnInit {

    constructor(public deckService: DeckService, public afAuth: AngularFireAuth, public dialog : MdDialog) {

    }

    public decks: Deck[];

    ngOnInit() {

        this.deckService.getUserDecks().subscribe(
            decks => {
                this.decks = decks;
            }
        );
    }

    openAddDialog() {
        this.dialog.open(NewDeckDialogComponent);
    }

}
