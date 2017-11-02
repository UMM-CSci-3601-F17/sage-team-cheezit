import {Component, OnDestroy, OnInit} from '@angular/core';
import {AngularFireDatabase} from "angularfire2/database";
import {Card} from "../card/card";
import {Observable} from "rxjs/Observable";
import {componentDestroyed} from "ng2-rx-componentdestroyed";

@Component({
    selector: 'app-join-game',
    templateUrl: './join-game.component.html',
    styleUrls: ['./join-game.component.css']
})
export class JoinGameComponent implements OnInit, OnDestroy {

    constructor(private db: AngularFireDatabase) {

    }

    public inGame: boolean = false;

    public gameId: string;

    public card: Card;
    public points: number = 0;
    public selectedHints: number[] = [];

    game: Observable<any>;

    public joinGame() {
        if(!this.gameId) return;
        this.game = this.db.object('games/' + this.gameId).valueChanges();
        this.game.takeUntil(componentDestroyed(this)).subscribe(ob => {
            if (ob) {
                this.card = ob.card;
                this.points = ob.points;
                if(ob.selectedHints)
                    this.selectedHints = ob.selectedHints;
                else
                    this.selectedHints = [];
            } else {
                this.card = null;
                this.points = null;
                this.selectedHints = null;
            }
        });
        this.inGame = true;
    }

    ngOnInit() {
    }

    ngOnDestroy() {
    }

}
