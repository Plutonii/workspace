import {Routes, RouterModule} from "@angular/router";
import {ModuleWithProviders} from "@angular/core";
import {WelcomeComponent} from "./welcome.component";
export const routes: Routes = [
    {
        path: '',
        component: WelcomeComponent
    }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
