import { ComponentFixture, TestBed, async } from "@angular/core/testing";
import { User } from "./user";
import { UserListComponent } from "./user-list.component";
import { UserListService } from "./user-list.service";
import { Observable } from "rxjs";

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
                }
                ])
        };

        TestBed.configureTestingModule({
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
        });
    }));

    it("contains all the users", () => {
        fixture.detectChanges();
        expect(userList.users.length).toBe(2);
    });

    it("contains a user named 'Chris'", () => {
        fixture.detectChanges();
        expect(userList.users.some((user: User) => user.name === "Chris" )).toBe(true);
    });

});
