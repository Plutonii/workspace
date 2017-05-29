import {Routes, RouterModule} from "@angular/router";
import {ModuleWithProviders} from "@angular/core";
import {ContactsComponent} from "./contacts.component";
export const routes: Routes = [
  {
    path: '',
    component: ContactsComponent
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
