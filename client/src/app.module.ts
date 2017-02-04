import { NgModule }       from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { HttpModule, JsonpModule } from '@angular/http';

import { AppComponent }         from './app/app.component';
import { NavbarComponent } from './app/navbar/navbar.component';
import { HomeComponent} from './app/home/home.component';
import { KittensComponent }   from './app/kittens/kittens.component';
import { routing } from './app/app.routes';

@NgModule({
    imports: [
        BrowserModule,
        HttpModule,
        JsonpModule,
        routing
    ],
    declarations: [
        AppComponent,
        KittensComponent,
        HomeComponent,
        NavbarComponent
    ],
    bootstrap: [ AppComponent ]
})

export class AppModule {}