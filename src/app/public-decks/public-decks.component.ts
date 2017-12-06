import {Component, OnInit} from '@angular/core';
import {DeckService} from "../deck/deck.service";
import {MdDialog} from "@angular/material";
import {AngularFireAuth} from "angularfire2/auth";
import {NewDeckDialogComponent} from "../new-deck-dialog/new-deck-dialog.component";

@Component({
  selector: 'app-public-decks',
  templateUrl: './public-decks.component.html',
  styleUrls: ['./public-decks.component.css']
})
export class PublicDecksComponent implements OnInit {

  constructor(public deckService: DeckService, public afAuth: AngularFireAuth, public dialog : MdDialog) { }

  ngOnInit() {
  }

    openAddDialog() {
        this.dialog.open(NewDeckDialogComponent);
    }

}
