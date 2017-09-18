import {browser, element, by, Key} from 'protractor';
import {userInfo} from "os";

export class UserPage {
  navigateTo() {
    return browser.get('/users');
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

  getUserTitle() {
    let title = element(by.id('title')).getText();
    this.highlightElement(by.id('title'));

    return title;
  }

  typeAName(){
   let input = element(by.tagName('input'));
   input.click();
   input.sendKeys("Lynn");
  }

  getUsers(){
   let users = element.all(by.id('users')).getText();
   return users;
  }

  getFirstUser(){
    let user = element(by.id('users')).getText();
    this.highlightElement(by.id('users'))

    return user;
  }
}
