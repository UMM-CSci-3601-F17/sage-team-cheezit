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

import {Observable} from "rxjs/Observable";
import {Card} from "../card/card";


@Component({
  selector: 'app-deck',
  templateUrl: './deck.component.html',
  styleUrls: ['./deck.component.css']
})
export class DeckComponent implements OnInit {

    id : string;
    fadeDiv: boolean = true;
    deck : Deck;
    cardAddSuccess: boolean = false;

    newCardWord: string = "";
    newCardSynonym: string = "";
    newCardAntonym: string = "";
    newCardGeneral: string = "";
    newCardExample: string = "";


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

    fade(): void {
      this.fadeDiv = !this.fadeDiv;
    }

    public addNewCard(deckId: string, word: string, synonym: string, antonym: string, general: string, example: string): void {
        if (this.newCardWord === "" || this.newCardSynonym === "" || this.newCardAntonym === "" || this.newCardExample==="" || this.newCardGeneral===""){
            alert("Please complete all fields.");
        }
        else {
            this.newCardWord = "";
            this.newCardSynonym = "";
            this.newCardAntonym = "";
            this.newCardGeneral = "";
            this.newCardExample = "";

            this.deckService.addNewCard(deckId, word, synonym, antonym, general, example).subscribe(
                succeeded => {
                    this.cardAddSuccess = true;
                    this.refreshDeck();
                });
        }
    }

    refreshDeck(): Observable<Deck> {
        //Get Users returns an Observable, basically a "promise" that
        //we will get the data from the server.
        //
        //Subscribe waits until the data is fully downloaded, then
        //performs an action on it (the first lambda)

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
