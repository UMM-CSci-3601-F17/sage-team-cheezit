// Imports
import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {DeckListComponent} from "./deck-list-component/deck-list.component";
import {DeckComponent} from "./deck-component/deck.component";
import {PlayComponent} from "./play-component/play.component";
import {MyDecksComponent} from "./my-decks/my-decks.component";
import {ClassComponent} from "./class-component/class.component";
import {JoinClassComponent} from "./join-class-component/join-class.component";
import {PublicDecksComponent} from "./public-decks/public-decks.component";
import {JoinGameComponent} from "./join-game/join-game.component";
import {HelpComponent} from "./help/help.component";

// Route Configuration
export const routes: Routes = [
    {path: 'play/:deck', component: PlayComponent},
    {path: 'deck/:id', component: DeckComponent},
    {path: 'class/:id/join', component: JoinClassComponent},
    {path: 'class/:id', component: ClassComponent},
    {path: 'joingame', component: JoinGameComponent},
    {path: 'mydecks', component: MyDecksComponent},
    {path: 'publicdecks', component: PublicDecksComponent},
    {path: 'help', component: HelpComponent},
    {path: '', component: HomeComponent, pathMatch: 'full'}
];

export const Routing: ModuleWithProviders = RouterModule.forRoot(routes);
