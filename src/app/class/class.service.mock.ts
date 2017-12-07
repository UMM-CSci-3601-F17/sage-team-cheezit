import {Observable} from "rxjs/Observable";
import {Class, ClassId} from "./class";
import {Injectable} from "@angular/core";

@Injectable()
export class ClassServiceMock {


    public classesObservable: Observable<ClassId[]> = Observable.of([]);
    public classes: ClassId[] = [];

    constructor() {

    }

    public isTeacher(id: string): boolean {
        return false;
    }

    public getClass(id: string): Observable<Class> {
        return Observable.of({
            name: "testclass",
            users: {
                "testuid": {
                    nickname: "test",
                    teacher: true
                },
                "BadTestUid": {
                    nickname: "test2",
                    teacher: false
                }
            }
        });
    }

    // from https://stackoverflow.com/a/27747377/8855259

    // dec2hex :: Integer -> String
    dec2hex(dec: number): string {
        return ('0' + dec.toString(16)).substr(-2);
    }

    // generateId :: Integer -> String
    generateId(len: number): string {
        let arr = new Uint8Array((len || 40) / 2);
        window.crypto.getRandomValues(arr);
        return Array.from(arr, this.dec2hex).join('');
    }

    public generateJoinCode(): string {
        return this.generateId(8);
    }

    public updateJoinCode(id: string) {
        return Promise.resolve();
    }

    public removeJoinCode(id: string) {
        return Promise.resolve();
    }

    public addNewClass(name: string) {
        return Promise.resolve();
    }

    public addJoinCodetoUser(code: string) {
        return Promise.resolve();
    }

    public removeJoinCodefromUser() {
        return Promise.resolve();
    }

    public joinClass(classId: string, joincode: string): Promise<void> {
        return Promise.resolve();
    }

}
