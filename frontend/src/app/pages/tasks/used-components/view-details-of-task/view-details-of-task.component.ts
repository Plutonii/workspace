import {Component, OnInit, Output, EventEmitter, Input} from '@angular/core';
import {Task} from "../../../../models/task";
import {UserAccessService} from "../../../../services/user-access.service";
import {TaskService} from "../../../../services/task.service";

@Component({
  selector: 'ws-view-details-of-task',
  templateUrl: './view-details-of-task.component.html',
  styleUrls: ['./view-details-of-task.component.css']
})
export class ViewDetailsOfTaskComponent implements OnInit {

  @Output() onClose = new EventEmitter();
  @Output() onDelete = new EventEmitter();
  @Input() selectTask: Task;
  @Input() authUserId: number;
  @Input() makerProjectId: number;

  constructor(private taskService: TaskService,
              private userAccess: UserAccessService) {
  }

  ngOnInit() {
  }

  completeTask() {
    this.selectTask.completed = true;
    this.taskService.addTask(this.selectTask).subscribe(() => {
    }, (errorStatusCode: number) => {
      if (errorStatusCode === 401) {
        this.userAccess.accessDenied();
      }
    });
  }

  notCompleteTask() {
    this.selectTask.completed = false;
    this.taskService.addTask(this.selectTask).subscribe(() => {
    }, (errorStatusCode: number) => {
      if (errorStatusCode === 401) {
        this.userAccess.accessDenied();
      }
    });
  }

  closeDetailWindow() {
    this.onClose.emit();
  }

  deleteTask() {
    this.onDelete.emit();
  }
}
