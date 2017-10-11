import { Injectable } from '@angular/core';
import {Http} from "@angular/http";
import {Deck} from "./deck";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs/Observable";

@Injectable()
export class DeckService {

  constructor(private http: Http) {  }

  public decks: Deck[] ;

  private deckUrl: string = environment.API_URL + "decks";

  private cardUrl: string = environment.API_URL + "cards";

  public getDecks(): void {
      this.http.request(this.deckUrl).map(res => res.json()).subscribe(
          decksres => {
              this.decks = decksres;
          }, err => {
              console.log(err);
          }
      );
  }

  public getDeck(id:string) : Observable<Deck> {
      let newDeck : Observable<Deck> = this.http.request(this.deckUrl + "/" + id).map(res => res.json());
      newDeck.subscribe(
          deckres => {
            //  var index = this.decks.findIndex(x => x._id.$oid == id);
            //  this.decks[index] = deckres;
          }, err => {
              console.log(err);
          }
      );
      return newDeck;
  }



}
