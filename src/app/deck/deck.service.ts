import {Injectable} from '@angular/core';
import {Deck, DeckId} from "./deck";
import {Observable} from "rxjs/Observable";
import "rxjs/add/operator/map";
import {AngularFirestore, AngularFirestoreCollection} from "angularfire2/firestore";
import {Card} from "../card/card";


@Injectable()
export class DeckService {

    private deckCollection: AngularFirestoreCollection<Deck>;
    decks: Observable<DeckId[]>;

    constructor(public db: AngularFirestore) {
        this.deckCollection = db.collection<Deck>('decks');
        this.decks = this.deckCollection.snapshotChanges().map(actions => {
            return actions.map(a => {
                const data = a.payload.doc.data() as Deck;
                const id = a.payload.doc.id;
                return {id, ...data};
            })
        });
    }

    public getDeck(id: string): Observable<Deck> {
        let newDeck: Observable<Deck> = this.db.doc<Deck>('decks/' + id).valueChanges();
        return newDeck;
    }

    public getDeckCards(id: string): Observable<Card[]> {
        let cards: Observable<Card[]> = this.db.doc('decks/' + id).collection<Card>('cards').valueChanges();
        return cards;
    }

    public addNewDeck(name: string, cards: Card[]) {
        return this.deckCollection.add({name: name, cards: cards});
    }


    public addNewCard(deckID: string, word: string, synonym: string, antonym: string, general: string, example: string) {
        const body: Card = {
            word: word,
            synonym: synonym,
            antonym: antonym,
            general_sense: general,
            example_usage: example
        }
        console.log(body);

        return this.db.doc('decks/' + deckID).collection('cards').add(body);
    }


    public editCard(deckId: string, cardId: string, word: string, synonym: string, antonym: string, general: string, example: string) {
        const body: Card = {
            word: word,
            synonym: synonym,
            antonym: antonym,
            general_sense: general,
            example_usage: example
        };
        return this.db.doc('decks/' + deckId + '/cards/' + cardId).set(body);
    }

    public deleteCard(deckId: string, cardId: string){
        console.log(deckId);
        console.log(cardId);
        return this.db.doc('decks/' + deckId).collection('cards').doc(cardId).delete();
    }
}
