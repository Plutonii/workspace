import {Routes, RouterModule} from "@angular/router";
import {ModuleWithProviders} from "@angular/core";
import {PagesComponent} from "./pages.component";
import {AuthGuardService} from "../services/auth-guard.service";
export const routes: Routes = [
    {
        path: 'login',
        loadChildren: 'app/pages/login/login.module#LoginModule'
    },
    {
        path: 'pages',
        component: PagesComponent,
        canActivate: [AuthGuardService],
        children: [
            {path: '', redirectTo: 'welcome', pathMatch: 'full'},
            {path: 'welcome', loadChildren: 'app/pages/welcome/welcome.module#WelcomeModule'}
        ]
    }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
