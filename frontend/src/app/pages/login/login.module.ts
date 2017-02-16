import {NgModule} from "@angular/core";
import {routing} from "./login.routing";
import {LoginComponent} from "./login.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
@NgModule({
    imports:[routing, FormsModule, CommonModule, ReactiveFormsModule],
    declarations:[LoginComponent]
})
export class LoginModule{}