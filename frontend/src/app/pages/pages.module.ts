import {NgModule} from "@angular/core";
import {PagesComponent} from "./pages.component";
import {routing} from "./pages.routing";
import {HeaderComponent} from "./base/header/header.component";
import {LeftMenuComponent} from "./base/left-menu/left-menu.component";
import {AuthGuardService} from "../services/auth-guard.service";
import { RegisterComponent } from './register/register.component';
import { ProjectsComponent } from './projects/projects.component';
import { TasksComponent } from './tasks/tasks.component';

@NgModule({
    imports:[routing],
    declarations:[PagesComponent, HeaderComponent, LeftMenuComponent],
    providers: [AuthGuardService]
})
export class PagesModule{}