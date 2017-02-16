import {ModuleWithProviders} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";

export const routes:Routes = [
    {path: '', redirectTo: 'pages', pathMatch: 'full'},
    {path: '**', redirectTo: 'pages/projects'}
];

export const routing:ModuleWithProviders = RouterModule.forRoot(routes, {useHash: true});