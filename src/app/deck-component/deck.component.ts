import {Component, OnInit} from '@angular/core';
import {DeckService} from "../deck/deck.service";
import {ActivatedRoute} from "@angular/router";
import {Deck} from "../deck/deck";
import {NewCardDialogComponent} from "../new-card-dialog/new-card-dialog.component";
import {MdDialog} from "@angular/material";
import {Card} from "../card/card";


@Component({
  selector: 'app-deck',
  templateUrl: './deck.component.html',
  styleUrls: ['./deck.component.css']
})
export class DeckComponent implements OnInit {

    id : string;
    deck : Deck;
    cards: Card[];


  constructor(public deckService : DeckService, private route: ActivatedRoute, public dialog : MdDialog) {


  }

  openAddDialog() {
      let dialogRef = this.dialog.open(NewCardDialogComponent, {
          data: { deckId: this.id },
      });
      dialogRef.afterClosed().subscribe(result => {
          if(result) {
              //this.deck.cards.push(result);
          }
      });
  }


  ngOnInit() {
      this.route.params.subscribe(params => {
          this.id = params['id'];

          this.deckService.getDeck(this.id).subscribe(
              deck => {
                  this.deck = deck;
              }
          );

          this.deckService.getDeckCards(this.id).subscribe(cards => {
              this.cards = cards;
          });
      });
  }


}
