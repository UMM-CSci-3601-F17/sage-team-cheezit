import {Card} from "../card/card";

export interface Deck {
    _id: {
        $oid: string
    },
    name: string,
    cards: Card[]
}
