import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {routing} from "./contacts.routing";
import {UserDataService} from "../../services/user-data.service";
import {ContactsComponent} from "./contacts.component";
@NgModule({
  imports:[routing, CommonModule, FormsModule],
  declarations:[ContactsComponent],
  providers: [UserDataService]
})
export class ContactsModule{}
