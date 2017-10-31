
export interface Deck {
    name: string,
    users?: {
        [index: string]: {
            nickname: string;
            owner: boolean
        }
    },
    classId?: string,
    isPublic?: boolean
    //cards: Card[]
}

export interface DeckId extends Deck { id: string; }

