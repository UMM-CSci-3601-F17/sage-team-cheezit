import {Injectable} from '@angular/core';
import { Http } from '@angular/http';
import { User } from './user';
import {Observable} from "rxjs";

@Injectable()
export class UserListService {
    private baseUrl: string = "http://localhost:4567/api/";
    constructor(private http:Http) { }

    getUsers(): Observable<User[]> {
        let body = this.http.request(this.baseUrl + 'users').map(res => res.json());
        console.log(body);
        return body;
    }
}