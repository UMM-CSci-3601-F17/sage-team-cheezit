import { NgModule } from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';

import {environment} from '../environments/environment';

import {
    MATERIAL_COMPATIBILITY_MODE,
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
import {GameJoinDialogComponent, PlayComponent} from "./play-component/play.component";
import {MdDialog} from "@angular/material";
import {NewCardDialogComponent} from "./new-card-dialog/new-card-dialog.component";
import {NewDeckDialogComponent} from "./new-deck-dialog/new-deck-dialog.component";
import {SaveCardDialogComponent} from './save-card-dialog/save-card-dialog.component';
import {AngularFirestoreModule} from "angularfire2/firestore";
import {AngularFireModule} from "angularfire2";
import {AngularFireAuthModule} from "angularfire2/auth";
import {MyDecksComponent} from "./my-decks/my-decks.component";
import {ClassComponent} from "./class-component/class.component";
import {ClassService} from "./class/class.service";
import {NewClassDialogComponent} from "./new-class-dialog/new-class-dialog.component";
import {JoinClassComponent} from "./join-class-component/join-class.component";
import {GoogleSignInButtonComponent} from "./google-sign-in-button/google-sign-in-button.component";
import {PublicDecksComponent} from "./public-decks/public-decks.component";
import {AngularFireDatabaseModule} from "angularfire2/database";
import {JoinGameComponent} from "./join-game/join-game.component";
import {MatChipsModule} from '@angular/material/chips';
import {KeyValuePipe} from "./util/key-value-pipe";

@NgModule({
    imports: [
        BrowserModule,
        HttpModule,
        JsonpModule,
        Routing,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule.enablePersistence(),
        AngularFireAuthModule,
        AngularFireDatabaseModule,
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
        NewClassDialogComponent,
        ClassComponent,
        MyDecksComponent,
        JoinClassComponent,
        GoogleSignInButtonComponent,
        PublicDecksComponent,
        SaveCardDialogComponent,
        JoinGameComponent,
        GameJoinDialogComponent,
        KeyValuePipe,
    ],
    entryComponents: [
        NewCardDialogComponent,
        NewDeckDialogComponent,
        NewClassDialogComponent,
        NewDeckDialogComponent,
        SaveCardDialogComponent,
        GameJoinDialogComponent,
    ],
    providers: [
        DeckService,
        ClassService,
        MdDialog,
        MdSnackBar,
        {provide: APP_BASE_HREF, useValue: '/'},
        {provide: MATERIAL_COMPATIBILITY_MODE, useValue: true}
    ],
    bootstrap: [AppComponent]
})

export class AppModule {
}
