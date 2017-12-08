import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {PublicDecksComponent} from './public-decks.component';
import {AppTestModule} from "../app.test.module";
import {SharedModule} from "../shared.module";
import {DebugElement} from '@angular/core';
import {By} from "@angular/platform-browser";
import {DeckService} from "../deck/deck.service";
import {DeckServiceMock} from "../deck/deck.service.mock";

describe('PublicDecksComponent', () => {
    let component: PublicDecksComponent;
    let fixture: ComponentFixture<PublicDecksComponent>;
    let debugElement: DebugElement;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [SharedModule, AppTestModule],
            declarations: [],
            providers: [
                {provide: DeckService, useValue: new DeckServiceMock()},],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PublicDecksComponent);
        component = fixture.componentInstance;
        debugElement = fixture.debugElement;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should have a title that says Public Decks', () => {
        let title: HTMLElement = debugElement.query(By.css('#decks-title')).nativeElement;
        expect(title.innerText).toEqual('Public Decks');
    });

    it('should have a deck list', () => {
        let deckList: HTMLElement = debugElement.query(By.css('.deck-list')).nativeElement;
        expect(deckList).toBeTruthy();
    });

});
