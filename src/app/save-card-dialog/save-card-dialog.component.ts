import { Component, Inject, OnInit } from '@angular/core';
import {DeckService} from "../deck/deck.service";
import {MatDialogRef, MAT_DIALOG_DATA, MatSnackBar} from "@angular/material";
import {Card, CardId} from "../card/card";
@Component({
  selector: 'app-save-card-dialog',
  templateUrl: './save-card-dialog.component.html',
  styleUrls: ['./save-card-dialog.component.css']
})
export class SaveCardDialogComponent implements OnInit {

    newCardWord: string;
    newCardSynonym: string;
    newCardAntonym: string;
    newCardGeneral: string;
    newCardExample: string;



    constructor(public deckService : DeckService,
                public matDialogRef : MatDialogRef<SaveCardDialogComponent>,
                @Inject(MAT_DIALOG_DATA) public data: {card: CardId, deckId: string},
                public snackBar: MatSnackBar) {
        console.log("construcing SaveCardDialogComponent");
        console.log(data);
        this.newCardWord = data.card.word;
        this.newCardSynonym = data.card.synonym;
        this.newCardAntonym = data.card.antonym;
        this.newCardGeneral = data.card.general_sense;
        this.newCardExample = data.card.example_usage;
    }


    ngOnInit() {
    }

    public editAddedCard(): void {
        this.deckService.editCard(
            this.data.deckId,
            this.data.card.id,
            this.newCardWord,
            this.newCardSynonym,
            this.newCardAntonym,
            this.newCardGeneral,
            this.newCardExample).then(
            succeeded => {
                //this.cardAddSuccess = true
                this.snackBar.open("Added card", null, {
                    duration: 2000,
                });
                //this.refreshDeck();
            },
            err => {
                console.log(err);
                this.snackBar.open("Error adding card", null, {
                    duration: 2000,
                });
            });
        this.matDialogRef.close();
    }
}
