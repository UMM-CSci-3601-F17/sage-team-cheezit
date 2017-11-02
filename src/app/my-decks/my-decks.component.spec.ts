import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {MyDecksComponent} from './my-decks.component';
import {SharedModule} from "../shared.module";
import {AppTestModule} from "../app.test.module";

describe('MyDecksComponent', () => {
    let component: MyDecksComponent;
    let fixture: ComponentFixture<MyDecksComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [SharedModule, AppTestModule],
            declarations: []
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(MyDecksComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
