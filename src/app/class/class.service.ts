import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from "angularfire2/firestore";
import {Observable} from "rxjs/Observable";
import {Class, ClassId} from "./class";
import {AngularFireAuth} from "angularfire2/auth";
import * as firebase from 'firebase/app';

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
        let newClass: Observable<Class> = this.afAuth.authState.switchMap(state => {
            if(state == null) return Observable.of(null);
            return this.db.doc<Class>('classes/' + id).valueChanges();
        });
        return newClass;
    }

    // from https://stackoverflow.com/a/27747377/8855259

    // dec2hex :: Integer -> String
    dec2hex (dec: number): string {
        return ('0' + dec.toString(16)).substr(-2);
    }

    // generateId :: Integer -> String
    generateId (len: number) : string {
        let arr = new Uint8Array((len || 40) / 2);
        window.crypto.getRandomValues(arr);
        return Array.from(arr, this.dec2hex).join('');
    }

    public generateJoinCode(): string {
        return this.generateId(8);
    }

    public updateJoinCode(id: string) {
        return this.db.doc('classes/' + id).update({joincode: this.generateJoinCode()});
    }

    public removeJoinCode(id: string) {
        return this.db.doc('classes/' + id).update({
            joincode: firebase.firestore.FieldValue.delete()
        });
    }

    public addATeacher(id: string, studentid: string){
        console.log(studentid);
        return this.db.doc('classes/' + id).update({["users." + studentid + ".teacher"] : true});
    }

    public addNewClass(name: string) {
        if(this.afAuth.auth.currentUser == null) return;
        let classCollection = this.db.collection<Class>('classes');
        return classCollection.add({name: name, users: {
            [this.afAuth.auth.currentUser.uid] : {
                nickname: this.afAuth.auth.currentUser.displayName,
                teacher: true
            }},
        joincode: this.generateJoinCode()});
    }

    public addJoinCodetoUser(code: string) {
        if(this.afAuth.auth.currentUser == null) return Promise.reject('User not authenticated');
        return this.db.collection('users').doc(this.afAuth.auth.currentUser.uid).set({joincode: code});
    }

    public removeJoinCodefromUser() {
        if(this.afAuth.auth.currentUser == null) return Promise.reject('User not authenticated');
        return this.db.collection('users').doc(this.afAuth.auth.currentUser.uid).update({joincode: firebase.firestore.FieldValue.delete()});
    }

    public joinClass(classId: string, joincode: string): Promise<void> {
        if(this.classes[classId] && this.classes[classId].users[this.afAuth.auth.currentUser.uid]) {
            return Promise.reject('User already in class');
        }
        return this.addJoinCodetoUser(joincode).then(result => {
                return this.db.doc('classes/' + classId).update({
                    ["users." + this.afAuth.auth.currentUser.uid]: {
                        nickname: this.afAuth.auth.currentUser.displayName,
                        teacher: false
                    }
                }).then(result => {
                    this.removeJoinCodefromUser();
                }, err => {
                    this.removeJoinCodefromUser();
                });
            });
    }

}
