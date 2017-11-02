import {DeckPage} from "./deck.po";
import {browser, by, protractor} from 'protractor';

describe('deck-page', () => {
    let page: DeckPage;
    browser.ignoreSynchronization = true;

    beforeEach(() => {
        page = new DeckPage();
    });

    it('should have the correct header', () => {
        page.navigateTo('5eXZzBvVUufcnrh4o7Rq');
        browser.sleep(1000);
        expect(page.getDeckHeader()).toEqual("Test Deck 1");
    });

    it('should have a synonym, antonym, general usage, and example usage for each card.', () => {
        page.navigateTo('5eXZzBvVUufcnrh4o7Rq');
        browser.sleep(1000);
        page.getAllCards().each( e => {
           expect(e.element(by.className("card-synonym")).element(by.className("card-desc")).getText()).toContain("Synonym");
           expect(e.element(by.className("card-antonym")).element(by.className("card-desc")).getText()).toContain("Antonym");
           expect(e.element(by.className("card-general-usage")).element(by.className("card-desc")).getText()).toContain("General usage");
           expect(e.element(by.className("card-example-usage")).element(by.className("card-desc")).getText()).toContain("Example usage");

        });
    });

    // We can't add cards without being logged in and we can't do that right now in e2e.

    // it('should add one card', () => {
    //     page.navigateTo('59de8a1f012e92ce86a57177');
    //     page.getAllCards().count().then( beforecount => {
    //         page.addCard('Word test', 'Synonym test', 'Antonym test', 'General Sense test', 'Example Usage test');
    //         browser.sleep(500); // wait for card to be added to list
    //         expect(page.getAllCards().count()).toEqual(beforecount + 1);
    //     });
    // });
    //
    // it('should add three cards', () => {
    //     page.navigateTo('59de8a1f012e92ce86a57177');
    //     page.getAllCards().count().then( beforecount => {
    //         page.addCard('Word test 1', 'Synonym test 1', 'Antonym test 1', 'General Sense test 1', 'Example Usage test 1');
    //         browser.sleep(2000); // wait for stuff
    //         page.addCard('Word test 2', 'Synonym test 2', 'Antonym test 2', 'General Sense test 2', 'Example Usage test 2');
    //         browser.sleep(2000); // wait for stuff
    //         page.addCard('Word test 3', 'Synonym test 3', 'Antonym test 3', 'General Sense test 3', 'Example Usage test 3');
    //         browser.sleep(2000); // wait for cards to be added to list
    //         expect(page.getAllCards().count()).toEqual(beforecount + 3);
    //     });
    // });
    //
    // it('should add one card and check that its still there', () => {
    //     page.navigateTo('59de8a1f012e92ce86a57177');
    //     page.getAllCards().count().then( beforecount => {
    //         page.addCard('Word test', 'Synonym test', 'Antonym test', 'General Sense test', 'Example Usage test');
    //         page.navigateTo('59de8a1f012e92ce86a57177');
    //         expect(page.getAllCards().count()).toEqual(beforecount + 1);
    //     });
    // });
    //
    // it('should add a random card and check that its there', () => {
    //     page.navigateTo('59de8a1f012e92ce86a57177');
    //
    //     var word = page.randomText(10);
    //     var synonym = page.randomText(10);
    //     var antonym = page.randomText(10);
    //     var generalsense = page.randomText(30);
    //     var exampleusage = page.randomText(30);
    //
    //     page.addCard(word, synonym, antonym, generalsense, exampleusage);
    //     browser.sleep(500); // wait for card to be added to list
    //
    //     let e = page.getAllCards().last();
    //     expect(e.element(by.className("card-word")).getText()).toEqual(word);
    //     expect(e.element(by.className("card-synonym")).element(by.className("card-cont")).getText()).toEqual(synonym);
    //     expect(e.element(by.className("card-antonym")).element(by.className("card-cont")).getText()).toEqual(antonym);
    //     expect(e.element(by.className("card-general-usage")).element(by.className("card-cont")).getText()).toEqual(generalsense);
    //     expect(e.element(by.className("card-example-usage")).element(by.className("card-cont")).getText()).toEqual(exampleusage);
    //
    // });


});
