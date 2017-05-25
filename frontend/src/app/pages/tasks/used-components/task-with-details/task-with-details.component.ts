import {Component, OnInit, Output, EventEmitter, Input} from '@angular/core';
import {Task} from "../../../../models/task";
import {UserAccessService} from "../../../../services/user-access.service";
import {TaskService} from "../../../../services/task.service";
import {User} from "../../../../models/user";
import {Label} from "../../../../models/label";
declare let $: any;

@Component({
  selector: 'ws-task-with-details',
  templateUrl: './task-with-details.component.html',
  styleUrls: ['./task-with-details.component.css']
})
export class TaskWithDetailsComponent implements OnInit {

  @Output() onClose = new EventEmitter();
  @Input() selectTask: Task;
  @Input() makerProjectId: number;

  private authUserId: number;

  constructor(private taskService: TaskService,
              private userAccess: UserAccessService) {
    console.log("constructor wast-with-details");
  }

  ngOnInit() {
    console.log("ngOnInit");
    function getColourById(id: number): string {
      switch (id) {
        case 1:
          return ' task-label-red ';
        case 2:
          return ' task-label-black ';
        case 3:
          return ' task-label-green ';
        case 4:
          return ' task-label-blue ';
        case 5:
          return ' task-label-yellow ';
        default:
          return '';
      }
    }
/*$(\"#editLabels\")[0].dispatchEvent(new Event(\"clickByLabel\", {bubbles: true}))*/
    this.authUserId = this.userAccess.getUserId();
    $('#taskWithDetails').on('hidden.bs.modal', () => this.onClose.emit());
    $('#taskWithDetails').on('shown.bs.modal', () => {
      window.addEventListener('clickByLabel', this.clickByLabel);
      const l1 = new Label(1, "Баг", 1);
      const l2 = new Label(1, "Не работает", 2);
      const l3 = new Label(1, "Завершено", 3);
      this.selectTask.labels = [];
      this.selectTask.labels.push(l1);
      this.selectTask.labels.push(l2);
      this.selectTask.labels.push(l3);
      let content: string = '';
      for (let i: number = 1; i < 6; i++) {
        const existentLabel = this.selectTask.labels.find((value) => {
          if (value.colorId === i) return true;
          return false;
        });
        if (existentLabel) {
          content += "<div _ngcontent-c7='' data-label-index='"+i+"' class='label-in-popover " + getColourById(i) +
            "' onclick=\"event.target.dispatchEvent(new Event('clickByLabel', {bubbles: true}));\">" +
            existentLabel.title + "</div>";
        } else {
          content += "<div _ngcontent-c7='' data-label-index='"+i+"' class='label-in-popover label-not-choose " + getColourById(i) +
            "' onclick=\"event.target.dispatchEvent(new Event('clickByLabel', {bubbles: true}));\"> </div>";
        }
      }
      $('#editLabels').popover({
        title: 'Метки задачи <span class="glyphicon glyphicon-remove task-close"' +
        'onclick="$(\'#editLabels\')[0].dispatchEvent(new Event(\'click\', {bubbles: true}));" data-toggle="tooltip" data-placement="left"' +
        ' title="Закрыть окно"> </span>',
        html: true,
        placement: 'left',
        content: content
      });
    });
  }

  clickByLabel(e) {
    let ifFound:boolean = false;
    e.target.classList.forEach((value)=>{
      if(value==='label-not-choose') ifFound = true;
    });
    if(!ifFound) {
      e.target.classList.add('label-not-choose');
    } else {
      console.log('remove');
      e.target.classList.remove('label-not-choose');
    }
    console.dir(e.target);
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

  assignUser(userId: number) {
    this.selectTask.user.id = userId;
    this.taskService.addTask(this.selectTask).subscribe((newTask: Task) => {
      this.taskService.getTaskById(newTask.id).subscribe((task1) => {
        this.selectTask.user = task1.user;
      });
    }, (errorStatusCode: number) => {
      if (errorStatusCode === 401) {
        this.userAccess.accessDenied();
      }
    });
  }

  dismissUser() {
    this.selectTask.user.id = null;
    const taskWithoutUser: Task = new Task();
    taskWithoutUser.cloneOfObjectToTask(this.selectTask);
    taskWithoutUser.user = null;
    this.taskService.addTask(taskWithoutUser).subscribe(() => {
    }, (errorStatusCode: number) => {
      if (errorStatusCode === 401) {
        this.userAccess.accessDenied();
      }
    });
  }

  openWindowEditLabels($e) {
    $('#editLabels').popover('toggle');
    /*console.dir($e);
     const div = document.createElement('div');
     const X = $e.clientX + 'px', Y = $e.clientY + 'px';
     div.style.position = 'absolute';
     div.style.left = X;
     div.style.top = Y;
     div.style.zIndex = "1050";
     div.style.background = 'red';
     div.style.width = 'auto';
     div.appendChild(document.createTextNode('Я обычный текст'));
     console.dir(div);
     document.body.appendChild(div);*/
  }

}
