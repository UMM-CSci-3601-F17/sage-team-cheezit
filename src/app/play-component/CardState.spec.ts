import {CardState} from "./CardState";

describe('CardState', () => {
   let cardState: CardState;

    beforeEach(() => {
    cardState = new CardState({
        word : "test word",
        synonym : ["test synonym 1", "test synony 2"],
        antonym: ["test antonym 1", "test antonym 2"],
        general_sense: "test general_sense",
        example_usage: "test example_usage",
        hidden: false
    });
});

it('should create', () => {
    expect(cardState).toBeTruthy();
});

it('should remove hints from array', () => {
    cardState.randomizeSages();
    expect(cardState.cardHints.length).toEqual(3);
    cardState.randomizeSages();
    expect(cardState.cardHints.length).toEqual(2);
    cardState.randomizeSages();
    expect(cardState.cardHints.length).toEqual(1);

});

it('should lower card points when a hint is used', () => {
    cardState.randomizeSages();
    expect(cardState.cardPoints).toEqual(4);
    cardState.randomizeSages();
    expect(cardState.cardPoints).toEqual(3);
    cardState.randomizeSages();
    expect(cardState.cardPoints).toEqual(2);
});

it('should make isComplete true', () => {
    expect(cardState.isComplete).toEqual(false);
    cardState.isDone();
    expect(cardState.isComplete).toEqual(true);
});

});
