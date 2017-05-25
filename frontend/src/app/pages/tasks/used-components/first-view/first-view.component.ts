import {Component, OnInit, Input, ViewChild, ElementRef} from '@angular/core';
import {Task} from "../../../../models/task";
import {UserAccessService} from "../../../../services/user-access.service";
import {Project} from "../../../../models/project";
import {TaskService} from "../../../../services/task.service";
declare let $:any;


@Component({
  selector: 'ws-first-view',
  templateUrl: './first-view.component.html',
  styleUrls: ['./first-view.component.css']
})
export class FirstViewComponent implements OnInit {

  private selectTask: Task;
  private newTask: Task;

  @ViewChild("closeModal")
  closeModal: ElementRef;

  private authUserId: number;

  @Input()
  private tasks: Task[];

  @Input()
  private project: Project;

  constructor(private userAccess: UserAccessService,
              private taskService: TaskService) {
    this.newTask = new Task();
  }

  ngOnInit() {
    this.authUserId = this.userAccess.getUserId();
  }

  openAddNewTask() {
    this.newTask = new Task();
  }

  addNewTask() {
    this.newTask.projectId = this.project.id;
    this.taskService.addTask(this.newTask).subscribe((task: Task) => {
      this.closeModal.nativeElement.dispatchEvent(new Event('click', {bubbles: true}));
      this.newTask = new Task();
      this.tasks.push(task);
    }, (errorStatusCode: number) => {
      if (errorStatusCode === 401) {
        this.userAccess.accessDenied();
      }
    });
  }

  deleteTask() {
    this.taskService.removeTask(this.selectTask).subscribe(() => {
      this.selectTask.deleteInArray(this.tasks);
    }, (errorStatusCode: number) => {
      if (errorStatusCode === 401) {
        this.userAccess.accessDenied();
      }
    });
  }

  openDetailWindow(task: Task) {
    this.selectTask = task;
    console.dir(this.selectTask);
    $('#taskWithDetails').modal('show');

  }

  closeDetailWindow() {
    this.selectTask = null;
  }

  assignUser(task: Task) {
    task.user.id = this.authUserId;
    this.taskService.addTask(task).subscribe((newTask: Task) => {
      this.taskService.getTaskById(newTask.id).subscribe((task1) => {
        task.user = task1.user;
      });
    }, (errorStatusCode: number) => {
      if (errorStatusCode === 401) {
        this.userAccess.accessDenied();
      }
    });
  }


}
