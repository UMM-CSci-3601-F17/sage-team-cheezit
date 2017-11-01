import {Component, Input, OnInit} from '@angular/core';
import {Card, CardId} from "../card/card";
import {SaveCardDialogComponent} from "../save-card-dialog/save-card-dialog.component";
import {MatDialog, MatSnackBar} from "@angular/material";
import {DeckService} from "../deck/deck.service";

@Component({
    selector: 'app-card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

    constructor(public edit: MatDialog, public deckService: DeckService, public snackBar: MatSnackBar) {
    }

    @Input() card: CardId;

    @Input() deckId: string;

    @Input() selected?: number[] = [];

    ngOnInit() {
    }

    public editCard() {
        this.edit.open(SaveCardDialogComponent, {
            data: {card: this.card, deckId: this.deckId}
        });
    };

    public deleteCard() {
        this.deckService.deleteCard(this.deckId, this.card.id).then(result => {
            this.snackBar.open("Deleted card", null, {
                duration: 2000,
            });
        }, err => {
            this.snackBar.open("Error deleting card", null, {
            duration: 2000,
        });
        })
    }

}
