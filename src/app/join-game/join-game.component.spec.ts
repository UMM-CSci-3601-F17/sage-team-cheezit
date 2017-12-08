import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {JoinGameComponent} from './join-game.component';
import {SharedModule} from "../shared.module";
import {AppTestModule} from "../app.test.module";
import {DebugElement} from '@angular/core';
import {By} from "@angular/platform-browser";

describe('JoinGameComponent', () => {
    let component: JoinGameComponent;
    let fixture: ComponentFixture<JoinGameComponent>;
    let debugElement: DebugElement;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [SharedModule, AppTestModule],
            declarations: [],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(JoinGameComponent);
        component = fixture.componentInstance;
        debugElement = fixture.debugElement;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should contain a title with the text stating Join Game', () => {
        let title: HTMLElement = debugElement.query(By.css('.title')).nativeElement;
        expect(title.innerText).toEqual('Join Game');
    });

    it('should contain a join button with the text stating Join Game', () => {
        let joinButton: HTMLElement = debugElement.query(By.css('.join-button')).nativeElement;
        expect(joinButton.innerText).toEqual('Join Game');
    });

    it('should do nothing after clicking Join Game since no join code has been entered', () => {
        let joinButton: HTMLElement = debugElement.query(By.css('.join-button')).nativeElement;
        joinButton.click();
        let title: HTMLElement = debugElement.query(By.css('.title')).nativeElement;
        // Join Game title would not still be there if the join code was correct
        expect(title.innerText).toEqual('Join Game');
    });
    it('should do nothing after clicking Join Game since a wrong join code has been entered', () => {
        component.gameId = "wrong";
        let joinButton: HTMLElement = debugElement.query(By.css('.join-button')).nativeElement;
        joinButton.click();
        let title: HTMLElement = debugElement.query(By.css('.title')).nativeElement;
        // Join Game title would not still be there if the join code was correct
        expect(title.innerText).toEqual('Join Game');
    });
});
