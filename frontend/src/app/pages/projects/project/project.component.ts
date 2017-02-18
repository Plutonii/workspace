import {Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import {Project} from "../../../models/project";

@Component({
    selector: 'ws-project',
    templateUrl: './project.component.html',
    styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {

    @ViewChild("progressBar")
    progressBar: ElementRef;

    /*private _numberOfAllTasks: number;
    private _numberOfCompletedTasks: number;
    private _numberOf*/

    project:Project;

    constructor() {
        this.project = new Project();
        this.project.numberOfCompletedTasks = 75;
        this.project.numberOfTasks = 100;
        this.project.numberOfUsers = 3;
/*        this._numberOfAllTasks = 100;
        this._numberOfCompletedTasks = 75;*/
    }

    controlProgressBar() {
        let width = Math.floor((this.numberOfCompletedTasks / this.numberOfAllTasks) * 100);
        this.progressBar.nativeElement.style.width = width + "%";
        if (width > 67) {
            this.progressBar.nativeElement.style.backgroundColor = "#18a401";
        } else if (width > 33) {
            this.progressBar.nativeElement.style.backgroundColor = "#d6de00";
        } else if (width > 0) {
            this.progressBar.nativeElement.style.backgroundColor = "#de6520";
        }
    }

    open(){
        console.log("open");
    }

    ngOnInit() {
        this.controlProgressBar();
    }

    plus() {
        this.numberOfCompletedTasks += 5;
    }

    minus() {
        this.numberOfCompletedTasks -= 5;
    }

    get numberOfAllTasks(): number {
        return this.project.numberOfTasks;
    }

    set numberOfAllTasks(value: number) {
        this.project.numberOfTasks = value;
        this.controlProgressBar();
    }

    get numberOfCompletedTasks(): number {
        return this.project.numberOfCompletedTasks;
    }

    set numberOfCompletedTasks(value: number) {
        this.project.numberOfCompletedTasks = value;
        this.controlProgressBar();
    }
}
