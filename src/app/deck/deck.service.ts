import {Injectable} from '@angular/core';
import {Deck, DeckId} from "./deck";
import {Observable} from "rxjs/Observable";
import "rxjs/add/operator/map";
import {AngularFirestore, AngularFirestoreCollection} from "angularfire2/firestore";
import {Card} from "../card/card";
import {AngularFireAuth} from "angularfire2/auth";
import {QueryFn} from "angularfire2/firestore/interfaces";


@Injectable()
export class DeckService {

    constructor(public db: AngularFirestore, public afAuth: AngularFireAuth) {
    }

    public getDecks(queryFn?: QueryFn): Observable<DeckId[]> {
        let deckCollection = this.db.collection<Deck>('decks', queryFn);
        let decks = deckCollection.snapshotChanges().map(actions => {
            return actions.map(a => {
                const data = a.payload.doc.data() as Deck;
                const id = a.payload.doc.id;
                return {id, ...data };
            })
        });
        return decks;
    }

    public getUserDecks: Observable<DeckId[]> = this.afAuth.authState.switchMap( state => {
            if(state == null) return Observable.of(null);
            return this.getDecks(ref => ref.where("users." + state.uid + ".owner", ">=", false));
        });

    public getPublicDecks: Observable<DeckId[]> = this.getDecks(ref =>  ref.where("isPublic", "==", true));

    public getClassDecks(id: string): Observable<DeckId[]> {
        let classdecks: Observable<DeckId[]> = this.afAuth.authState.switchMap( state => {
            if(state == null) return Observable.of(null);
            return this.getDecks(ref => ref.where("classId", "==", id));
        });
        return classdecks;
    }

    public getDeck(id: string): Observable<Deck> {
        let newDeck: Observable<Deck> = this.db.doc<Deck>('decks/' + id).valueChanges();
        return newDeck;
    }

    public getDeckCards(id: string): Observable<Card[]> {
        let cards: Observable<Card[]> = this.db.doc('decks/' + id).collection<Card>('cards').valueChanges();
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

    public addNewDeckClass(name: string, classId : string) {
        let deckCollection = this.db.collection<Deck>('decks');
        return deckCollection.add({name: name, classId: classId});
    }

    public addNewDeckUser(name: string) {
        if(this.afAuth.auth.currentUser == null) return;
        let deckCollection = this.db.collection<Deck>('decks');
        return deckCollection.add({name: name, users: {
            [this.afAuth.auth.currentUser.uid] : {
                nickname: this.afAuth.auth.currentUser.displayName,
                owner: true
            }}});
    }


}
