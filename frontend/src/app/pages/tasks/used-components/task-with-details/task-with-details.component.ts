import {Component, OnInit, Output, EventEmitter, Input} from '@angular/core';
import {Task} from "../../../../models/task";
import {UserAccessService} from "../../../../services/user-access.service";
import {TaskService} from "../../../../services/task.service";
import {User} from "../../../../models/user";
import {Label} from "../../../../models/label";
import {LabelService} from "../../../../services/label.service";
import {main} from "@angular/compiler-cli/src/main";
import {LabelTasks} from "../../../../models/labeltasks";
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

  private labels: Label[];
  private selectedIdforLabels: Number[];
  private hundleId: number;
  private showNewLabel: boolean;
  private newLabel: Label;
  private authUserId: number;

  constructor(private taskService: TaskService,
              private userAccess: UserAccessService,
              private labelService: LabelService) {
    this.labels = [];
    this.selectedIdforLabels = [];
    this.authUserId = this.userAccess.getUserId();
  }

  ngOnInit() {
    const Handler = (function () {
      let i = 1,
        listeners = {};

      return {
        addListener: function (element, event, handler, capture) {
          element.addEventListener(event, handler, capture);
          listeners[i] = {
            element: element,
            event: event,
            handler: handler,
            capture: capture
          };
          return i++;
        },
        removeListener: function (id) {
          if (id in listeners) {
            let h = listeners[id];
            h.element.removeEventListener(h.event, h.handler, h.capture);
          }
        }
      };
    }());
    function onClickByLabel(context) {
      return Handler.addListener(window, 'clickByLabel', function (e) {
        let ifFound: boolean = false;
        e.target.classList.forEach((value) => {
          if (value === 'label-not-choose') ifFound = true;
        });
        const onLabel = context.labels.find((value) => {
          return value.id == e.target.dataset.labelIndex;
        });
        const labelForSending = new LabelTasks();
        labelForSending.taskId = context.selectTask.id;
        labelForSending.labelId = onLabel.id;
        if (!ifFound) {
          context.labelService.removeLabelTasks(labelForSending).subscribe(() => {
            e.target.classList.add('label-not-choose');
            onLabel.deleteInArray(context.selectTask.labels);
          }, (errorStatusCode: number) => {
            if (errorStatusCode === 401) {
              context.userAccess.accessDenied();
            }
          });
        } else {
          context.labelService.addLabelTasks(labelForSending).subscribe((label) => {
            if (label.id && label.id > 0) {
              context.selectTask.labels.push(onLabel);
              e.target.classList.remove('label-not-choose');
            }
          }, (errorStatusCode: number) => {
            if (errorStatusCode === 401) {
              context.userAccess.accessDenied();
            }
          });
        }
      }, false);
    }

    /*$(\"#editLabels\")[0].dispatchEvent(new Event(\"clickByLabel\", {bubbles: true}))*/
    this.authUserId = this.userAccess.getUserId();
    $('#taskWithDetails').on('hidden.bs.modal', () => {
      Handler.removeListener(this.hundleId);
      this.onClose.emit();
    });
    $('#taskWithDetails').on('shown.bs.modal', () => {
      this.selectTask.labels = [];
      this.hundleId = onClickByLabel(this);
      this.getAllLabelsForProject();
    });
  }

  private getAllLabelsForProject(){
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
    let content: string = '';
    this.labelService.getLabelsByProjectId(this.selectTask.projectId).subscribe((labels) => {
      this.labels = labels;
      this.labelService.getLabelIdsByTaskId(this.selectTask.id).subscribe((ids) => {
        this.selectedIdforLabels = ids;
        this.labels.forEach((mainValue) => {
          let existentLabel = false;
          this.selectedIdforLabels.forEach((id) => {
            if (mainValue.id === id) existentLabel = true;
          });
          if (existentLabel) {
            this.selectTask.labels.push(mainValue);
            content += "<div _ngcontent-c7='' data-label-index='" + mainValue.id + "' class='label-in-popover " + getColourById(mainValue.colourId) +
              "' onclick=\"event.target.dispatchEvent(new Event('clickByLabel', {bubbles: true}));\">" +
              mainValue.title + "</div>";
          } else {
            content += "<div _ngcontent-c7='' data-label-index='" + mainValue.id + "' class='label-in-popover label-not-choose " + getColourById(mainValue.colourId) +
              "' onclick=\"event.target.dispatchEvent(new Event('clickByLabel', {bubbles: true}));\">" + mainValue.title + "</div>";
          }
        });
        $('#editLabels').popover({
          title: 'Метки задачи <span class="glyphicon glyphicon-remove task-close"' +
          'onclick="$(\'#editLabels\')[0].dispatchEvent(new Event(\'click\', {bubbles: true}));" data-toggle="tooltip" data-placement="left"' +
          ' title="Закрыть окно"> </span>',
          html: true,
          placement: 'left',
          content: content
        });
      }, (errorStatusCode: number) => {
        if (errorStatusCode === 401) {
          this.userAccess.accessDenied();
        }
      });
    }, (errorStatusCode: number) => {
      if (errorStatusCode === 401) {
        this.userAccess.accessDenied();
      }
    });
  }

  showForm() {
    this.newLabel = new Label();
    this.newLabel.colourId = 3;
    this.newLabel.title = "";
    this.newLabel.projectId = this.selectTask.projectId;
    this.showNewLabel = true;
  }

  cancelForm() {
    this.newLabel = null;
    this.showNewLabel = false;
  }

  submitForm() {
    this.labelService.addLabel(this.newLabel).subscribe((label) => {
      this.labels.push(label);
      this.showNewLabel = false;
      $('#editLabels').popover('destroy');
      this.selectTask.labels = [];
      this.getAllLabelsForProject();
    }, (errorStatusCode: number) => {
      if (errorStatusCode === 401) {
        this.userAccess.accessDenied();
      }
    });
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
    /*
     const div = document.createElement('div');
     const X = $e.clientX + 'px', Y = $e.clientY + 'px';
     div.style.position = 'absolute';
     div.style.left = X;
     div.style.top = Y;
     div.style.zIndex = "1050";
     div.style.background = 'red';
     div.style.width = 'auto';
     div.appendChild(document.createTextNode('Я обычный текст'));
     document.body.appendChild(div);*/
  }

}
