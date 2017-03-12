import {NgModule} from "@angular/core";
import {TasksComponent} from "./tasks.component";
import {routing} from "./tasks.routing";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {FirstViewComponent} from './used-components/first-view/first-view.component';
import {SecondViewComponent} from './used-components/second-view/second-view.component';
import { ViewDetailsOfTaskComponent } from './used-components/view-details-of-task/view-details-of-task.component';

@NgModule({
    imports: [routing, CommonModule, FormsModule],
    declarations: [TasksComponent, FirstViewComponent, SecondViewComponent, ViewDetailsOfTaskComponent]
})
export class TasksModule {
}