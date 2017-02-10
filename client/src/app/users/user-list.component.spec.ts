import { ComponentFixture, TestBed } from "@angular/core/testing";
import { UserListComponent } from "./user-list.component";
import { UserListService } from "./user-list.service";

describe("User list", () => {

    let userList: UserListComponent;
    let fixture: ComponentFixture<UserListComponent>;

    let userListServiceStub: {
        getUsers: () => [{ name: string }]
    }

    beforeEach(() => {
        // stub UserService for test purposes
        userListServiceStub = {
            getUsers: () => [ { name: "Chris" }, { name: "Pat" } ]
        };

        TestBed.configureTestingModule({
            declarations: [ UserListComponent ],
            // providers:    [ UserListService ]  // NO! Don't provide the real service!
            // Provide a test-double instead
            providers:    [ { provide: UserListService, useValue: userListServiceStub } ]
        });

        fixture = TestBed.createComponent(UserListComponent);
        userList = fixture.componentInstance;
    });

    it("contains all the users", () => {
        expect(userList.users.length).toBe(2);
    });

    it("contains a user named 'Chris'", () => {
        expect(userList.users.some(user => user.name === "Chris" )).toBe(true);
    });

});
