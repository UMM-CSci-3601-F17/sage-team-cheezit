import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ClassComponent} from './class.component';
import {SharedModule} from "../shared.module";
import {ClassServiceMock} from "../class/class.service.mock";
import {DeckServiceMock} from "../deck/deck.service.mock";
import {DeckService} from "../deck/deck.service";
import {ClassService} from "../class/class.service";
import {ActivatedRoute} from "@angular/router";
import {Observable} from "rxjs/Observable";
import {AppTestModule} from "../app.test.module";
import {AngularFireAuth} from "angularfire2/auth";
import {By} from "@angular/platform-browser";
import {DebugElement} from "@angular/core";


describe('ClassComponent', () => {

    let component: ClassComponent;
    let fixture: ComponentFixture<ClassComponent>;
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
                {provide: ClassService, useValue: new ClassServiceMock()},
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
        fixture = TestBed.createComponent(ClassComponent);
        component = fixture.componentInstance;
        debugElement = fixture.debugElement;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should have edit permissions, because authorization has been passed in', () => {
        expect(component.canEdit).toEqual(true);
    });

    it('should have the correct class name', () => {
        expect(component.currentClass.name).toEqual('testclass');
    });


    // menu doesn't exist unless its opened
   // it('should contain a menu for teacher', () => {
   //     let deleteButton: HTMLElement = debugElement.query(By.css('.class-menu')).nativeElement;
   //     expect(deleteButton).toBeTruthy();
   // });


});
