import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'ws-welcome',
    templateUrl: './welcome.component.html',
    styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

    constructor() {
    }

    ngOnInit() {
        console.log("Project ngOnInit()");
    }

}
