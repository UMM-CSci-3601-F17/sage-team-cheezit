import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ChipInputComponent} from './chip-input.component';
import {SharedModule} from "../shared.module";
import {MATERIAL_COMPATIBILITY_MODE} from "@angular/material";

describe('ChipInputComponent', () => {
    let component: ChipInputComponent;
    let fixture: ComponentFixture<ChipInputComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [SharedModule],
            declarations: [ChipInputComponent],
            providers: [{provide: MATERIAL_COMPATIBILITY_MODE, useValue: true}]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ChipInputComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
