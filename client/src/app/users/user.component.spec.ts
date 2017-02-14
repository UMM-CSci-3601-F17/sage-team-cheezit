import { ComponentFixture, TestBed, async } from "@angular/core/testing";
import { User } from "./user";
import { UserComponent } from "./user.component";
import { UserListService } from "./user-list.service";
import { Observable } from "rxjs";
import { PipeModule } from "../../pipe.module";

describe("User component", () => {

    let userComponent: UserComponent;
    let fixture: ComponentFixture<UserComponent>;

    let userListServiceStub: {
        getUserById: (userId: string) => Observable<User>
    };

    beforeEach(() => {
        // stub UserService for test purposes
        userListServiceStub = {
            getUserById: (userId: string) => Observable.of([
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
            ].find(user => user.id === userId))
        };

        TestBed.configureTestingModule({
            imports: [PipeModule],
            declarations: [ UserComponent ],
            providers:    [ { provide: UserListService, useValue: userListServiceStub } ]
        })
    });

    beforeEach(async(() => {
        TestBed.compileComponents().then(() => {
            fixture = TestBed.createComponent(UserComponent);
            userComponent = fixture.componentInstance;
        });
    }));

    it("can retrieve Pat by ID", () => {
        userComponent.setId("pat_id");
        expect(userComponent.user).toBeDefined();
        expect(userComponent.user.name).toBe("Pat");
        expect(userComponent.user.email).toBe("pat@something.com");
    });

    it("returns undefined for Santa", () => {
        userComponent.setId("Santa");
        expect(userComponent.user).not.toBeDefined();
    });

});
