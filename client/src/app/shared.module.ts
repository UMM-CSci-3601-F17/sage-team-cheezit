import { NgModule, } from '@angular/core';
import { CommonModule, } from '@angular/common';

import { CovalentLayoutModule, CovalentStepsModule, CovalentCommonModule /*, any other modules */ } from '@covalent/core';

import {
    MatListModule, MdButtonModule, MdCardModule, MdIconModule, MdInputModule, MdMenuModule,
    MdSidenavModule,
    MdToolbarModule
} from '@angular/material';

import { FlexLayoutModule, } from '@angular/flex-layout';

import { FormsModule } from '@angular/forms';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

const FLEX_LAYOUT_MODULES: any[] = [
    FlexLayoutModule,
];

const ANGULAR_MODULES: any[] = [
    BrowserAnimationsModule,
    FormsModule,
];

const MATERIAL_MODULES: any[] = [
    MatListModule,
    MdButtonModule,
    MdIconModule,
    MdToolbarModule,
    MdCardModule,
    MdMenuModule,
    MdSidenavModule,
    MdInputModule,
];

const COVALENT_MODULES: any[] = [
    CovalentLayoutModule,
    CovalentStepsModule,
    CovalentCommonModule,
];


@NgModule({
    imports: [
        CommonModule,
        ANGULAR_MODULES,
        MATERIAL_MODULES,
        COVALENT_MODULES,
        FLEX_LAYOUT_MODULES,
    ],
    declarations: [

    ],
    exports: [
        ANGULAR_MODULES,
        MATERIAL_MODULES,
        COVALENT_MODULES,
        FLEX_LAYOUT_MODULES,
    ]
})

export class SharedModule {
}
