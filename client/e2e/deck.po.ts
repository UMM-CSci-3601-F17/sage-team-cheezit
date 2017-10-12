import {browser, element, by} from 'protractor';
import {Key} from "selenium-webdriver";

export class DeckPage {
    navigateTo() {
        return browser.get('/decks/59de8a1f012e92ce86a57176');

    }

    getDeckHeader(){
        let header = element(by.id('deck-header')).getText();
        return header;
    }

    getElementsByClass(htmlClass: string){
        return element.all(by.className(htmlClass));
    }
    getAllCards(){
        return this.getElementsByClass('card');
    }



}
