import {browser, element, by} from 'protractor';

export class PlayPage {
    navigateTo() {
        return browser.get('/play/59de8a1f012e92ce86a57176');

    }


    clickButton(id: string) {
        let e = element(by.id(id));
        e.click();
    }

    getElementById(id: string) {
        let e = element(by.id(id));
        return e;
    }

    getActivePage() {
        return element(by.className("active-kb-page"));
    }

    getElementsByClass(htmlClass: string){
        return element.all(by.className(htmlClass));
    }

}
