import {Injectable} from '@angular/core';
import {Subject} from "rxjs";

@Injectable()
export class EventListenerService {

    private changeToggleLeftMenu = new Subject<any>();
    changedToggleLeftMenu = this.changeToggleLeftMenu.asObservable();

    private reloadProjects = new Subject<any>();
    subscribeReloadProject = this.reloadProjects.asObservable();

    constructor() {
    }

    public toggleLeftMenu() {
        this.changeToggleLeftMenu.next();
    }

    public emitRemoveProject() {
        this.reloadProjects.next();
    }

}

