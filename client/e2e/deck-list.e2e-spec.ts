import {DeckListPage} from "./deck-list.po";
import {browser, by, protractor} from 'protractor';

describe('deck-list-page', () => {
   let page: DeckListPage;

   beforeEach(() => {
       page = new DeckListPage();
   });

   it('should highlight title header', () => {
       page.navigateTo();
       expect(page.getPageTitle()).toEqual('Decks');
   });

    it("should have a play button for every deck", () => {
       page.navigateTo();
        page.getAllDecks().each(e => {
           expect(e.element(by.id('play')).getText()).toEqual("Play");
        });
    });



});
