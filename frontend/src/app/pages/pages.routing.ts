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
        path: 'registration',
        loadChildren: 'app/pages/register/register.module#RegisterModule'
    },
    {
        path: 'pages',
        component: PagesComponent,
        canActivate: [AuthGuardService],
        children: [
            {path: '', redirectTo: 'projects', pathMatch: 'full'},
            {path: 'projects', loadChildren: 'app/pages/projects/projects.module#ProjectsModule'},
            {path: 'project/:id', loadChildren: 'app/pages/tasks/tasks.module#TasksModule'},
            {path: 'welcome', loadChildren: 'app/pages/welcome/welcome.module#WelcomeModule'},
            {path: '**', redirectTo: 'projects', pathMatch: 'full'}
        ]
    }
];


export const routing: ModuleWithProviders = RouterModule.forChild(routes);
