import {Component, OnDestroy, OnInit} from '@angular/core';
import {DeckService} from "../deck/deck.service";
import {AngularFireAuth} from "angularfire2/auth";
import {MdDialog, MatSnackBar, MatChipInputEvent, MdSnackBarConfig} from "@angular/material";
import {Deck} from "../deck/deck";
import {ActivatedRoute, Router} from "@angular/router";
import {NewDeckDialogComponent} from "../new-deck-dialog/new-deck-dialog.component";
import {Class} from "../class/class";
import {componentDestroyed} from "ng2-rx-componentdestroyed";
import {ClassService} from "../class/class.service";
import {ISubscription} from "rxjs/Subscription";

declare global {
    interface Navigator {
        share(a: any): Promise<any>
    }
}

@Component({
  selector: 'app-class',
  templateUrl: './class.component.html',
  styleUrls: ['./class.component.css']
})
export class ClassComponent implements OnInit, OnDestroy {

    constructor(public deckService: DeckService, public classService: ClassService,
                public afAuth: AngularFireAuth, public dialog : MdDialog,
                private route: ActivatedRoute, private router: Router,
                public snackBar: MatSnackBar) {

    }

    public id: string;

    public decks: Deck[];

    public currentClass: Class;

    public canEdit: boolean = false;

    public joinUrl: string = null;

    public kickStudent(userId: string, userNickname: string, teacher: boolean) {
        this.classService.kickStudent(this.id, userId).then(result => {
            this.snackBar.open("Removed Student", "Undo", {
                duration: 2000,
            }).onAction(() => {
                this.classService.addUser(this.id, userId, userNickname, teacher);
            });
        }, err => {
            this.snackBar.open("Error removing student", null, {
                duration: 2000,
            });
        })
    }

    updateJoinUrl() {
        console.log("get join url called");
        if(!this.currentClass || !this.currentClass.joincode) this.joinUrl = null;
        else this.joinUrl = document.location.origin + this.router.createUrlTree(['/class', this.id, 'join' ], { queryParams: { joincode: this.currentClass.joincode } }).toString();
    }

    public classSub : ISubscription;
    public deckSub : ISubscription;

    ngOnInit() {

        this.route.params.takeUntil(componentDestroyed(this)).subscribe(params => {
            this.id = params['id'];

            if(this.classSub) this.classSub.unsubscribe();
            if(this.deckSub) this.deckSub.unsubscribe();

            this.classSub = this.classService.getClass(this.id).takeUntil(componentDestroyed(this)).subscribe(c => {
                this.currentClass = c;
                if(c == null) this.canEdit = false;
                else this.canEdit =  this.currentClass.users[this.afAuth.auth.currentUser.uid].teacher;
                this.updateJoinUrl();
            });

            this.deckSub = this.deckService.getClassDecks(this.id).takeUntil(componentDestroyed(this)).subscribe(
                decks => {
                    console.log(decks);
                    this.decks = decks;
                }
            );

        });
    }

    public addATeacher(studentid: string){
        return this.classService.addATeacher(this.id, studentid);
    }

    browserShareInvite() {
        if (navigator.share) {
            navigator.share({
                title: 'Invite to SAGE class: ' + this.currentClass.name,
                url: this.joinUrl,
            });
        }
    }

    canShare = navigator.share;

    openAddDialog() {
        this.dialog.open(NewDeckDialogComponent, {
            data: { classId: this.id },
        });
    }

    ngOnDestroy() {
        console.log("class destroyed");
    }

}
