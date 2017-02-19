import {Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import {Project} from "../../models/project";
import {Task} from "../../models/task";

@Component({
    selector: 'ws-tasks',
    templateUrl: './tasks.component.html',
    styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

    private project: Project;
    private tasks: Task[];
    private isViewInput: boolean;
    private newTask: Task;
    @ViewChild("inputOfAddNewTask")
    input: ElementRef;

    constructor() {
        this.isViewInput = false;
        this.project = new Project;
        this.project.id = 2;
        this.project.numberOfUsers = 3;
        this.project.title = "Мой новый проект №2";
        this.tasks = [];
        let task = new Task();
        task.title = "Available task";
        task.description = "This is description of task by name 'Available task'";
        task.id = 1;
        task.makerId = 222;
        task.projectId = 2;
        this.tasks.push(task);
        let task1 = new Task();
        task1.title = "Taken task";
        task1.description = "This is description of task by name 'Taken task'";
        task1.id = 2;
        task1.projectId = 2;
        this.tasks.push(task1);
    }


    ngOnInit() {
    }

    setTrueIsViewInput() {
        this.newTask = new Task();
        this.isViewInput = true;
        setTimeout(()=>console.dir(this.input.nativeElement.focus(), 5));
    }

    addNewTask() {
        this.tasks.push(this.newTask);
        this.newTask = null;
        this.isViewInput = false;
    }

    cancelAddNewTask(){
        this.newTask = null;
        this.isViewInput = false;
    }
}
