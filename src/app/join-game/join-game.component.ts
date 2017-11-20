import {Component, OnDestroy, OnInit} from '@angular/core';
import {AngularFireDatabase} from "angularfire2/database";
import {Card} from "../card/card";
import {Observable} from "rxjs/Observable";
import {componentDestroyed} from "ng2-rx-componentdestroyed";
import {ActivatedRoute, Router} from "@angular/router";
import {Location} from '@angular/common';

@Component({
    selector: 'app-join-game',
    templateUrl: './join-game.component.html',
    styleUrls: ['./join-game.component.css']
})
export class JoinGameComponent implements OnInit, OnDestroy {

    constructor(private db: AngularFireDatabase,  private route: ActivatedRoute,
                private router: Router, private location: Location) {

    }

    public inGame: boolean = false;

    public gameId: string;

    public card: Card;
    public points: number = 0;
    public selectedHints: number[] = [];

    game: Observable<any>;

    public joinGame() {
        if(!this.gameId) return;
        this.location.go(this
            .router
            .createUrlTree([], {relativeTo: this.route, queryParams: {id: this.gameId }})
            .toString());
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

        this.route.queryParams.subscribe(qp => {

            if (qp['id']) {
                this.gameId = qp['id'];
                this.joinGame();
            }

        });
    }

    ngOnDestroy() {
    }

}
