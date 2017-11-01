import {Injectable} from '@angular/core';
import {Deck, DeckId} from "./deck";
import {Observable} from "rxjs/Observable";
import "rxjs/add/operator/map";
import {AngularFirestore, AngularFirestoreCollection} from "angularfire2/firestore";
import {Card, CardId} from "../card/card";


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
                return {id, ...data };
            })
        });
    }

    public getDeck(id: string): Observable<Deck> {
        let newDeck: Observable<Deck> = this.db.doc<Deck>('decks/' + id).valueChanges();
        return newDeck;
    }

    public getDeckCards(id: string): Observable<CardId[]> {
        let cards: Observable<CardId[]> = this.db.doc('decks/' + id).collection<Card>('cards').snapshotChanges().map(actions => {
            return actions.map(a => {
                const data = a.payload.doc.data() as Card;
                const id = a.payload.doc.id;
                return {id, ...data};
            })
        });
        return cards;
    }

    public addNewCard(deckID: string, word: string, synonym: string, antonym: string, general: string, example: string) {
        const body : Card = {
            word: word,
            synonym: synonym,
            antonym: antonym,
            general_sense: general,
            example_usage: example
        };
        console.log(body);

        return this.db.doc('decks/' + deckID).collection('cards').add(body);
    }

    public addNewDeck(name: string) {
        return this.deckCollection.add({name: name});
    }

    public editCard(deckId: string, cardId: string, word: string, synonym: string, antonym: string, general: string, example: string) {
        const body : Card = {
            word: word,
            synonym: synonym,
            antonym: antonym,
            general_sense: general,
            example_usage: example
        };
        console.log(body);
        console.log(deckId);
        console.log(cardId);
        return this.db.doc('decks/' + deckId + '/cards/' + cardId).update(body);
    }

    public deleteCard(deckId: string, cardId: string){
        console.log(deckId);
        console.log(cardId);
        return this.db.doc('decks/' + deckId).collection('cards').doc(cardId).delete();
    }
}
