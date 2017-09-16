import { Component, OnInit } from '@angular/core';
import { UserListService } from "./user-list.service";
import { User } from "./user";
import { FilterBy } from "./filter.pipe";

@Component({
    selector: 'user-list-component',
    templateUrl: 'user-list.component.html',
    providers: [ FilterBy ]
})

export class UserListComponent implements OnInit {
    public users: User[];

    constructor(private userListService: UserListService) {
        // this.users = this.userListService.getUsers();
    }

    ngOnInit(): void {
        this.userListService.getUsers().subscribe(
            users => this.users = users,
            err => {
                console.log(err);
            }
        );
    }
}
