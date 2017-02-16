import { Injectable } from '@angular/core';
import {Subject} from "rxjs";

@Injectable()
export class EventListenerService {

  private changeToggleLeftMenu = new Subject<any>();
  changedToggleLeftMenu = this.changeToggleLeftMenu.asObservable();

  constructor() { }

  toggleLeftMenu(){
    this.changeToggleLeftMenu.next();
  }

}
