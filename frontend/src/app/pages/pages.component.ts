import {Component, OnInit} from '@angular/core';
import {EventListenerService} from "../services/event-listener.service";

@Component({
    selector: 'app-pages',
    templateUrl: './pages.component.html',
    styleUrls: ['./pages.component.css']
})
export class PagesComponent implements OnInit {

    private isHiddenLeftMenu: boolean;

    constructor(private eventListener: EventListenerService) {
        this.isHiddenLeftMenu = true;
        this.eventListener.changedToggleLeftMenu.subscribe(() => {
            this.isHiddenLeftMenu = !this.isHiddenLeftMenu;
        });
    }

    ngOnInit() {
    }

}
