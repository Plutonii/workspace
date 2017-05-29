import {Component, OnInit} from '@angular/core';
import {EventListenerService} from "../services/event-listener.service";
import {UserDataService} from "../services/user-data.service";

@Component({
    selector: 'ws-pages',
    templateUrl: './pages.component.html',
    styleUrls: ['./pages.component.css']
})
export class PagesComponent implements OnInit{

    private isHiddenLeftMenu: boolean;

    constructor(private eventListener: EventListenerService,
                private userDataLoader:UserDataService) {
        this.isHiddenLeftMenu = true;
        this.eventListener.changedToggleLeftMenu.subscribe(() => {
            this.isHiddenLeftMenu = !this.isHiddenLeftMenu;
        });
    }

    ngOnInit() {
        this.userDataLoader.updateContactsIdByUser().subscribe();
    }

}
