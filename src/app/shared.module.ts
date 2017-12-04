import { NgModule, } from '@angular/core';
import { CommonModule, } from '@angular/common';

import {
    CovalentLayoutModule, CovalentStepsModule, CovalentCommonModule,
    CovalentMessageModule, CovalentDialogsModule /*, any other modules */
} from '@covalent/core';

import {
    MatListModule,
    MdButtonModule,
    MdCardModule,
    MdIconModule,
    MdInputModule,
    MdMenuModule,
    MdSidenavModule,
    MdToolbarModule,
    MatTooltipModule,
    MdFormFieldModule,
    MatDialogModule,
    MdSnackBarModule,
    MatExpansionModule,
    MatSlideToggleModule,
    MatChipsModule,
} from '@angular/material';

import { FlexLayoutModule, } from '@angular/flex-layout';

import { FormsModule } from '@angular/forms';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {PageSliderModule} from "ng2-page-slider";
import {AngularFireAuthModule} from "angularfire2/auth";
import {AngularFirestoreModule} from "angularfire2/firestore";
import {NgPipesModule} from "ngx-pipes";
import {NgxQRCodeModule} from "ngx-qrcode2";
import {ClipboardModule} from "ngx-clipboard/dist";
import {HttpClientModule} from "@angular/common/http";

const FLEX_LAYOUT_MODULES: any[] = [
    FlexLayoutModule,
];

const ANGULAR_MODULES: any[] = [
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
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
    MatTooltipModule,
    MdFormFieldModule,
    MatDialogModule,
    MdSnackBarModule,
    MatExpansionModule,
    MatSlideToggleModule,
    MatChipsModule,
];

const COVALENT_MODULES: any[] = [
    CovalentLayoutModule,
    CovalentStepsModule,
    CovalentCommonModule,
    CovalentMessageModule,
    CovalentDialogsModule,
];

const OTHER_MODULES: any[] = [
    PageSliderModule,
    AngularFirestoreModule,
    AngularFireAuthModule,
    NgPipesModule,
    NgxQRCodeModule,
    ClipboardModule,
];


@NgModule({
    imports: [
        CommonModule,
        ANGULAR_MODULES,
        MATERIAL_MODULES,
        COVALENT_MODULES,
        FLEX_LAYOUT_MODULES,
        OTHER_MODULES,

    ],
    declarations: [

    ],
    exports: [
        ANGULAR_MODULES,
        MATERIAL_MODULES,
        COVALENT_MODULES,
        FLEX_LAYOUT_MODULES,
        OTHER_MODULES,
    ]
})

export class SharedModule {
}
