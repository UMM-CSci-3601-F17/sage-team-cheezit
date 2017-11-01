import {Card} from "../card/card";

export interface Deck {
    name: string,
    cards: Card[]
}

export interface DeckId extends Deck { id: string; }

