import {NgModule} from "@angular/core";
import {TasksComponent} from "./tasks.component";
import {routing} from "./tasks.routing";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {FirstViewComponent} from './used-components/first-view/first-view.component';
import {SecondViewComponent} from './used-components/second-view/second-view.component';
import {ViewDetailsOfTaskComponent} from './used-components/view-details-of-task/view-details-of-task.component';
import {TaskService} from "../../services/task.service";
import {TaskWithDetailsComponent} from "./used-components/task-with-details/task-with-details.component";
import {LabelService} from "../../services/label.service";
import {FilterTasks} from "../../services/filterTasks";

@NgModule({
  imports: [routing, CommonModule, FormsModule],
  declarations: [TasksComponent, FirstViewComponent, SecondViewComponent,
    ViewDetailsOfTaskComponent, TaskWithDetailsComponent, FilterTasks],
  providers: [TaskService, LabelService]
})
export class TasksModule {
}
