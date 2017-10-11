import {DeckListPage} from "./deck-list.po";
import {browser, protractor} from 'protractor';

describe('deck-list-page', () => {
   let page: DeckListPage;

   beforeEach(() => {
       page = new DeckListPage();
   });

   it('should highlight title header', () => {
       page.navigateTo();
       expect(page.getPageTitle()).toEqual('Decks');
   });





});
