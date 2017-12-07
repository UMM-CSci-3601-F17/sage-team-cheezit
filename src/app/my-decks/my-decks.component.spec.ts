import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {MyDecksComponent} from './my-decks.component';
import {SharedModule} from "../shared.module";
import {AppTestModule} from "../app.test.module";
import {By} from "@angular/platform-browser";
import {DebugElement} from "@angular/core";
import {AngularFireAuth} from "angularfire2/auth";
import {Observable} from "rxjs/Observable";
import {ActivatedRoute} from "@angular/router";
import {DeckService} from "../deck/deck.service";
import {DeckServiceMock} from "../deck/deck.service.mock";

describe('MyDecksComponent', () => {
    let component: MyDecksComponent;
    let fixture: ComponentFixture<MyDecksComponent>;
    let debugElement: DebugElement;

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
            providers: [
                {provide: DeckService, useValue: new DeckServiceMock()},
                {provide: AngularFireAuth, useValue: mockFirebaseAuth},
                {
                    provide: ActivatedRoute,
                    useValue: {
                        params: Observable.of({id: "test id"})
                    }
                }],
        })
            .compileComponents();
    }));
    beforeEach(() => {
        fixture = TestBed.createComponent(MyDecksComponent);
        component = fixture.componentInstance;
        debugElement = fixture.debugElement;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should contain title My Decks', () => {
        let title: HTMLElement = debugElement.query(By.css('.decks-title')).nativeElement;
        expect(title.innerText).toContain('My Decks');
    });

    it('should contain a button for Add Deck', () => {
        let button: HTMLElement = debugElement.query(By.css('.md-24')).nativeElement;
        expect(button).toBeTruthy();
    });

    it('should contain a button called Add Deck', () => {
        let button: HTMLElement = debugElement.query(By.css('.md-24')).nativeElement;
        expect(button.innerText).toContain('add');
    });
});
