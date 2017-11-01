import { Component, OnInit, Inject } from '@angular/core';
import {DeckService} from "../deck/deck.service";
import {MatDialogRef,  MatSnackBar, MAT_DIALOG_DATA} from "@angular/material";

@Component({
  selector: 'app-new-deck-dialog',
  templateUrl: './new-deck-dialog.component.html',
  styleUrls: ['./new-deck-dialog.component.css']
})
export class NewDeckDialogComponent implements OnInit {

    constructor(public deckService : DeckService,
                public matDialogRef : MatDialogRef<NewDeckDialogComponent>,
                @Inject(MAT_DIALOG_DATA) public data: { classId : string },
                public snackBar: MatSnackBar) { }

  ngOnInit() {
  }

  newDeckName: string;

    public addNewDeck(): void {
        if(this.data && this.data.classId)
            this.deckService.addNewDeckClass(this.newDeckName, this.data.classId).then(
                succeeded => {
                    //this.deckService.decks.push(succeeded);
                    this.snackBar.open("Added deck", null, {
                        duration: 2000,
                    });
                }, err => {
                    console.log(err);
                    this.snackBar.open("Error adding deck", null, {
                        duration: 2000,
                    });
                }
            );
        else
            this.deckService.addNewDeckUser(this.newDeckName).then(
                succeeded => {
                    //this.deckService.decks.push(succeeded);
                    this.snackBar.open("Added deck", null, {
                        duration: 2000,
                    });
                }, err => {
                    console.log(err);
                    this.snackBar.open("Error adding deck", null, {
                        duration: 2000,
                    });
                }
            );
        this.matDialogRef.close();
    }

}
