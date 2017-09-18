import { UserPage } from './user-list.po';
import {browser, protractor} from 'protractor';

let origFn = browser.driver.controlFlow().execute;

//https://hassantariqblog.wordpress.com/2015/11/09/reduce-speed-of-angular-e2e-protractor-tests/
browser.driver.controlFlow().execute = function() {
  let args = arguments;

  // queue 100ms wait between test
  origFn.call(browser.driver.controlFlow(), function() {
    return protractor.promise.delayed(100);
  });

  return origFn.apply(browser.driver.controlFlow(), args);
};

let usersList: any[] =  [ 'Connie Stewart is 25 years old', 'Lynn Ferguson is 25 years old', 'Roseann Roberson is 23 years old', 'Stokes Clayton is 27 years old', 'Valerie Erickson is 38 years old', 'Kitty Page is 33 years old','Bolton Monroe is 27 years old', 'Marguerite Norton is 40 years old', 'Merrill Parker is 27 years old', 'Cervantes Morin is 35 years old' ];

describe('angular-spark-lab', () => {
  let page: UserPage;

  beforeEach(() => {
    page = new UserPage();
  });
  it('should get and highlight User Name attribute ', () => {
    page.navigateTo();
    expect(page.getUserTitle()).toEqual('User Name');
  });

  it('should check that there is a list of users ', () => {
    page.navigateTo();
    expect(page.getUsers()).toEqual(usersList);
  });

  // it('should type something in filer name box and check that it returned correct element', () => {
  //   page.navigateTo();
  //   page.typeAName();
  //   expect(page.getSingleUser()).toEqual("Lynn Ferguson is 25 years old");
  // });
});
