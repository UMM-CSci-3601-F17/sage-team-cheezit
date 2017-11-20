import {Component, OnDestroy, OnInit} from '@angular/core';
import {DeckService} from "../deck/deck.service";
import {ActivatedRoute} from "@angular/router";
import {Deck} from "../deck/deck";
import {NewCardDialogComponent} from "../new-card-dialog/new-card-dialog.component";
import {MatDialog, MatSnackBar} from "@angular/material";
import {Card, CardId} from "../card/card";
import {ClassService} from "../class/class.service";
import {AngularFireAuth} from "angularfire2/auth";
import {componentDestroyed} from "ng2-rx-componentdestroyed";
import {SaveCardDialogComponent} from "../save-card-dialog/save-card-dialog.component";


@Component({
    selector: 'app-deck',
    templateUrl: './deck.component.html',
    styleUrls: ['./deck.component.scss']
})
export class DeckComponent implements OnInit, OnDestroy {

    id: string;
    deck: Deck;
    cards: CardId[];
    loaded: boolean = false;


    constructor(public afAuth: AngularFireAuth, public dialog: MatDialog, public deckService: DeckService, public snackBar: MatSnackBar, public classService: ClassService, private route: ActivatedRoute) {

    }

    openAddDialog() {
        let dialogRef = this.dialog.open(NewCardDialogComponent, {
            data: {deckId: this.id},
        });
        dialogRef.afterClosed().subscribe(result => {

        });
    }

    public canEdit(): boolean {
        if (!this.deck) return false;
        if(this.deck.isPublic) return false;
        if (this.deck.classId) {
            return this.deck.studentEdit || this.isTeacher();
        } else if (this.deck.users) {
            return this.deck.users[this.afAuth.auth.currentUser.uid] &&
                this.deck.users[this.afAuth.auth.currentUser.uid].owner;
        }
    }

    public isTeacher(): boolean {
        if(!this.deck) return false;
        return this.classService.isTeacher(this.deck.classId);
    }

    public deckOwner(): boolean {
        return this.canEdit() && (!this.deck.classId || (this.deck.classId && this.isTeacher()));
    }


    public toggleStudentEdit(){
        return this.deckService.studentEdit(this.id, !this.deck.studentEdit);
    }

    ngOnInit() {
        this.route.params.subscribe(params => {
            this.id = params['id'];

            this.deckService.getDeck(this.id).takeUntil(componentDestroyed(this)).subscribe(
                deck => {
                    console.log(deck);
                    this.deck = deck;
                    this.loaded = true;
                }
            );

            this.deckService.getDeckCards(this.id).takeUntil(componentDestroyed(this)).subscribe(cards => {
                console.log(cards);
                this.cards = cards;
            });
        });
    }


    public editCard(card: CardId) {
        this.dialog.open(SaveCardDialogComponent, {
            data: {card: card, deckId: this.id}
        });
    };

    public cardHide(cardId: string, isHidden: boolean){
        this.deckService.cardHide(this.id, cardId, isHidden)
    }

    public deleteCard(cardId: string) {
        this.deckService.deleteCard(this.id, cardId).then(result => {
            this.snackBar.open("Deleted card", null, {
                duration: 2000,
            });
        }, err => {
            this.snackBar.open("Error deleting card", null, {
                duration: 2000,
            });
        })
    }

    public moveToMyDecks() {
        this.deckService.moveDeckToMyDecks(this.id,).then(result => {
            this.snackBar.open("Moved Deck to My Decks", null, {
                duration: 2000,
            });
        }, err => {
            this.snackBar.open("Error moving deck", null, {
                duration: 2000,
            });
        })
    }

    public moveToClass(classId: string, className: string) {
        this.deckService.moveDeckToClass(this.id, classId).then(result => {
            this.snackBar.open("Moved Deck to " + className, null, {
                duration: 2000,
            });
        }, err => {
            this.snackBar.open("Error moving deck", null, {
                duration: 2000,
            });
        })
    }

    ngOnDestroy() {
        console.log("deck destroyed");
        this.loaded = false;
    }


}
