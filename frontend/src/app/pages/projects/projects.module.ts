import {NgModule} from "@angular/core";
import {ProjectsComponent} from "./projects.component";
import {routing} from "./projects.routing";
import { ProjectComponent } from './project/project.component';
@NgModule({
    imports:[routing],
    declarations:[ProjectsComponent, ProjectComponent]
})
export class ProjectsModule{}