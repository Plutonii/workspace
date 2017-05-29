import {NgModule} from "@angular/core";
import {PagesComponent} from "./pages.component";
import {routing} from "./pages.routing";
import {HeaderComponent} from "./used-components/header/header.component";
import {LeftMenuComponent} from "./used-components/left-menu/left-menu.component";
import {AuthGuardService} from "../services/auth-guard.service";
import {CommonModule} from "@angular/common";
import { ContactsComponent } from './contacts/contacts.component';
import {UserDataService} from "../services/user-data.service";

@NgModule({
    imports:[routing, CommonModule],
    declarations:[PagesComponent, HeaderComponent, LeftMenuComponent],
    providers: [AuthGuardService, UserDataService]
})
export class PagesModule{}
