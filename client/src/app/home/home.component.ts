import { Component } from '@angular/core';

@Component({
    templateUrl: 'home.component.html'
})

// Component class
export class HomeComponent {
    public text: string;

    constructor() {
        this.text = "Hello world!";
    }
}