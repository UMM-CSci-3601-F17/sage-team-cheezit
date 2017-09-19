import {Component, OnInit} from '@angular/core';
import {UserListService} from "./user-list.service";
import {User} from "./user";

@Component({
    selector: 'user-list-component',
    templateUrl: 'user-list.component.html',
    providers: []
})

export class UserListComponent implements OnInit {
    //These are public so that tests can reference them (.spec.ts)
    public users: User[];
    public filteredUsers: User[];

    //Inject the UserListService into this component.
    //That's what happens in the following constructor.
    //
    //We can call upon the service for interacting
    //with the server.
    constructor(private userListService: UserListService) {

    }

    public filterUsers(searchName: string, searchAge: number): User[] {

        this.filteredUsers = this.users;

        //Filter by name
        if (searchName != null) {
            searchName = searchName.toLocaleLowerCase();

            this.filteredUsers = this.filteredUsers.filter(user => {
                return !searchName || user.name.toLowerCase().indexOf(searchName) !== -1;
            });
        }

        //Filter by age
        if (searchAge != null) {
            this.filteredUsers = this.filteredUsers.filter(user => {
                return !searchAge || user.age == searchAge;
            });
        }

        return this.filteredUsers;
    }

    ngOnInit(): void {
        //Get Users returns an Observable, basically a "promise" that
        //we will get the data from the server.
        //
        //Subscribe waits until the data is fully downloaded, then
        //performs an action on it (the first lambda)
        this.userListService.getUsers().subscribe(
            users => {
                this.users = users;
                this.filteredUsers = this.users;
            },
            err => {
                console.log(err);
            }
        );
    }
}
