import {Component} from '@angular/core';
import {AngularFireAuth} from "angularfire2/auth";

@Component({
    templateUrl: 'home.component.html'
})
export class HomeComponent {
    public text: string = "Hello world!";

    constructor(public afAuth: AngularFireAuth) {
    }

}
