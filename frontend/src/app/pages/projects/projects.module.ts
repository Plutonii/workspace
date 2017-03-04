import {NgModule} from "@angular/core";
import {ProjectsComponent} from "./projects.component";
import {routing} from "./projects.routing";
import { ProjectComponent } from './project/project.component';
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
@NgModule({
    imports:[routing, CommonModule, FormsModule],
    declarations:[ProjectsComponent, ProjectComponent]
})
export class ProjectsModule{}