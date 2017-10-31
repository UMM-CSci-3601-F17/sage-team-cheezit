import { Component, OnInit } from '@angular/core';
import {DeckService} from "../deck/deck.service";
import {AngularFireAuth} from "angularfire2/auth";
import {MdDialog} from "@angular/material";
import {Deck} from "../deck/deck";
import {ActivatedRoute} from "@angular/router";
import {NewDeckDialogComponent} from "../new-deck-dialog/new-deck-dialog.component";
import {ClassService} from "../class/class.service";
import {Class} from "../class/class";

@Component({
  selector: 'app-class',
  templateUrl: './class.component.html',
  styleUrls: ['./class.component.css']
})
export class ClassComponent implements OnInit {

    constructor(public deckService: DeckService, public classService: ClassService, public afAuth: AngularFireAuth, public dialog : MdDialog, private route: ActivatedRoute) {

    }

    public id: string;

    public decks: Deck[];

    public currentClass: Class;

    public canEdit: boolean = false;

    ngOnInit() {

        this.route.params.subscribe(params => {
            this.id = params['id'];

            this.classService.getClass(this.id).subscribe(c => {
                this.currentClass = c;

                this.afAuth.authState.subscribe(state => {
                    this.canEdit = c.users[state.uid].teacher;
                })

            });

            this.deckService.getClassDecks(this.id).subscribe(
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

}
