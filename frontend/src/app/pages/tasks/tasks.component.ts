import {Component, OnInit, ViewChild, ElementRef, OnDestroy} from '@angular/core';
import {Project} from "../../models/project";
import {Task} from "../../models/task";
import {UserAccessService} from "../../services/user-access.service";
import {ActivatedRoute} from "@angular/router";
import {Subscription} from "rxjs";
import {DataService} from "../../services/data.service";

@Component({
    selector: 'ws-tasks',
    templateUrl: './tasks.component.html',
    styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit, OnDestroy {

    private authUserId: number;
    private project: Project;
    private tasks: Task[];
    private selectTask: Task;
    private isViewInput: boolean;
    private isOpenDetails: boolean;
    private newTask: Task;
    @ViewChild("inputOfAddNewTask")
    input: ElementRef;
    private subscriptionOnParams: Subscription;

    constructor(private userAccess: UserAccessService,
                private activateRoute: ActivatedRoute,
                private dataLoader: DataService,
               /* private eventListener:EventListenerService*/) {
        this.isViewInput = false;
        this.isOpenDetails = false;
        this.tasks = [];
        this.project = new Project();
    }

    ngOnInit() {
        this.authUserId = this.userAccess.getUserId();
        let id: number;
        this.subscriptionOnParams = this.activateRoute.params.subscribe((params) => {
            this.dataLoader.getTasksByProjectId(params['id']).subscribe((tasks) => {
                this.project = this.dataLoader.openProject;
                if (!this.project) {
                    this.dataLoader.getProjectById(params['id']).subscribe((project) => {
                        this.project = project;
                    });
                }
                this.tasks = tasks;
            });
        });
    }

    ngOnDestroy() {
        this.subscriptionOnParams.unsubscribe();
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
