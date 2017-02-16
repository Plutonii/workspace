import {NgModule} from "@angular/core";
import {routing} from "./register.routing";
import {RegisterComponent} from "./register.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";

@NgModule({
    imports:[FormsModule, ReactiveFormsModule, routing, CommonModule],
    declarations:[RegisterComponent]
})
export class RegisterModule{}