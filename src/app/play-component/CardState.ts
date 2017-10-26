



export class CardState {
    public cardPoints: number;
    public cardHints: number[];
    public isComplete: boolean;
    public selectedCardHints: number[];


    constructor(){
        this.cardPoints = 5;
        this.cardHints = [1,2,3,4];
        this.isComplete = false;
        this.selectedCardHints = [];
    }

    public randomizeSages(): void{
        if(this.cardHints.length > 0 && !this.isComplete) {
            let randnum = Math.floor(Math.random() * this.cardHints.length);
            this.selectedCardHints.push(this.cardHints[randnum]);

            this.cardHints.splice(randnum, 1);
            this.cardPoints = this.cardPoints - 1;
        }


    }


    public isDone(): void {
        this.isComplete = true;
    }


}
