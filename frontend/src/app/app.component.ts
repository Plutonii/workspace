import {Component, OnInit} from '@angular/core';
import {UserAccessService} from "./services/user-access.service";

@Component({
    selector: 'ws-app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

    constructor(private accessService: UserAccessService) {
    }

    ngOnInit(): void {
        this.accessService.init();
    }

}
