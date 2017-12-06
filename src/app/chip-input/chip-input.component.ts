import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MatChipInputEvent} from "@angular/material";
import {ENTER} from '@angular/cdk/keycodes';

const COMMA = 188;

@Component({
    selector: 'app-chip-input',
    templateUrl: './chip-input.component.html',
    styleUrls: ['./chip-input.component.scss']
})
export class ChipInputComponent implements OnInit {

    @Input() canEdit?: boolean = true;

    @Input() array: string[];
    @Output() arrayChange: EventEmitter<string[]> = new EventEmitter();

    @Input() placeholder?: string;

    @Input() required?: boolean = false;


    separatorKeysCodes = [ENTER, COMMA];

    constructor() {
    }

    ngOnInit() {
    }

    changeArray() {
        this.arrayChange.emit(this.array);
    }

    public addChip(event: MatChipInputEvent) {
        let input = event.input;
        let value = event.value;

        if ((value || '').trim()) {
            this.array.push(value.trim());
        }

        if (input) {
            input.value = '';
        }

        this.changeArray();
    }

    public removeChip(item: string) {
        let index = this.array.indexOf(item);

        if (index >= 0) {
            this.array.splice(index, 1);
        }

        this.changeArray()
    }

}
