import {PlayPage} from "./play.po";
import {by} from "protractor";

describe('play-page', () => {
    let page: PlayPage;

    beforeEach(() => {
        page = new PlayPage();
        page.navigateTo();
    });

    it('should show a card', () => {
        expect(page.getActivePage().element(by.className("card-word")).getText()).toContain('Aesthetic reading');
    });

    // Commented out because the kb-page-slider causes the test to be ran faster than the page has time to load the next card, causing an empty string
    // instead of the intended result

     it('should move to between cards', () => {
         expect(page.getActivePage().element(by.className("card-word")).getText()).toContain('Aesthetic reading');
         page.clickButton('forward-button');
         expect(page.getActivePage().element(by.className("card-word")).getText()).toContain('Alliteration');
         page.clickButton('backward-button');
         expect(page.getActivePage().element(by.className("card-word")).getText()).toContain('Aesthetic reading');
     });

    it('should not get hint after 4 uses', () => {
        let hintButton = page.getActivePage().element(by.className("hint-button"));
        hintButton.click();
        hintButton.click();
        hintButton.click();
        hintButton.click();
        expect(hintButton.isEnabled()).toEqual(false);
    });

    it('should not add points or give hints from a card after card was already used', () => {
        page.getActivePage().element(by.className("got-it-button")).click();
        page.clickButton('backward-button');
        expect(page.getActivePage().element(by.className('got-it-button')).isEnabled()).toEqual(false);
        expect(page.getActivePage().element(by.className('hint-button')).isEnabled()).toEqual(false);
    });




});
