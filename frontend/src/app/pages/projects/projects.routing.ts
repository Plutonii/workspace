import {Routes, RouterModule} from "@angular/router";
import {ModuleWithProviders} from "@angular/core";
import {ProjectsComponent} from "./projects.component";
export const routes: Routes = [
    {
        path: '',
        component: ProjectsComponent
    }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
