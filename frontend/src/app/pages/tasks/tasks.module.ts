import {NgModule} from "@angular/core";
import {TasksComponent} from "./tasks.component";
import {routing} from "./tasks.routing";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";

@NgModule({
    imports:[routing, CommonModule, FormsModule],
    declarations:[TasksComponent]
})
export class TasksModule{}