import { NgModule } from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';

import {
    MATERIAL_COMPATIBILITY_MODE, MD_DIALOG_SCROLL_STRATEGY_PROVIDER, MdDialogContainer,
    MdSnackBar
} from '@angular/material';


import {HttpModule, JsonpModule} from '@angular/http';
import {AppComponent} from './app.component';
import {HomeComponent} from './home/home.component';
import {UserComponent} from "./users/user.component";
import {UserListComponent} from './users/user-list.component';
import {UserListService} from './users/user-list.service';
import {Routing} from './app.routes';
import {APP_BASE_HREF} from "@angular/common";

import {SharedModule} from "./shared.module";
import {CardComponent} from "./card-component/card.component";
import {DeckListComponent} from "./deck-list-component/deck-list.component";
import {DeckComponent} from "./deck-component/deck.component";
import {DeckService} from "./deck/deck.service";
import {PlayComponent} from "./play-component/play.component";
import {MdDialog} from "@angular/material";
import {NewCardDialogComponent} from "./new-card-dialog/new-card-dialog.component";

@NgModule({

    imports: [
        BrowserModule,
        HttpModule,
        JsonpModule,
        Routing,
        SharedModule,
    ],
    declarations: [
        AppComponent,
        HomeComponent,
        UserListComponent,
        UserComponent,
        CardComponent,
        DeckComponent,
        DeckListComponent,
        NewCardDialogComponent,
        PlayComponent
    ],
    entryComponents: [
        NewCardDialogComponent
    ],
    providers: [
        UserListService,
        DeckService,
        MdDialog,
        MdSnackBar,
        {provide: APP_BASE_HREF, useValue: '/'},
        {provide: MATERIAL_COMPATIBILITY_MODE, useValue: true}
    ],
    bootstrap: [AppComponent]
})

export class AppModule {
}
