import {Component, OnDestroy, OnInit} from '@angular/core';
import {DeckService} from "../deck/deck.service";
import {ActivatedRoute} from "@angular/router";
import {Deck} from "../deck/deck";
import {NewCardDialogComponent} from "../new-card-dialog/new-card-dialog.component";
import {MdDialog} from "@angular/material";
import {Card, CardId} from "../card/card";
import {ClassService} from "../class/class.service";
import {AngularFireAuth} from "angularfire2/auth";
import {componentDestroyed} from "ng2-rx-componentdestroyed";


@Component({
  selector: 'app-deck',
  templateUrl: './deck.component.html',
  styleUrls: ['./deck.component.css']
})
export class DeckComponent implements OnInit, OnDestroy {

    id : string;
    deck : Deck;
    cards: CardId[];


  constructor(public afAuth: AngularFireAuth, public deckService : DeckService, public classService: ClassService, private route: ActivatedRoute, public dialog : MdDialog) {

  }

  openAddDialog() {
      let dialogRef = this.dialog.open(NewCardDialogComponent, {
          data: { deckId: this.id },
      });
      dialogRef.afterClosed().subscribe(result => {

      });
  }

  public canEdit(): boolean {
      if(!this.deck) return false;
      if(this.deck.classId) {
          return this.classService.canEdit(this.deck.classId);
      } else if(this.deck.users) {
          return this.deck.users[this.afAuth.auth.currentUser.uid] &&
              this.deck.users[this.afAuth.auth.currentUser.uid].owner;
      }
  }


  ngOnInit() {
      this.route.params.subscribe(params => {
          this.id = params['id'];

          this.deckService.getDeck(this.id).takeUntil(componentDestroyed(this)).subscribe(
              deck => {
                  this.deck = deck;
              }
          );

          this.deckService.getDeckCards(this.id).takeUntil(componentDestroyed(this)).subscribe(cards => {
              this.cards = cards;
          });
      });
  }

    ngOnDestroy() {
      console.log("deck destroyed");
    }


}
