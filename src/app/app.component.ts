import {Component} from '@angular/core';
import {ClassService} from "./class/class.service";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'SAGE';

    constructor(public classService: ClassService) {

    }
}
