import {DeckPage} from "./deck.po";
import {browser, by, protractor} from 'protractor';


describe('deck-page', () => {
    let page: DeckPage;

    beforeEach(() => {
        page = new DeckPage();
    });

    it('should have the correct header', () => {
       page.navigateTo();
       expect(page.getDeckHeader()).toEqual("test deck 2");
    });

    it('should have a synonym, antonym, general usage, and example usage for each card.', () => {
        page.navigateTo();
        page.getAllCards().each( e => {
           expect(e.element(by.id("synonym")).getText()).toContain("Synonym");
           expect(e.element(by.id("antonym")).getText()).toContain("Antonym");
           expect(e.element(by.id("general-usage")).getText()).toContain("General usage");
           expect(e.element(by.id("example-usage")).getText()).toContain("Example usage");

        });
    });

});
