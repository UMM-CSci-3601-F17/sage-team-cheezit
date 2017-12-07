import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {EditableTextComponent} from './editable-text.component';
import {SharedModule} from "../shared.module";
import {Component, DebugElement} from "@angular/core";
import {MATERIAL_COMPATIBILITY_MODE} from "@angular/material";

describe('EditableTextComponent', () => {
    let component: EditableTextComponent;
    let fixture: ComponentFixture<TestComponentWrapper>;
    let debugElement: DebugElement;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [SharedModule],
            declarations: [EditableTextComponent, TestComponentWrapper],
            providers: [{provide: MATERIAL_COMPATIBILITY_MODE, useValue: true}]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestComponentWrapper);
        component = fixture.debugElement.children[0].componentInstance;
        debugElement = fixture.debugElement;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should have correct edit permission', () => {
        expect(component.canEdit).toEqual(true);
    });

    it('should have the correct text', () => {
        expect(component.text).toEqual('sample text');
    });


});

@Component({
    selector: 'test-component-wrapper',
    template: `
        <app-editable-text [canEdit]="true" [text]="'sample text'"></app-editable-text>`
})

class TestComponentWrapper {

}
