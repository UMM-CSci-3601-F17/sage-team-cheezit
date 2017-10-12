import {Component, EventEmitter, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {DeckService} from "../deck/deck.service";
import {ActivatedRoute} from "@angular/router";
import {Deck} from "../deck/deck";
import { ViewContainerRef } from '@angular/core';
import { TdDialogService } from '@covalent/core';
import {Observable} from "rxjs/Observable";
import {Card} from "../card/card";
import {NewCardDialogComponent} from "../new-card-dialog/new-card-dialog.component";
import {MdDialog} from "@angular/material";


@Component({
  selector: 'app-deck',
  templateUrl: './deck.component.html',
  styleUrls: ['./deck.component.css']
})
export class DeckComponent implements OnInit {

    id : string;

    deck : Deck;


  constructor(public deckService : DeckService, private route: ActivatedRoute, public dialog : MdDialog) {

  }

  openAddDialog() {
      let dialogRef = this.dialog.open(NewCardDialogComponent, {
          data: { deckId: this.id },
      });
      dialogRef.afterClosed().subscribe(result => {
          if(result) {
              this.deck.cards.push(result);
          }
      });
  }




    refreshDeck(): Observable<Deck> {

        let deck : Observable<Deck> = this.deckService.getDeck(this.deck._id.toString());
        deck.subscribe(
            deck => {
                this.deck = deck;
            },
            err => {
                console.log(err);
            });
        return deck;
    }

  ngOnInit() {
      this.route.params.subscribe(params => {
          this.id = params['id'];

          this.deckService.getDeck(this.id).subscribe(
              deck => {
                  this.deck = deck;
              }
          );
      });
  }


}
