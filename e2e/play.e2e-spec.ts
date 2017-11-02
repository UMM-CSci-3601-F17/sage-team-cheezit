import {PlayPage} from "./play.po";
import {browser, by} from "protractor";

describe('play-page', () => {
    let page: PlayPage;

    beforeEach(() => {
        page = new PlayPage();
        page.navigateTo();
        browser.sleep(1000);
    });

    it('should show a card', () => {
        expect(page.getActivePage().element(by.className("card-word")).getText()).toContain('Alliteration');
    });

    // Commented out because the kb-page-slider causes the test to be ran faster than the page has time to load the next card, causing an empty string
    // instead of the intended result

     it('should move to between cards', () => {
         expect(page.getActivePage().element(by.className("card-word")).getText()).toContain('Alliteration');
         page.clickButton('forward-button');
         browser.sleep(200);
         expect(page.getActivePage().element(by.className("card-word")).getText()).toContain('Obstreperous');
         page.clickButton('backward-button');
         browser.sleep(200);
         expect(page.getActivePage().element(by.className("card-word")).getText()).toContain('Alliteration');
     });

    it('should not get hint after 4 uses', () => {
        let hintButton = page.getActivePage().element(by.className("hint-button"));
        hintButton.click();
        browser.sleep(50);
        hintButton.click();
        browser.sleep(50);
        hintButton.click();
        browser.sleep(50);
        hintButton.click();
        browser.sleep(200);
        expect(hintButton.isEnabled()).toEqual(false);
    });

    it('should not add points or give hints from a card after card was already used', () => {
        page.getActivePage().element(by.className("got-it-button")).click();
        browser.sleep(200);
        page.clickButton('backward-button');
        browser.sleep(200);
        expect(page.getActivePage().element(by.className('got-it-button')).isEnabled()).toEqual(false);
        expect(page.getActivePage().element(by.className('hint-button')).isEnabled()).toEqual(false);
    });




});
