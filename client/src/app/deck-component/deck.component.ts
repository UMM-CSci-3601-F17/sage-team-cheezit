import {Component, EventEmitter, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {DeckService} from "../deck/deck.service";
import {ActivatedRoute} from "@angular/router";
import {Deck} from "../deck/deck";
import { ViewContainerRef } from '@angular/core';
import { TdDialogService } from '@covalent/core';
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

    newCardWord: string;
    newCardSynonym: string;
    newCardAntonym: string;
    newCardGeneral: string;
    newCardExample: string;


  constructor(public deckService : DeckService, private route: ActivatedRoute, private _dialogService: TdDialogService,
              private _viewContainerRef: ViewContainerRef) {

  }

    openPrompt(): void {
        this._dialogService.openPrompt({
            message: 'Enter in the word, synonym, antonym, general sense, and example usage for a new card here.',
            disableClose: true || false, // defaults to false
            // viewContainerRef: this._viewContainerRef, //OPTIONAL
            title: 'Add New Card', //OPTIONAL, hides if not provided
            value: 'Enter word', //OPTIONAL
            cancelButton: 'Cancel', //OPTIONAL, defaults to 'CANCEL'
            acceptButton: 'Add', //OPTIONAL, defaults to 'ACCEPT'
        }).afterClosed().subscribe((newValue: string) => {
            if (newValue) {
                // DO SOMETHING
            } else {
                // DO SOMETHING ELSE
            }
        });
    }

    fade(): void {
      this.fadeDiv = !this.fadeDiv;
    }

    public addNewCard(deckId: string, word: string, synonym: string, antonym: string, general: string, example: string): void {

        this.newCardWord = null;
        this.newCardSynonym = null;
        this.newCardAntonym = null;
        this.newCardGeneral = null;
        this.newCardExample = null;

        this.deckService.addNewCard(deckId, word, synonym, antonym, general, example).subscribe(
            succeeded => {
                this.cardAddSuccess = true;
                this.refreshDeck();
            });
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
