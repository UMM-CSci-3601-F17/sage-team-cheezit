import { Component, OnInit } from '@angular/core';
import {DeckService} from "../deck/deck.service";
import {MatDialogRef,  MatSnackBar} from "@angular/material";

@Component({
  selector: 'app-new-deck-dialog',
  templateUrl: './new-deck-dialog.component.html',
  styleUrls: ['./new-deck-dialog.component.css']
})
export class NewDeckDialogComponent implements OnInit {

    constructor(public deckService : DeckService,
                public matDialogRef : MatDialogRef<NewDeckDialogComponent>,
                public snackBar: MatSnackBar) { }

  ngOnInit() {
  }

  newDeckName: string;

    public addNewDeck(): void {
        this.deckService.addNewDeck(this.newDeckName).then(
            succeeded => {
                //this.deckService.decks.push(succeeded);
                this.matDialogRef.close();
                this.snackBar.open("Added deck", null, {
                    duration: 2000,
                });
            }, err => {
                console.log(err);
                this.snackBar.open("Error adding deck", null, {
                    duration: 2000,
                });
            }
        )
    }

}
