import {Component, OnInit} from '@angular/core';
import {UserAccessService} from "./services/user-access.service";

@Component({
    selector: 'ws-app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

    // private _isAuthorized: boolean;

    constructor(private accessService: UserAccessService) {
        /*this.accessService.changedAccess.subscribe((newValueIsAuthorized) => {
            this._isAuthorized = newValueIsAuthorized;
        })*/
    }

    ngOnInit(): void {
        this.accessService.init();
    }

}
