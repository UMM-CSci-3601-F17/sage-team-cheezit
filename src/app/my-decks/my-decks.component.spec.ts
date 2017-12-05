import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {MyDecksComponent} from './my-decks.component';
import {SharedModule} from "../shared.module";
import {AppTestModule} from "../app.test.module";
import {By} from "@angular/platform-browser";
import {DebugElement} from "@angular/core";

describe('MyDecksComponent', () => {
    let component: MyDecksComponent;
    let fixture: ComponentFixture<MyDecksComponent>;
    let debugElement: DebugElement;

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
});
