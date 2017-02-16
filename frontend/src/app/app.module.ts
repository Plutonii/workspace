import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {AppComponent} from './app.component';
import {UserAccessService} from "./services/user-access.service";
import {routing} from "./app.routing";
import {PagesModule} from "./pages/pages.module";
import {EventListenerService} from "./services/event-listener.service";

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        FormsModule,
        HttpModule,
        routing,
        PagesModule
    ],
    providers: [UserAccessService, EventListenerService],
    bootstrap: [AppComponent]
})
export class AppModule {

}
