import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {UserComponent} from "./user.component";
import {routing} from "./user.routing";
@NgModule({
    imports:[routing, CommonModule, FormsModule],
    declarations:[UserComponent]
})
export class UserModule{}