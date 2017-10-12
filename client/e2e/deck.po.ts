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

    getElementsByID(htmlClass: string){
        return element.all(by.id(htmlClass));
    }
    getAllCards(){
        return this.getElementsByID('card');
    }
    clickButton(id: string) {
        let e = element(by.id(id));
        e.click();
    }

    typeInput(input: string, text: string, enter?: boolean) {
        let inputElement = element(by.id(input));
        inputElement.click();
        inputElement.sendKeys(text);
        if(enter) {
            inputElement.sendKeys(Key.ENTER);
        }
    }



}
