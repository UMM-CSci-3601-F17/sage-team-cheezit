import {Component} from '@angular/core';
import {ClassService} from "./class/class.service";
import {NewClassDialogComponent} from "./new-class-dialog/new-class-dialog.component";
import {MdDialog} from "@angular/material";
import {AngularFireAuth} from "angularfire2/auth";
import * as firebase from 'firebase/app';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    title = 'SAGE';

    constructor(public classService: ClassService, public dialog : MdDialog, public afAuth: AngularFireAuth) {

    }

    login() {
        this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
    }
    logout() {
        this.afAuth.auth.signOut();
    }


    openAddDialog() {
        this.dialog.open(NewClassDialogComponent);
    }
}
