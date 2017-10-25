import {Injectable} from '@angular/core';
import {Http} from "@angular/http";
import {Deck, DeckId} from "./deck";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs/Observable";
import "rxjs/add/operator/map";
import {AngularFirestore, AngularFirestoreCollection} from "angularfire2/firestore";
import {Card} from "../card/card";


@Injectable()
export class DeckService {

    private deckCollection: AngularFirestoreCollection<Deck>;
    decks: Observable<DeckId[]>;

    constructor(private http: Http, public db: AngularFirestore) {
        this.deckCollection = db.collection<Deck>('decks');
        this.decks = this.deckCollection.snapshotChanges().map(actions => {
            return actions.map(a => {
                const data = a.payload.doc.data() as Deck;
                const id = a.payload.doc.id;
                return {id, ...data };
            })
        });
    }

    //public decks: Deck[] ;
    //public decks;

    private deckUrl: string = environment.API_URL + "decks";

    private cardUrl: string = environment.API_URL + "cards";

    public getDecks(): void {
        /* this.http.request(this.deckUrl).map(res => res.json()).subscribe(
             decksres => {
                 this.decks = decksres;
             }, err => {
                 console.log(err);
             }
         );*/
    }

    public getDeck(id: string): Observable<Deck> {
        let newDeck: Observable<Deck> = this.db.doc<Deck>('decks/' + id).valueChanges();
            //this.http.request(this.deckUrl + "/" + id).map(res => res.json());
        return newDeck;
    }

    public getDeckCards(id: string): Observable<Card[]> {
        let cards: Observable<Card[]> = this.db.doc('decks/' + id).collection<Card>('cards').valueChanges();
        return cards;
    }

    public addNewCard(deckID: string, word: string, synonym: string, antonym: string, general: string, example: string) {
        const body : Card = {
            //deckID: deckID,
            word: word,
            synonym: synonym,
            antonym: antonym,
            general_sense: general,
            example_usage: example
        }
        console.log(body);

        //return this.http.post(this.cardUrl + "/add", body).map(res => res.json());
        return this.db.doc('decks/' + deckID).collection('cards').add(body);
    }

    public addNewDeck(name: string) {
        //let response = this.http.post(this.deckUrl + "/add", {name: name}).map(res => res.json());
        return this.deckCollection.add({name: name});
    }


}
