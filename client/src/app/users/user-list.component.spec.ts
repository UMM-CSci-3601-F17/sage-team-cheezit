import {ComponentFixture, TestBed, async} from "@angular/core/testing";
import {User} from "./user";
import {UserListComponent} from "./user-list.component";
import {UserListService} from "./user-list.service";
import {Observable} from "rxjs";
import {FormsModule} from "@angular/forms"; //for [(ngModule)] to not break tests

describe("User list", () => {

    let userList: UserListComponent;
    let fixture: ComponentFixture<UserListComponent>;

    let userListServiceStub: {
        getUsers: () => Observable<User[]>
    };

    beforeEach(() => {
        // stub UserService for test purposes
        userListServiceStub = {
            getUsers: () => Observable.of([
                {
                    _id: "chris_id",
                    name: "Chris",
                    age: 25,
                    company: "UMM",
                    email: "chris@this.that"
                },
                {
                    _id: "pat_id",
                    name: "Pat",
                    age: 37,
                    company: "IBM",
                    email: "pat@something.com"
                },
                {
                    _id: "jamie_id",
                    name: "Jamie",
                    age: 37,
                    company: "Frogs, Inc.",
                    email: "jamie@frogs.com"
                }
            ])
        };

        TestBed.configureTestingModule({
            imports: [FormsModule],
            declarations: [UserListComponent],
            // providers:    [ UserListService ]  // NO! Don't provide the real service!
            // Provide a test-double instead
            providers: [{provide: UserListService, useValue: userListServiceStub}]
        })
    });

    beforeEach(async(() => {
        TestBed.compileComponents().then(() => {
            fixture = TestBed.createComponent(UserListComponent);
            userList = fixture.componentInstance;
            fixture.detectChanges();
        });
    }));

    it("contains all the users", () => {
        expect(userList.users.length).toBe(3);
    });

    it("contains a user named 'Chris'", () => {
        expect(userList.users.some((user: User) => user.name === "Chris")).toBe(true);
    });

    it("contain a user named 'Jamie'", () => {
        expect(userList.users.some((user: User) => user.name === "Jamie")).toBe(true);
    });

    it("doesn't contain a user named 'Santa'", () => {
        expect(userList.users.some((user: User) => user.name === "Santa")).toBe(false);
    });

    it("has two users that are 37 years old", () => {
        expect(userList.users.filter((user: User) => user.age === 37).length).toBe(2);
    });

    it("user list refreshes", () => {
        expect(userList.filteredUsers.length).toBe(3);
        let newUsers : User[] = new Array(1);
        let newUser : User = {_id: "5", name:"Melbourne", age:84, company:"Dogs LLC", email:"woof@puppers.edu"};
        newUsers.push(newUser);
        userList.users = newUsers;
        userList.refreshUsers();
        //expect(userList.filteredUsers).toBe(newUsers);
    });

    it("user list filters by name", () => {
        expect(userList.filteredUsers.length).toBe(3);
        userList.userName = "a";
        userList.refreshUsers(); //The asynchronicity of refreshUsers doesn't seem to effect `expect`
        expect(userList.filteredUsers.length).toBe(2);
    });

    it("user list filters by age", () => {
        expect(userList.filteredUsers.length).toBe(3);
        userList.userAge = 37;
        userList.refreshUsers();
        expect(userList.filteredUsers.length).toBe(2);
    });

    it("user list filters by name and age", () => {
        expect(userList.filteredUsers.length).toBe(3);
        userList.userAge = 37;
        userList.userName = "i";
        userList.refreshUsers();
        expect(userList.filteredUsers.length).toBe(1);
    });

});

describe("Misbehaving User List", () => {
    let userList: UserListComponent;
    let fixture: ComponentFixture<UserListComponent>;

    let userListServiceStub: {
        getUsers: () => Observable<User[]>
    };

    beforeEach(() => {
        // stub UserService for test purposes
        userListServiceStub = {
            getUsers: () => Observable.create(observer => {
                observer.error("Error-prone observable");
            })
        };

        TestBed.configureTestingModule({
            imports: [FormsModule],
            declarations: [UserListComponent],
            providers: [{provide: UserListService, useValue: userListServiceStub}]
        })
    });

    beforeEach(async(() => {
        TestBed.compileComponents().then(() => {
            fixture = TestBed.createComponent(UserListComponent);
            userList = fixture.componentInstance;
            fixture.detectChanges();
        });
    }));

    it("generates an error if we don't set up a UserListService", () => {
        // Since the observer throws an error, we don't expect users to be defined.
        expect(userList.users).toBeUndefined();
    });
});
