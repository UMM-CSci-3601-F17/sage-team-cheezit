import * as firebase from "firebase";
import FieldValue = firebase.firestore.FieldValue;

export interface Card {
    //_id: string,
    word: string,
    synonym: string[],
    antonym: string[],
    general_sense: string[],
    example_usage: string[],
    hidden: boolean,
    history?: {
        userCreated?: string,
        timeCreated?: Date,
        userEdited?: string,
        timeEdited?: Date
    }
}
export interface PlayCard {
    word: string,
    synonym: string,
    antonym: string,
    general_sense: string,
    example_usage: string,
}

export interface CardId extends Card { id: string }
