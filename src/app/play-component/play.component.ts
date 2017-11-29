import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {DeckService} from "../deck/deck.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Deck} from "../deck/deck";
import {CardState} from "./CardState";
import {Card} from "../card/card";
import {AngularFireDatabase} from "angularfire2/database";
import {MatDialogRef, MAT_DIALOG_DATA, MatDialog} from "@angular/material";
import * as firebase from 'firebase/app';


@Component({
    selector: 'app-play',
    templateUrl: './play.component.html',
    styleUrls: ['./play.component.scss'],
})
export class PlayComponent implements OnInit, OnDestroy {

    deckid : string;

    deck : Deck;

    private _pageNumber: number = 0;

    public get pageNumber(): number {
        return this._pageNumber;
    }

    public set pageNumber(i: number) {
        let oldI = this._pageNumber;
        this._pageNumber = i;
        if(i != oldI) {
            this.updateGame();
        }

    }

    public pageCount: number = 0;

    public points: number = 0;

    public gameId: string;

    public cardStates: CardState[];

    public gameURL: string;



    // from https://stackoverflow.com/a/41993719/8855259

    randNumDigits(digits: number) {
        return Math.floor(Math.random()*parseInt('8' + '9'.repeat(digits-1))+parseInt('1' + '0'.repeat(digits-1)));
    }


    constructor(public deckService : DeckService, private route: ActivatedRoute,
                private db: AngularFireDatabase, public dialog: MatDialog,
                private router: Router) {
        this.gameId = this.randNumDigits(6).toString();
        this.gameURL = document.location.origin + this.router.createUrlTree(['/joingame'], { queryParams: { id: this.gameId } }).toString();


        const ref = firebase.database().ref('games').child(this.gameId);
        ref.onDisconnect().remove();
    }

    public updateGame() {
        if(this.cardStates.length == 0) return;
        console.log("update game called " + this.pageNumber);
        this.db.object('games/' + this.gameId).set({
            card: this.cardStates[this.pageNumber].playCard,
            points: this.points,
            selectedHints: this.cardStates[this.pageNumber].selectedCardHints
        });
    }


    public addPoints(pageNumber : number): void {

        if(this.cardStates[pageNumber].isComplete == false && pageNumber < this.cardStates.length){
            this.points += this.cardStates[pageNumber].cardPoints;
            this.cardStates[pageNumber].selectedCardHints = [];
            this.cardStates[pageNumber].isDone();
            this.pageNumber = pageNumber + 1;
        }
        //this.updateGame();
    }


    ngOnInit() {

        this.route.params.subscribe(params => {
            this.deckid = params['deck'];

            this.deckService.getDeckPlayCards(this.deckid).take(1).subscribe(cards => { //take(1) means we are only getting it once so later changes don't apply
                this.cardStates = cards.map(c => new CardState(c)); // maps incoming cards into card states
                this.updateGame();
            });
        });
    }

    ngOnDestroy() {
        if(this.gameId)
            this.db.object('games/' + this.gameId).remove();
    }

    showGameId() {
        this.dialog.open(GameJoinDialogComponent, {
            data: { gameId: this.gameId, gameURL: this.gameURL },
        })
    }

}

// a style for this is in the main styles.scss to be able to center the qr code
@Component({
    selector: 'app-game-id-dialog',
    template: '<h2 mat-dialog-title>Game ID</h2>' +
    '<mat-dialog-content>' +
    '<h1 style="text-align: center;">{{this.data.gameId}}</h1>' +
    '<ngx-qrcode class="play-game-id-qrcode" qrc-element-type="url" [qrc-value]="this.data.gameURL"></ngx-qrcode>' +
    '</mat-dialog-content>' +
    '<mat-dialog-actions align="end">' +
    '<button mat-button *ngIf="!this.canShare" ngxClipboard [cbContent]="this.data.gameURL" matTooltip="Copy URL"><mat-icon>content_copy</mat-icon></button>' +
    '<button mat-button *ngIf="this.canShare" (click)="this.browserShareInvite()"><mat-icon>share</mat-icon></button>' +
    '<button mat-button mat-dialog-close>Close</button>' +
    '</mat-dialog-actions>'
})
export class GameJoinDialogComponent {

    constructor(
        public dialogRef: MatDialogRef<GameJoinDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: {gameId: string, gameURL: string}) { }


    browserShareInvite() {
        if (navigator.share) {
            navigator.share({
                title: 'Invite to SAGE game',
                url: this.data.gameURL,
            });
        }
    }

    canShare = navigator.share;

}
