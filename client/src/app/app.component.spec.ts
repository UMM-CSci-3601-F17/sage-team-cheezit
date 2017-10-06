import {ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {DebugElement} from '@angular/core';

import {AppModule} from "./app.module";
import {AppComponent} from './app.component';
import {SharedModule} from "./shared.module";
import {MATERIAL_COMPATIBILITY_MODE} from "@angular/material";

describe('AppComponent', () => {
    let appInstance: AppComponent;
    let appFixture: ComponentFixture<AppComponent>;
    let debugElement: DebugElement;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                SharedModule,
                AppModule
            ],
            providers: [{provide: MATERIAL_COMPATIBILITY_MODE, useValue: true}],
        });

        appFixture = TestBed.createComponent(AppComponent);

        appInstance = appFixture.componentInstance;

        debugElement = appFixture.debugElement;
    });

    it('should create the app', () => {
        expect(appFixture).toBeTruthy();
    });

    it(`should have as title 'app'`, () => {
        expect(appInstance.title).toEqual('Angular Spark lab');
    });

    it('should render title in the navbar', () => {
        appFixture.detectChanges();
        let navbar: HTMLElement = debugElement.query(By.css('td-layout-nav')).nativeElement;
        expect(navbar.textContent).toContain('Covalent');
    });
});
