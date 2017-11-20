import {Injectable} from '@angular/core';
import {Deck, DeckId} from "./deck";
import {Observable} from "rxjs/Observable";
import "rxjs/add/operator/map";
import {AngularFirestore, AngularFirestoreCollection} from "angularfire2/firestore";
import {Card, CardId} from "../card/card";
import {AngularFireAuth} from "angularfire2/auth";
import {QueryFn} from "angularfire2/firestore/interfaces";
import * as firebase from "firebase";


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
            // true is > false. We use this to get all decks where the user is the owner or not.
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

    public getDeckCards(id: string, queryFn?: QueryFn): Observable<CardId[]> {
        let cards: Observable<CardId[]> = this.db.doc('decks/' + id).collection<Card>('cards', queryFn).snapshotChanges().map(actions => {
            return actions.map(a => {
                const data = a.payload.doc.data() as Card;
                const id = a.payload.doc.id;
                return {id, ...data};
            })
        });
        return cards;
    }

    public getDeckPlayCards(id: string){
        return this.getDeckCards(id, ref => ref.where("hidden", "==" , false))
    }

    public addNewCard(deckID: string, word: string, synonym: string, antonym: string, general: string, example: string) {
        const body : Card = {
            word: word,
            synonym: synonym,
            antonym: antonym,
            general_sense: general,
            example_usage: example,
            hidden: false
        };
        console.log(body);

        return this.db.doc('decks/' + deckID).collection('cards').add(body);
    }

    public addNewDeckClass(name: string, classId : string) {
        let deckCollection = this.db.collection<Deck>('decks');
        return deckCollection.add({name: name, classId: classId});
    }

    public cardHide(deckId: string, cardId: string, isHidden: boolean){
        return this.db.doc('decks/' + deckId + '/cards/' + cardId ).update({hidden: isHidden });
    }

    public studentEdit(deckId: string, canEdit: boolean){
        return this.db.doc('decks/' + deckId).update({studentEdit: canEdit});
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
    public editCard(deckId: string, cardId: string, word: string, synonym: string, antonym: string, general: string, example: string) {
        const body = {
            word: word,
            synonym: synonym,
            antonym: antonym,
            general_sense: general,
            example_usage: example,
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

    public moveDeckToClass(deckId: string, classId: string) {
        return this.db.doc("decks/" + deckId).update({
            classId: classId,
            users: firebase.firestore.FieldValue.delete()
        });
    }

    public moveDeckToMyDecks(deckId: string) {
        return this.db.doc("decks/" + deckId).update({
            classId: firebase.firestore.FieldValue.delete(),
            users: {
                [this.afAuth.auth.currentUser.uid] : {
                    nickname: this.afAuth.auth.currentUser.displayName,
                    owner: true
                }}
        });
    }

    public updateTags(deckId: string, newTags: string[]) {
        return this.db.doc("decks/" + deckId).update({
            tags: newTags
        });
    }
}
