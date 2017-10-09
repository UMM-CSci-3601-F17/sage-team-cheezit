// Imports
import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {UserListComponent} from "./users/user-list.component";
import {DeckListComponent} from "./deck-list-component/deck-list.component";
import {DeckComponent} from "./deck-component/deck.component";

// Route Configuration
export const routes: Routes = [
    {path: 'users', component: UserListComponent},
    {path: 'decks/:id', component: DeckComponent},
    {path: 'decks', component: DeckListComponent},
    {path: '', component: HomeComponent}
];

export const Routing: ModuleWithProviders = RouterModule.forRoot(routes);
