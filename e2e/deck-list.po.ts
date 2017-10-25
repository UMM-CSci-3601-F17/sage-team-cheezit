import {browser, element, by} from 'protractor';
import {Key} from "selenium-webdriver";

export class DeckListPage {
    navigateTo() {
        return browser.get('/decks');
    }

    getPageTitle(){
        let title = element(by.id('decks-title')).getText();
        return title;
    }


    getElementsByClass(htmlClass: string){
        return element.all(by.className(htmlClass));
    }
    getAllDecks(){
        return this.getElementsByClass('deck');
    }

    getAllDeckNames() {
        return element.all(by.className("deck-name")).map(x => x.getText());
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

    addDeck(name: string) {
        this.clickButton('deckDialog');
        this.typeInput('deckName', name);
        this.clickButton('new-deck-submit');
    }


    // from https://stackoverflow.com/questions/1349404/generate-random-string-characters-in-javascript
    randomText(length: number): string {
        var text: string = "";
        var possible: string = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for (var i = 0; i < length; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));

        return text;
    }




}
