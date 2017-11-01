import {Component, Inject, Injectable, Input, OnInit, Optional} from '@angular/core';
import {Card} from "../card/card";
import {Observable} from "rxjs/Observable";
import {ActivatedRoute} from "@angular/router";
import {SaveCardDialogComponent} from "../save-card-dialog/save-card-dialog.component"
import {MatDialog,MatDialogRef, MAT_DIALOG_DATA, MatSnackBar} from "@angular/material";
import {Deck} from "../deck/deck";
import {DeckService} from "../deck/deck.service";


@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})

@Injectable()
export class CardComponent implements OnInit {

    @Input() card: Card;
    deckId: string;
    cardId: string;
    deck: Deck;
    cards: Card[];
    @Input() selected?: number[] = [];

    constructor(public deckService: DeckService, private route: ActivatedRoute,
                @Optional() @Inject(MAT_DIALOG_DATA)  public data: { card, cardId, deckId },
                public dialog: MatDialog, public snackBar: MatSnackBar) {
    }

    openEditDialog() {
        let dialogRef = this.dialog.open(SaveCardDialogComponent, {
            data: {card: this.card, deckId: this.deckId, cardId: this.cardId},
        });
        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.deck.cards.push(result);
            }
        });
    }

    public deleteCard(): void {
            console.log(this.deckId);
            console.log(this.cardId);

        this.route.params.subscribe(params => {
            //this.cardId = params[data.cardId];
            //this.deckId = params['id'];
                this.deckService.deleteCard(this.deckId, this.cardId);
        });
    }

    ngOnInit() {
        this.route.params.subscribe(params => {
            this.cardId = params['id'];
            this.deckId = params['id'];

            this.deckService.getDeck(this.deckId).subscribe(
                deck => {
                    this.deck = deck;
                }
            );

            /* TODO : Implement subscribe might wanna force using Observable.fromPromise
                          this.deckService.addNewCard(
                              this.deckId,
                              this.card.word,
                              this.card.synonym,
                              this.card.antonym,
                              this.card.general_sense,
                              this.card.example_usage).subscribe(
                                    deckId => this.deckId = deckId,
                                    word => this.card.word = word,
                                    synonym => this.card.synonym = synonym,
                                    antonym => this.card.antonym = antonym,
                                    general_sense => this.card.general_sense = general_sense,
                                    example_usage => this.card.example_usage = example_usage
                                )

                          this.deckService.editCard(
                              this.deckId,
                              this.cardId,
                              this.card.word,
                              this.card.synonym,
                              this.card.antonym,
                              this.card.general_sense,
                              this.card.example_usage).subscribe(
                                    deckId => this.deckId = deckId,
                                    word => this.card.word = word,
                                    synonym => this.card.synonym = synonym,
                                    antonym => this.card.antonym = antonym,
                                    general_sense => this.card.general_sense = general_sense,
                                    example_usage => this.card.example_usage = example_usage
                                )
            */
        });
    }

    public editCard(): MatDialogRef<SaveCardDialogComponent> {
        return this.dialog.open(SaveCardDialogComponent, {
            data: {cards: this.cards}
        });
    }
}
