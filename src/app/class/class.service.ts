import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from "angularfire2/firestore";
import {Observable} from "rxjs/Observable";
import {Class, ClassId} from "./class";
import {AngularFireAuth} from "angularfire2/auth";

@Injectable()
export class ClassService {


    private classCollection: AngularFirestoreCollection<Class>;
    public classes: Observable<ClassId[]> = Observable.of([]);

    constructor(public db: AngularFirestore, public afAuth: AngularFireAuth) {
        this.afAuth.authState.subscribe(state => {
            if (state != null) {
                this.classCollection = this.db.collection<Class>('classes', ref => ref.where('users.' + state.uid + ".teacher", ">=", false));
                this.classes = this.classCollection.snapshotChanges().map(actions => {
                    return actions.map(a => {
                        const data = a.payload.doc.data() as Class;
                        const id = a.payload.doc.id;
                        return {id, ...data};
                    })
                });
            } else
                this.classes = Observable.of([]);
        });
    }

    public getClass(id: string): Observable<Class> {
        let newClass: Observable<Class> = this.db.doc<Class>('classes/' + id).valueChanges();
        return newClass;
    }

}
