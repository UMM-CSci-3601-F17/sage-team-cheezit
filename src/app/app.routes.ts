// Imports
import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {DeckListComponent} from "./deck-list-component/deck-list.component";
import {DeckComponent} from "./deck-component/deck.component";
import {PlayComponent} from "./play-component/play.component";
import {MyDecksComponent} from "./my-decks/my-decks.component";

// Route Configuration
export const routes: Routes = [
    {path: 'play/:deck', component: PlayComponent},
    {path: 'deck/:id', component: DeckComponent},
    {path: 'mydecks', component: MyDecksComponent},
    {path: '', component: HomeComponent, pathMatch: 'full'}
];

export const Routing: ModuleWithProviders = RouterModule.forRoot(routes);
