import {NgModule} from "@angular/core";
import {ProjectsComponent} from "./projects.component";
import {routing} from "./projects.routing";
import { ProjectComponent } from './project/project.component';
import {CommonModule} from "@angular/common";
@NgModule({
    imports:[routing, CommonModule],
    declarations:[ProjectsComponent, ProjectComponent]
})
export class ProjectsModule{}