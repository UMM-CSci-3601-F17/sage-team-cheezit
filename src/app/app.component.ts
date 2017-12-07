import {Component} from '@angular/core';
import {ClassService} from "./class/class.service";
import {NewClassDialogComponent} from "./new-class-dialog/new-class-dialog.component";
import {MdDialog} from "@angular/material";
import {AngularFireAuth} from "angularfire2/auth";
import {Router} from "@angular/router";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    title = 'SAGE';

    constructor(private router: Router, public classService: ClassService, public dialog: MdDialog, public afAuth: AngularFireAuth) {

    }

    logout() {
        this.afAuth.auth.signOut();
        this.router.navigate(['/']);
    }


    openAddDialog() {
        this.dialog.open(NewClassDialogComponent);
    }
}
