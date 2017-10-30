import { NgModule } from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';

import {environment} from '../environments/environment';

import {
    MATERIAL_COMPATIBILITY_MODE, MD_DIALOG_SCROLL_STRATEGY_PROVIDER, MdDialogContainer,
    MdSnackBar
} from '@angular/material';


import {HttpModule, JsonpModule} from '@angular/http';
import {AppComponent} from './app.component';
import {HomeComponent} from './home/home.component';
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
import {NewDeckDialogComponent} from "./new-deck-dialog/new-deck-dialog.component";
import {SaveCardDialogComponent} from './save-card-dialog/save-card-dialog.component';
import {AngularFirestoreModule} from "angularfire2/firestore";
import {AngularFireModule} from "angularfire2";

@NgModule({

    imports: [
        BrowserModule,
        HttpModule,
        JsonpModule,
        Routing,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule.enablePersistence(),
        SharedModule,
    ],
    declarations: [
        AppComponent,
        HomeComponent,
        CardComponent,
        DeckComponent,
        PlayComponent,
        DeckListComponent,
        NewCardDialogComponent,
        NewDeckDialogComponent,
        SaveCardDialogComponent,
    ],
    entryComponents: [
        NewCardDialogComponent,
        NewDeckDialogComponent,
        SaveCardDialogComponent
    ],
    providers: [
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
