import {PublicDecksPage} from "./publicdecks.po";
import {browser, by} from 'protractor';


describe('mydecks-page', () => {
    let page: PublicDecksPage;
    browser.ignoreSynchronization = true;

    beforeEach(() => {
        page = new PublicDecksPage();
        page.navigateTo();
        browser.sleep(1000);
    });


    it('should highlight title header', () => {
        expect(page.getPageTitle()).toEqual('Public Decks');
    });

    it("should have a play button and a deck name link for every deck", () => {
        page.getAllDecks().each(e => {
            expect(e.element(by.className('play-button')).getTagName()).toEqual("button");
            expect(e.element(by.className('play-button')).getText()).toEqual("Play");
            expect(e.element(by.className('deck-name')).getTagName()).toEqual("a");
        });
    });
});
