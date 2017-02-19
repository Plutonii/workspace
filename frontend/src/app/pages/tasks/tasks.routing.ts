import {Routes, RouterModule} from "@angular/router";
import {ModuleWithProviders} from "@angular/core";
import {TasksComponent} from "./tasks.component";
export const routes: Routes = [
    {
        path: '',
        component: TasksComponent
    }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
