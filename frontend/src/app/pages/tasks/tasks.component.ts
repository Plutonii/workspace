import {Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import {Project} from "../../models/project";
import {Task} from "../../models/task";
import {UserAccessService} from "../../services/user-access.service";

@Component({
    selector: 'ws-tasks',
    templateUrl: './tasks.component.html',
    styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

    private authUserId:number;
    private project: Project;
    private tasks: Task[];
    private selectTask: Task;
    private isViewInput: boolean;
    private isOpenDetails: boolean;
    private newTask: Task;
    @ViewChild("inputOfAddNewTask")
    input: ElementRef;

    constructor(private userAccess:UserAccessService) {
        this.isViewInput = false;
        this.isOpenDetails = false;
        this.project = new Project;
        this.project.userId = 222;
        this.project.id = 2;
        this.project.numberOfUsers = 3;
        this.project.title = "Мой новый проект №2";
        this.tasks = [];
        let task = new Task();
        task.title = "Available task";
        task.description = "This is description of task by name 'Available task'";
        task.completed = false;
        task.id = 1;
        task.makerId = 222;
        task.projectId = 2;
        this.tasks.push(task);
        let task1 = new Task();
        task1.title = "Taken task";
        task1.description = "This is description of task by name 'Taken task'";
        task1.id = 2;
        task1.completed = true;
        task1.projectId = 2;
        this.tasks.push(task1);
    }

    ngOnInit() {
        this.authUserId = this.userAccess.getUserId();
    }

    setTrueIsViewInput() {
        this.newTask = new Task();
        this.isViewInput = true;
        this.isOpenDetails = false;
    }

    addNewTask() {
        this.tasks.push(this.newTask);
        this.selectTask = this.newTask;
        this.newTask = null;
        this.isViewInput = false;
        this.isOpenDetails = true;
    }

    cancelAddNewTask() {
        this.newTask = null;
        this.isViewInput = false;
    }

    openDetailWindow(task: Task) {
        this.isOpenDetails = true;
        this.selectTask = task;
    }

    closeDetailWindow() {
        this.isOpenDetails = false;
    }
}
