import {async, ComponentFixture, TestBed} from "@angular/core/testing";
import {HomeComponent} from "./home.component";
import {MATERIAL_COMPATIBILITY_MODE} from "@angular/material";
import {SharedModule} from "../shared.module";
import {AppTestModule} from "../app.test.module";
import {DebugElement} from "@angular/core";
import {By} from "@angular/platform-browser";
import {AngularFireAuth} from "angularfire2/auth";


describe('HomeComponent', () => {
    let component: HomeComponent;
    let debugElement: DebugElement;
    let fixture: ComponentFixture<HomeComponent>;

    let mockFirebaseAuth = {
        auth: {
            currentUser: {
                uid: "testuid"
            }
        }
    };

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [SharedModule, AppTestModule],
            declarations: [],
            providers: [{provide: MATERIAL_COMPATIBILITY_MODE, useValue: true},
                {provide: AngularFireAuth, useValue: mockFirebaseAuth}],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(HomeComponent);
        component = fixture.componentInstance;
        debugElement = fixture.debugElement;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    // Testing only My Decks because it's the only thing that changes when you sign in

    it('should contain a button for My Decks', () => {
        let button: HTMLElement = debugElement.query(By.css('.my-decks-button')).nativeElement;
        expect(button).toBeTruthy();
    });

    it('should contain a button called My Deck', () => {
        let button: HTMLElement = debugElement.query(By.css('.my-decks-button')).nativeElement;
        expect(button.innerText).toContain('My Decks')
    });
});
