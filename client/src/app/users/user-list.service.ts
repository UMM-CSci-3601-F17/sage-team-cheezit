import {Injectable} from '@angular/core';
import {Http, RequestOptions} from '@angular/http';

import {Observable} from "rxjs";
import "rxjs/add/operator/map";

import {User} from './user';
import {environment} from "../../environments/environment";


@Injectable()
export class UserListService {
    private userUrl: string = environment.API_URL + "users";

    constructor(private http: Http) {
    }

    getUsers(): Observable<User[]> {
        let observable: Observable<any> = this.http.request(this.userUrl);
        return observable.map(res => res.json());
    }

    getUserById(id: string): Observable<User> {
        return this.http.request(this.userUrl + "/" + id).map(res => res.json());
    }

    addNewUser(name: string, age: number, company : string, email : string): Observable<Boolean> {
        const body = {name:name, age:age, company:company, email:email};
        console.log(body);

        //Send post request to add a new user with the user data as the body with specified headers.
        return this.http.post(this.userUrl + "/new", body).map(res => res.json());
    }
}
