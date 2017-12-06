import {Card, PlayCard} from "../card/card";

export class CardState {

    public cardPoints: number;
    public cardHints: number[];
    public isComplete: boolean;
    public selectedCardHints: number[];
    public playCard: PlayCard;
    public emoji: string;



    constructor(card: Card){
        this.cardPoints = 5;
        this.cardHints = [1,2,3,4];
        this.isComplete = false;
        this.selectedCardHints = [];
        this.emoji = "";

        this.playCard = {
            word: card.word,
            synonym: this.getRandomHint(card.synonym),
            antonym: this.getRandomHint(card.antonym),
            general_sense: card.general_sense,
            example_usage: card.example_usage
        }
    }

    public randomizeSages(): void{
        if(this.cardHints.length > 0 && !this.isComplete) {
            let randnum = Math.floor(Math.random() * this.cardHints.length);
            this.selectedCardHints.push(this.cardHints[randnum]);

            this.cardHints.splice(randnum, 1);
            this.cardPoints = this.cardPoints - 1;
        }
    }

    private getRandomHint(hints: string[]): string {
        if(hints.length == 0) return null;
        return hints[Math.floor(Math.random() * (hints.length))];
    }


    public isDone(): void {
        this.isComplete = true;
    }


}
