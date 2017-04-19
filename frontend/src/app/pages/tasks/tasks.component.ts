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


    private project: Project;
    private tasks: Task[];

    private isViewOne: boolean;

    private subscriptionOnParamsUrl: Subscription;

    constructor(private activateRoute: ActivatedRoute,
                private dataLoader: DataService,
                private userAccess: UserAccessService) {
        this.isViewOne = true;
        this.tasks = [];
        this.project = new Project();
    }

    ngOnInit() {
        this.subscriptionOnParamsUrl = this.activateRoute.params.subscribe((params) => {
            this.dataLoader.getTasksByProjectId(params['id']).subscribe((tasks) => {
                this.project = this.dataLoader.openProject;
                if (!this.project) {
                    this.dataLoader.getProjectById(params['id']).subscribe((project) => {
                        this.project = project;
                    }, (errorStatusCode: number) => {
                        if (errorStatusCode === 401){
                            this.userAccess.accessDenied();
                        }
                    });
                }
                this.tasks = tasks;
                console.dir(this.tasks);
            }, (errorStatusCode: number) => {
                if (errorStatusCode === 401){
                    this.userAccess.accessDenied();
                }
            });
        });
    }

    ngOnDestroy() {
        this.subscriptionOnParamsUrl.unsubscribe();
    }

    toggleView() {
        this.isViewOne = !this.isViewOne;
    }

}