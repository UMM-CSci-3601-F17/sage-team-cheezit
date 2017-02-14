import { ComponentFixture, TestBed, async } from "@angular/core/testing";
import { User } from "./user";
import { UserListComponent } from "./user-list.component";
import { UserListService } from "./user-list.service";
import { Observable } from "rxjs";
import { PipeModule } from "../../pipe.module";

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
                    id: "chris_id",
                    name: "Chris",
                    age: 25,
                    company: "UMM",
                    email: "chris@this.that"
                },
                {
                    id: "pat_id",
                    name: "Pat",
                    age: 37,
                    company: "IBM",
                    email: "pat@something.com"
                },
                {
                    id: "jamie_id",
                    name: "Jamie",
                    age: 37,
                    company: "Frogs, Inc.",
                    email: "jamie@frogs.com"
                }
                ])
        };

        TestBed.configureTestingModule({
            imports: [PipeModule],
            declarations: [ UserListComponent ],
            // providers:    [ UserListService ]  // NO! Don't provide the real service!
            // Provide a test-double instead
            providers:    [ { provide: UserListService, useValue: userListServiceStub } ]
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
        expect(userList.users.some((user: User) => user.name === "Chris" )).toBe(true);
    });

    it("contain a user named 'Jamie'", () => {
        expect(userList.users.some((user: User) => user.name === "Jamie" )).toBe(true);
    });

    it("doesn't contain a user named 'Santa'", () => {
        expect(userList.users.some((user: User) => user.name === "Santa" )).toBe(false);
    });

    it("has two users that are 37 years old", () => {
        expect(userList.users.filter((user: User) => user.age === 37).length).toBe(2);
    });

});
