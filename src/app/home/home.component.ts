import {Component} from '@angular/core';
import {AngularFireAuth} from "angularfire2/auth";
import * as firebase from 'firebase/app';

@Component({
    templateUrl: 'home.component.html'
})
export class HomeComponent {
    public text: string = "Hello world!";

    constructor(public afAuth: AngularFireAuth) {
    }
    login() {
        this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
    }
    logout() {
        this.afAuth.auth.signOut();
    }
}
