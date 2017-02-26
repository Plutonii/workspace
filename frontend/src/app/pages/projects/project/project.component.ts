import {Component, OnInit, ViewChild, ElementRef, Input} from '@angular/core';
import {Project} from "../../../models/project";
import {Router} from "@angular/router";
import {DataService} from "../../../services/data.service";

@Component({
    selector: 'ws-project',
    templateUrl: './project.component.html',
    styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {

    @ViewChild("progressBar")
    progressBar: ElementRef;

    @Input()
    project:Project;

    constructor(private router:Router,
                private dataLoader:DataService) {
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
        this.dataLoader.openProject = this.project;
        this.router.navigate(['/pages/project', this.project.id]);
    }

    ngOnInit() {
        this.controlProgressBar();
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
