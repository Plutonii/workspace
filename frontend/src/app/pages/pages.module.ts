import {NgModule} from "@angular/core";
import {PagesComponent} from "./pages.component";
import {routing} from "./pages.routing";
import {HeaderComponent} from "./base/header/header.component";
import {LeftMenuComponent} from "./base/left-menu/left-menu.component";
import {AuthGuardService} from "../services/auth-guard.service";
import {CommonModule} from "@angular/common";

@NgModule({
    imports:[routing, CommonModule],
    declarations:[PagesComponent, HeaderComponent, LeftMenuComponent],
    providers: [AuthGuardService]
})
export class PagesModule{}