import {Injectable} from '@angular/core';
import {Subject} from "rxjs";

@Injectable()
export class EventListenerService {

  private changeToggleLeftMenu = new Subject<any>();
  changedToggleLeftMenu = this.changeToggleLeftMenu.asObservable();

  private reloadProjects = new Subject<any>();
  subscribeReloadProject = this.reloadProjects.asObservable();

  private alertMsg = new Subject<string>();
  subscribeAlertMsg = this.alertMsg.asObservable();

  constructor() {

  }

  public toggleLeftMenu() {
    this.changeToggleLeftMenu.next();
  }

  public emitRemoveProject() {
    this.reloadProjects.next();
  }

  public showAlert(msg: string) {
    this.alertMsg.next(msg);
  }

}

