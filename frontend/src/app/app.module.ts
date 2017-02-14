import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {AppComponent} from './component/app.component';
import { HeaderComponent } from './component/header/header.component';
import { LeftMenuComponent } from './component/left-menu/left-menu.component';
import { MainComponent } from './component/content/main/main.component';
import { LoginComponent } from './component/login/login.component';
import {UserAccessService} from "./service/user-access.service";



@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        LeftMenuComponent,
        MainComponent,
        LoginComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule
    ],
    providers: [UserAccessService],
    bootstrap: [AppComponent]
})
export class AppModule {

}
