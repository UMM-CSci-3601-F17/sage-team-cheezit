import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {JoinClassComponent} from './join-class.component';
import {AppTestModule} from "../app.test.module";
import {SharedModule} from "../shared.module";

describe('JoinClassComponent', () => {
    let component: JoinClassComponent;
    let fixture: ComponentFixture<JoinClassComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [SharedModule, AppTestModule],
            declarations: []
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(JoinClassComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
