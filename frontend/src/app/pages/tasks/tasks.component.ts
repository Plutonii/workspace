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
    /*    */
    private subscriptionOnParamsUrl: Subscription;

    constructor(private activateRoute: ActivatedRoute,
                private dataLoader: DataService) {
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
                    });
                }
                this.tasks = tasks;
                console.dir(this.tasks);
            });
        });
    }

    ngOnDestroy() {
        this.subscriptionOnParamsUrl.unsubscribe();
    }

    /*    */

    /*   */

    /*    closeDetailWindow() {
     this.isOpenDetails = false;
     this.selectTask = null;
     }*/

    /*    */

    /*    completeTask() {
     this.selectTask.completed = true;
     this.dataLoader.addTask(this.selectTask).subscribe();
     }*/

    /*    notCompleteTask() {
     this.selectTask.completed = false;
     this.dataLoader.addTask(this.selectTask).subscribe();
     }*/

    /*    openEditTask() {
     this.isOpenEditTask = true;
     }*/

    /*    saveEditTask() {
     this.dataLoader.addTask(this.newTask).subscribe((task: Task) => {
     this.closeModal.nativeElement.dispatchEvent(new Event('click', {bubbles: true}));
     this.newTask = new Task();
     });
     }*/

    toggleView() {
        this.isViewOne = !this.isViewOne;
    }

}