import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from "angularfire2/firestore";
import {Observable} from "rxjs/Observable";
import {Class, ClassId} from "./class";
import {AngularFireAuth} from "angularfire2/auth";

@Injectable()
export class ClassService {


    public classesObservable: Observable<ClassId[]> = Observable.of([]);
    public classes: ClassId[] = [];

    constructor(public db: AngularFirestore, public afAuth: AngularFireAuth) {
        this.classesObservable = this.afAuth.authState.switchMap(state => {
            if (state != null) {
                let classCollection = this.db.collection<Class>('classes', ref => ref.where('users.' + state.uid + ".teacher", ">=", false));
                return classCollection.snapshotChanges().map(actions => {
                    return actions.map(a => {
                        const data = a.payload.doc.data() as Class;
                        const id = a.payload.doc.id;
                        return {id, ...data};
                    });
                });
            } else
                return Observable.of([]);
        });
        this.classesObservable.subscribe(classes => {
            console.log("classes observable fired");
            this.classes = classes;
        })
    }

    public canEdit(id: string): boolean {
        let thisClass = this.classes.find(c => c.id == id);
        return thisClass && thisClass.users[this.afAuth.auth.currentUser.uid] &&
            thisClass.users[this.afAuth.auth.currentUser.uid].teacher;
    }

    public getClass(id: string): Observable<Class> {
        let newClass: Observable<Class> = this.db.doc<Class>('classes/' + id).valueChanges();
        return newClass;
    }

    public addNewClass(name: string) {
        if(this.afAuth.auth.currentUser == null) return;
        let classCollection = this.db.collection<Class>('classes');
        return classCollection.add({name: name, users: {
            [this.afAuth.auth.currentUser.uid] : {
                nickname: this.afAuth.auth.currentUser.displayName,
                teacher: true
            }}});
    }

}
