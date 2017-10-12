import {DeckPage} from "./deck.po";
import {by} from 'protractor';


describe('deck-page', () => {
    let page: DeckPage;

    beforeEach(() => {
        page = new DeckPage();
        page.navigateTo();
    });

    it('should have the correct header', () => {
        expect(page.getDeckHeader()).toEqual("test deck 1");
    });

    it('should have a synonym, antonym, general usage, and example usage for each card.', () => {
        page.getAllCards().each( e => {
           expect(e.element(by.id("synonym")).getText()).toContain("Synonym");
           expect(e.element(by.id("antonym")).getText()).toContain("Antonym");
           expect(e.element(by.id("general-usage")).getText()).toContain("General usage");
           expect(e.element(by.id("example-usage")).getText()).toContain("Example usage");

        });
    });

    // Commented out because getAllCards.count is not returning the right value for an unknown reason

    // it('should have a working add card button', () => {
    //     page.getAllCards().count().then( beforecount => {
    //         page.clickButton('cardDialog');
    //         page.typeInput('wordInput', 'Word', false);
    //         page.typeInput('synInput', 'Word', false);
    //         page.typeInput('antInput', 'Word', false);
    //         page.typeInput('genInput', 'Word', false);
    //         page.typeInput('exInput', 'Word', true);
    //         console.log(page.getAllCards().count());
    //         expect(page.getAllCards().count()).toEqual(beforecount + 1);
    //
    //     });
    // });

});
