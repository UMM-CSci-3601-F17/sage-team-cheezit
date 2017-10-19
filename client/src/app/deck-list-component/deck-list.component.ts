import { Component, OnInit } from '@angular/core';
import {DeckService} from "../deck/deck.service";
import {NewDeckDialogComponent} from "../new-deck-dialog/new-deck-dialog.component";
import {MdDialog} from "@angular/material";

@Component({
  selector: 'app-deck-list',
  templateUrl: './deck-list.component.html',
  styleUrls: ['./deck-list.component.css']
})
export class DeckListComponent implements OnInit {

  constructor(public deckService: DeckService, public dialog : MdDialog) { }

  ngOnInit() {
      //this.deckService.getDecks();
  }

    openAddDialog() {
        this.dialog.open(NewDeckDialogComponent);
    }


}
