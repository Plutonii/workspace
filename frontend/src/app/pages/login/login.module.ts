import {NgModule} from "@angular/core";
import {routing} from "./login.routing";
import {LoginComponent} from "./login.component";
import {FormsModule} from "@angular/forms";
@NgModule({
    imports:[routing, FormsModule],
    declarations:[LoginComponent]
})
export class LoginModule{}