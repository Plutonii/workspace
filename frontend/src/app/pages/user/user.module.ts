import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {UserComponent} from "./user.component";
import {routing} from "./user.routing";
import {UserDataService} from "../../services/user-data.service";
@NgModule({
    imports:[routing, CommonModule, FormsModule],
    declarations:[UserComponent],
    providers: [UserDataService]
})
export class UserModule{}