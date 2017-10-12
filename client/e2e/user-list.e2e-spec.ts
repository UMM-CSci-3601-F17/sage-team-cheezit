import {UserPage} from './user-list.po';
import {browser, protractor} from 'protractor';





describe('angular-spark-lab', () => {
    let page: UserPage;

    beforeEach(() => {
        page = new UserPage();
    });

    it('should get and highlight Users title attribute ', () => {
        page.navigateTo();
        expect(page.getUserTitle()).toEqual('Users');
    });

    it('should type something in filer name box and check that it returned correct element', () => {
        page.navigateTo();
        page.typeAName("Lynn");
        expect(page.getFirstUser()).toEqual("Lynn Ferguson is 25 years old");
    });

    it('should click on the age 27 times and return 3 elements then ', () => {
        page.navigateTo();
        page.getUserByAge();
        for (let i = 0; i < 27; i++) {
            page.selectUpKey();
        }

        expect(page.getFirstUser()).toEqual("Stokes Clayton is 27 years old");

        page.typeAName("Merrill");

        expect(page.getFirstUser()).toEqual("Merrill Parker is 27 years old");

    });
});
