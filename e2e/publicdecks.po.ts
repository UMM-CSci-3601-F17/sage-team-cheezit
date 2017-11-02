import {browser, element, by} from 'protractor';


export class PublicDecksPage {
    navigateTo() {
        return browser.get('/publicdecks');
    }

    getPageTitle() {
        let title = element(by.id('decks-title')).getText();
        return title;
    }


    getElementsByClass(htmlClass: string) {
        return element.all(by.className(htmlClass));
    }

    getAllDecks() {
        return this.getElementsByClass('deck');
    }

    getAllDeckNames() {
        return element.all(by.className("deck-name")).map(x => x.getText());
    }

    clickButton(id: string) {
        let e = element(by.id(id));
        e.click();
    }
}
