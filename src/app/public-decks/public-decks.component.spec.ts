import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {PublicDecksComponent} from './public-decks.component';
import {AppTestModule} from "../app.test.module";
import {SharedModule} from "../shared.module";

describe('PublicDecksComponent', () => {
    let component: PublicDecksComponent;
    let fixture: ComponentFixture<PublicDecksComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [SharedModule, AppTestModule],
            declarations: []
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PublicDecksComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
