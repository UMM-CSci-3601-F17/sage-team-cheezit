import {DeckListPage} from "./deck-list.po";
import {by} from 'protractor';


describe('deck-list-page', () => {
   let page: DeckListPage;

   beforeEach(() => {
       page = new DeckListPage();
       page.navigateTo();
   });

   it('should highlight title header', () => {
       expect(page.getPageTitle()).toEqual('Decks');
   });

    it("should have a play button for every deck", () => {
        page.getAllDecks().each(e => {
           expect(e.element(by.id('play')).getText()).toEqual("Play");
        });
    });

    it('should have a working add deck button', () => {
       page.getAllDecks().count().then( beforecount => {
           page.clickButton('deckDialog');
           page.typeInput('deckName', 'newDeck', true);
           expect(page.getAllDecks().count()).toEqual(beforecount + 1);

       });
    });



});
