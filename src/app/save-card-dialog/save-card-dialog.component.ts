import { Component, Inject, OnInit } from '@angular/core';
import {DeckService} from "../deck/deck.service";
import {MatDialogRef, MAT_DIALOG_DATA, MatSnackBar} from "@angular/material";
import {Card} from "../card/card";
@Component({
  selector: 'app-save-card-dialog',
  templateUrl: './save-card-dialog.component.html',
  styleUrls: ['./save-card-dialog.component.css']
})
export class SaveCardDialogComponent implements OnInit {

    constructor(public deckService : DeckService,
                public matDialogRef : MatDialogRef<SaveCardDialogComponent>,
                @Inject(MAT_DIALOG_DATA) public data: Card,
                public snackBar: MatSnackBar)
    {
        console.log("construcing SaveCardDialogComponent");
        console.log(data);
        this.newCardWord = data.word;
        this.newCardSynonym = data.synonym;
        this.newCardAntonym = data.antonym;
        this.newCardGeneral = data.general_sense;
        this.newCardExample = data.example_usage;
    }

    newCardWord: string;
    newCardSynonym: string;
    newCardAntonym: string;
    newCardGeneral: string;
    newCardExample: string;

    ngOnInit() {
    }

    public editAddedCard(): void {
        // this.deckService.addNewCard(this.data.deckId,
        //     // this.newCardWord,
        //     "foobar",
        //     this.newCardSynonym,
        //     this.newCardAntonym,
        //     this.newCardGeneral,
        //     this.newCardExample).then(
        //     succeeded => {
        //         //this.cardAddSuccess = true;
        //         this.matDialogRef.close(succeeded);
        //         this.snackBar.open("Added card", null, {
        //             duration: 2000,
        //         });
        //         //this.refreshDeck();
        //     },
        //     err => {
        //         console.log(err);
        //         this.snackBar.open("Error adding card", null, {
        //             duration: 2000,
        //         });
        //     });
        console.log(this.newCardWord,this.newCardAntonym,this.newCardSynonym,this.newCardGeneral,this.newCardExample)
    }


}
