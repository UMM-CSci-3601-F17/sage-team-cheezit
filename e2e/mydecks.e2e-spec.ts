import {MyDecksPage} from "./mydecks.po";
import {browser, by} from 'protractor';


describe('mydecks-page', () => {
   let page: MyDecksPage;
    browser.ignoreSynchronization = true;

   beforeEach(() => {
       page = new MyDecksPage();
       page.navigateTo();
       browser.sleep(1000);
   });


   it('should highlight title header', () => {
       expect(page.getPageTitle()).toEqual('My Decks');
   });

    // it("should have a play button and a deck name link for every deck", () => {
    //     page.getAllDecks().each(e => {
    //         expect(e.element(by.className('play-button')).getTagName()).toEqual("button");
    //         expect(e.element(by.className('play-button')).getText()).toEqual("Play");
    //         expect(e.element(by.className('deck-name')).getTagName()).toEqual("a");
    //     });
    // });

    // it('should add one deck', () => {
    //    page.getAllDecks().count().then( beforecount => {
    //        page.addDeck("Test Deck");
    //        browser.sleep(500); // wait for stuff
    //        expect(page.getAllDecks().count()).toEqual(beforecount + 1);
    //    });
    // });
    //
    // it('should add three decks', () => {
    //     page.getAllDecks().count().then( beforecount => {
    //         page.addDeck("Test Deck 1");
    //         browser.sleep(500); // wait for stuff
    //         page.addDeck("Test Deck 2");
    //         browser.sleep(500); // wait for stuff
    //         page.addDeck("Test Deck 3");
    //         browser.sleep(500); // wait for stuff
    //         expect(page.getAllDecks().count()).toEqual(beforecount + 3);
    //     });
    // });
    //
    // it('should add one deck and check that its still there', () => {
    //     page.getAllDecks().count().then( beforecount => {
    //         page.addDeck("Test Deck");
    //         page.navigateTo();
    //         expect(page.getAllDecks().count()).toEqual(beforecount + 1);
    //     });
    // });
    //
    // it('should add a random card and check that its there', () => {
    //     var name = page.randomText(10);
    //
    //     page.addDeck(name)
    //     //browser.sleep(500); // wait for card to be added to list
    //
    //     let e = page.getAllDecks().last();
    //     expect(e.element(by.className("deck-name")).getText()).toEqual(name);
    //
    //});




});
