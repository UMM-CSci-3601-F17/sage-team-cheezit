import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {EditableTextComponent} from './editable-text.component';
import {SharedModule} from "../shared.module";

describe('EditableTextComponent', () => {
    let component: EditableTextComponent;
    let fixture: ComponentFixture<EditableTextComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [SharedModule],
            declarations: [EditableTextComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(EditableTextComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
