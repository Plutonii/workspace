import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {AppComponent} from './app.component';
import {UserAccessService} from "./services/user-access.service";
import {routing} from "./app.routing";
import {PagesModule} from "./pages/pages.module";
import {Router} from "@angular/router";

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        routing,
        PagesModule
    ],
    providers: [UserAccessService],
    bootstrap: [AppComponent]
})
export class AppModule {

}
