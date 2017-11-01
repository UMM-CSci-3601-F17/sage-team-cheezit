import {Component} from '@angular/core';
import {AngularFireAuth} from "angularfire2/auth";

@Component({
    selector: 'app-home',
    templateUrl: 'home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent {

    constructor(public afAuth: AngularFireAuth) {
    }

}
