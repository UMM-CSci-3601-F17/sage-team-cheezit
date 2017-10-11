import {browser, element, by} from 'protractor';
import {Key} from "selenium-webdriver";

export class DeckListPage {
    navigateTo() {
        return browser.get('/decks');
    }

    //http://www.assertselenium.com/protractor/highlight-elements-during-your-protractor-test-run/
    highlightElement(byObject) {
        function setStyle(element, style) {
            const previous = element.getAttribute('style');
            element.setAttribute('style', style);
            setTimeout(() => {
                element.setAttribute('style', previous);
            }, 200);
            return "highlighted";
        }

        return browser.executeScript(setStyle, element(byObject).getWebElement(), 'color: red; background-color: yellow;');
    }
    getPageTitle(){
        let title = element(by.id('title')).getText();
        this.highlightElement(by.id('title'));
        return title;
    }


    getElementsByClass(htmlClass: string){
        return element.all(by.className(htmlClass));
    }
    getAllDecks(){
        return this.getElementsByClass('deck');
    }





}
