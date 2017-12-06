import {Injectable} from "@angular/core";
import {Deck, DeckId} from "./deck";
import {Observable} from "rxjs/Observable";
import {Card} from "../card/card";

@Injectable()
export class DeckServiceMock {
    constructor() {
    }

    public getPublicDecks: Observable<DeckId[]> = Observable.of([
            {
                id: "testid",
                name: "test deck",
                isPublic: true
            },
            {
                id: "testid2",
                name: "test deck 2",
                isPublic: true
            }
        ]);

    public getClassDecks(): Observable<DeckId[]> {
        return Observable.of([
            {
                id: "testid",
                name: "test deck",
                classId: "testclassid"
            },
            {
                id: "testid2",
                name: "test deck 2",
                classId: "testclassid2"
            }
        ]);
    }

    public getUserDecks: Observable<DeckId[]> = Observable.of([
            {
                id: "testid",
                name: "test deck",
                users : {
                    "testuid" : {
                        nickname: "test",
                        owner: true
                    }
                }
            },
            {
                id: "testid2",
                name: "test deck 2",
                users : {
                    "testuid" : {
                        nickname: "test",
                        owner: true
                    }
                }
            }
        ]);

    public getDeck(id: string): Observable<Deck> {
        return Observable.of({
            name: "test deck",
            classId: "testclassid"
        })
    }

    public getDeckCards(id: string): Observable<Card[]> {
        return Observable.of([
            {
                word : "test word",
                synonym : "test synonym",
                antonym: "test antonym",
                general_sense: "test general_sense",
                example_usage: "test example_usage",
                hidden: false
            },
            {
                word : "test word",
                synonym : "test synonym",
                antonym: "test antonym",
                general_sense: "test general_sense",
                example_usage: "test example_usage",
                hidden: false,
            }
        ])
    }

    public getDeckPlayCards(id: string): Observable<Card[]> {
        return Observable.of([
            {
                word : "test word",
                synonym : "test synonym",
                antonym: "test antonym",
                general_sense: "test general_sense",
                example_usage: "test example_usage",
                hidden: false
            },
            {
                word : "test word",
                synonym : "test synonym",
                antonym: "test antonym",
                general_sense: "test general_sense",
                example_usage: "test example_usage",
                hidden: false,
            }
        ])
    }

    public addNewCard(deckID: string, word: string, synonym: string, antonym: string, general: string, example: string) {
        return true;
    }

    public addNewDeckClass(name: string, classId : string) {
        return true;
    }

    public addNewDeckUser(name: string) {
        return true;
    }

    public moveDeckToClass(deckId: string, classId: string) {
        return Observable.of(true);
    }

    public moveDeckToMyDecks(deckId: string) {
        return Observable.of(true);
    }

}
