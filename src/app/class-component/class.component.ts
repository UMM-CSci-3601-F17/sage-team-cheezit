import {Component, OnDestroy, OnInit} from '@angular/core';
import {DeckService} from "../deck/deck.service";
import {AngularFireAuth} from "angularfire2/auth";
import {MdDialog} from "@angular/material";
import {Deck} from "../deck/deck";
import {ActivatedRoute, Router} from "@angular/router";
import {NewDeckDialogComponent} from "../new-deck-dialog/new-deck-dialog.component";
import {ClassService} from "../class/class.service";
import {Class} from "../class/class";
import {Location, LocationStrategy, PathLocationStrategy} from "@angular/common";
import {componentDestroyed} from "ng2-rx-componentdestroyed";

@Component({
  selector: 'app-class',
  templateUrl: './class.component.html',
  styleUrls: ['./class.component.css']
})
export class ClassComponent implements OnInit, OnDestroy {

    constructor(public deckService: DeckService, public classService: ClassService,
                public afAuth: AngularFireAuth, public dialog : MdDialog,
                private route: ActivatedRoute, private router: Router) {

    }

    public id: string;

    public decks: Deck[];

    public currentClass: Class;

    public canEdit: boolean = false;

    getJoinUrl() {
        if(!this.currentClass) return "";
        return document.location.origin + this.router.createUrlTree(['/class', this.id, 'join' ], { queryParams: { joincode: this.currentClass.joincode } }).toString();
    }

    ngOnInit() {

        this.route.params.subscribe(params => {
            this.id = params['id'];

            this.classService.getClass(this.id).takeUntil(componentDestroyed(this)).subscribe(c => {
                this.currentClass = c;

                this.afAuth.authState.takeUntil(componentDestroyed(this)).subscribe(state => {
                    this.canEdit = state && c.users[state.uid].teacher;
                })

            });

            this.deckService.getClassDecks(this.id).takeUntil(componentDestroyed(this)).subscribe(
                decks => {
                    this.decks = decks;
                }
            );

        });
    }

    openAddDialog() {
        this.dialog.open(NewDeckDialogComponent, {
            data: { classId: this.id },
        });
    }

    ngOnDestroy() {
    }

}
