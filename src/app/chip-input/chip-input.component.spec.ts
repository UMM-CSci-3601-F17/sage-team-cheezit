import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ChipInputComponent} from './chip-input.component';
import {SharedModule} from "../shared.module";

describe('ChipInputComponent', () => {
    let component: ChipInputComponent;
    let fixture: ComponentFixture<ChipInputComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [SharedModule],
            declarations: [ChipInputComponent],
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
