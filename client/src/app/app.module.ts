import { NgModule } from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CovalentLayoutModule, CovalentStepsModule, CovalentCommonModule /*, any other modules */ } from '@covalent/core';

import {
    MATERIAL_COMPATIBILITY_MODE, MatListModule, MdButtonModule, MdCardModule, MdIconModule, MdInputModule, MdMenuModule,
    MdSidenavModule,
    MdToolbarModule
} from '@angular/material';

import { FlexLayoutModule, } from '@angular/flex-layout';

import {HttpModule, JsonpModule} from '@angular/http';
import {AppComponent} from './app.component';
import {HomeComponent} from './home/home.component';
import {UserComponent} from "./users/user.component";
import {UserListComponent} from './users/user-list.component';
import {UserListService} from './users/user-list.service';
import {Routing} from './app.routes';
import {FormsModule} from '@angular/forms';
import {APP_BASE_HREF} from "@angular/common";


@NgModule({
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpModule,
        JsonpModule,
        Routing,
        FormsModule,
        CovalentLayoutModule,
        CovalentStepsModule,
        CovalentCommonModule,
        FlexLayoutModule,
        MatListModule,
        MdButtonModule,
        MdIconModule,
        MdToolbarModule,
        MdCardModule,
        MdMenuModule,
        MdSidenavModule,
        MdInputModule
    ],
    declarations: [
        AppComponent,
        HomeComponent,
        UserListComponent,
        UserComponent
    ],
    providers: [
        UserListService,
        {provide: APP_BASE_HREF, useValue: '/'},
        {provide: MATERIAL_COMPATIBILITY_MODE, useValue: true}
    ],
    bootstrap: [AppComponent]
})

export class AppModule {
}
