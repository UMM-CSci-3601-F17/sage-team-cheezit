import { Component } from '@angular/core';
import { UserListService } from "./user-list.service";

@Component({
    selector: 'user-list-component',
    providers: [UserListService],
    templateUrl: 'user-list.component.html'
})

export class UserListComponent {
    private users: any;

    constructor(private _userListService: UserListService) {
        this.users = _userListService.getUsers();
    }
}