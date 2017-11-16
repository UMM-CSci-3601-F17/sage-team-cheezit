export interface Card {
    //_id: string,
    word: string,
    synonym: string,
    antonym: string,
    general_sense: string,
    example_usage: string,
    hidden?: boolean
}
export interface CardId extends Card { id: string }
