import {PlayPage} from "./play.po";

describe('deck-page', () => {
    let page: PlayPage;

    beforeEach(() => {
        page = new PlayPage();
        page.navigateTo();
    });

    it('should show a card', () => {
        expect(page.getElementById('word').getText()).toContain('Aesthetic reading');
    });

    // Commented out because the kb-page-slider causes the test to be ran faster than the page has time to load the next card, causing an empty string
    // instead of the intended result

    // it('should move to between cards', () => {
    //     page.clickButton('forward');
    //     expect(page.getElementById('word').getText()).toContain('Alliteration');
    //     page.clickButton('backward');
    //     expect(page.getElementById('word').getText()).toContain('Aesthetic reading');
    // });

    it('should not get hint after 4 uses', () => {
        page.clickButton('hint');
        page.clickButton('hint');
        page.clickButton('hint');
        page.clickButton('hint');
        expect(page.getElementById('hint').isEnabled()).toEqual(false);
    });

    it('should not add points or give hints from a card after card was already used', () => {
        page.clickButton('got-it');
        page.clickButton('backward');
        expect(page.getElementById('got-it').isEnabled()).toEqual(false);
        expect(page.getElementById('hint').isEnabled()).toEqual(false);
    });




});
