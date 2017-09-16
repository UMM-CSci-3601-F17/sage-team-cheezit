import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { User } from './user';
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";
import "rxjs/add/operator/map";

@Injectable()
export class UserListService {
  private userUrl: string = environment.API_URL + "users";
  constructor(private http:Http) { }

  getUsers(): Observable<User[]> {
    let observable : Observable<any> = this.http.request(this.userUrl);
    return observable.map(res => res.json());
  }

  getUserById(id: string): Observable<User> {
    return this.http.request(this.userUrl + "/" + id).map(res => res.json());
  }
}
