import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ClassComponent} from './class.component';
import {Class} from "../class/class";
import {SharedModule} from "../shared.module";
import {MATERIAL_COMPATIBILITY_MODE} from "@angular/material";
import {ClassServiceMock} from "../class/class.service.mock";
import {DeckServiceMock} from "../deck/deck.service.mock";
import {DeckService} from "../deck/deck.service";
import {ClassService} from "../class/class.service";
import {ActivatedRoute} from "@angular/router";
import {Observable} from "rxjs/Observable";
import {AppTestModule} from "../app.test.module";
import {AngularFireAuth} from "angularfire2/auth";

describe('ClassComponent', () => {

    let component: ClassComponent;
    let fixture: ComponentFixture<ClassComponent>;

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
                {provide: DeckService, useValue: new DeckServiceMock()},
                {provide: ClassService, useValue: new ClassServiceMock()},
                {provide: AngularFireAuth, useValue: mockFirebaseAuth},
                { provide: ActivatedRoute,
                    useValue: {
                        params: Observable.of({id: "test id"})
                    } }],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ClassComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });


});
