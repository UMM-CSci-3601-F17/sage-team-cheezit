import {Component} from '@angular/core';
import {AngularFireAuth} from "angularfire2/auth";

@Component({
    selector: 'app-home',
    templateUrl: 'help.component.html',
    styleUrls: ['./help.component.scss']
})
export class HelpComponent {

    constructor(public afAuth: AngularFireAuth) {
    }

}
