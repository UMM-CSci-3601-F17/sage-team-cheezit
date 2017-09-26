import {Component, OnInit} from '@angular/core';
import {UserListService} from "./user-list.service";
import {User} from "./user";

@Component({
    selector: 'user-list-component',
    templateUrl: 'user-list.component.html',
    styleUrls: ['./user-list.component.css'],
    providers: []
})

export class UserListComponent implements OnInit {
    //These are public so that tests can reference them (.spec.ts)
    public users: User[];
    public filteredUsers: User[];
    private userAddSuccess : Boolean = false;

    public userName : string;
    public userAge : number;

    public newUserName:string;
    public newUserAge: number;
    public newUserCompany: string;
    public newUserEmail: string;


    //Inject the UserListService into this component.
    //That's what happens in the following constructor.
    //
    //We can call upon the service for interacting
    //with the server.
    constructor(public userListService: UserListService) {

    }

    addNewUser(name: string, age: number, company : string, email : string) : void{

        //Here we clear all the fields, there's probably a better way
        //of doing this could be with forms or something else
        this.newUserName = null;
        this.newUserAge = null;
        this.newUserCompany = null;
        this.newUserEmail = null;

        this.userListService.addNewUser(name, age, company, email).subscribe(
            succeeded => {
            this.userAddSuccess = succeeded;
            // Once we added a new User, refresh our user list.
            // There is a more efficient method where we request for
            // this new user from the server and add it to users, but
            // for this lab it's not necessary
            this.refreshUsers();
        });
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

    /**
     * Starts an asynchronous operation to update the users list
     *
     */
    refreshUsers(): void {
        //Get Users returns an Observable, basically a "promise" that
        //we will get the data from the server.
        //
        //Subscribe waits until the data is fully downloaded, then
        //performs an action on it (the first lambda)
        this.userListService.getUsers().subscribe(
            users => {
                this.users = users;
                this.filterUsers(this.userName, this.userAge);
            },
            err => {
                console.log(err);
            });
    }

    ngOnInit(): void {
        this.refreshUsers();
    }
}
