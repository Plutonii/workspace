import {Component, OnInit, Output, EventEmitter, Input} from '@angular/core';
import {Task} from "../../../../models/task";
import {DataService} from "../../../../services/data.service";

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

    constructor(private dataLoader: DataService) {
    }

    ngOnInit() {
    }

    completeTask() {
        this.selectTask.completed = true;
        this.dataLoader.addTask(this.selectTask).subscribe();
    }

    notCompleteTask() {
        this.selectTask.completed = false;
        this.dataLoader.addTask(this.selectTask).subscribe();
    }

    closeDetailWindow() {
        this.onClose.emit();
    }

    dismissUser() {
        this.selectTask.user.id = null;
        const taskWithoutUser:Task = new Task();
        taskWithoutUser.cloneOfObjectToTask(this.selectTask);
        taskWithoutUser.user = null;
        this.dataLoader.addTask(taskWithoutUser).subscribe();
    }

    deleteTask() {
        this.onDelete.emit();
    }
}
