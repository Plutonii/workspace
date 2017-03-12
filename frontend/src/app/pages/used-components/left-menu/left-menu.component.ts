import {Component, OnInit} from '@angular/core';
import {EventListenerService} from "../../../services/event-listener.service";

@Component({
    selector: 'ws-left-menu',
    templateUrl: './left-menu.component.html',
    styleUrls: ['./left-menu.component.css']
})
export class LeftMenuComponent implements OnInit {

    private isHiddenLeftMenu;

    constructor(private eventListener: EventListenerService) {
        this.isHiddenLeftMenu = true;
        this.eventListener.changedToggleLeftMenu.subscribe(() =>{
            this.isHiddenLeftMenu = !this.isHiddenLeftMenu;
        });
    }

    ngOnInit() {
    }

    toggle(){
        this.eventListener.toggleLeftMenu();
    }
}
