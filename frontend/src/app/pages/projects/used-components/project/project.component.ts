import {Component, OnInit, ViewChild, ElementRef, Input} from '@angular/core';
import {Project} from "../../../../models/project";
import {Router} from "@angular/router";
import {DataService} from "../../../../services/data.service";
import {UserAccessService} from "../../../../services/user-access.service";

@Component({
    selector: 'ws-project',
    templateUrl: './project.component.html',
    styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {

    @ViewChild("progressBar")
    progressBar: ElementRef;

    private authUserId: number;

    @Input()
    project: Project;

    constructor(private router: Router,
                private dataLoader: DataService,
                private userAccess: UserAccessService) {
        this.authUserId = this.userAccess.getUserId();
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

    ngOnInit() {
        this.controlProgressBar();
    }

    open() {
        this.dataLoader.openProject = this.project;
        this.router.navigate(['/pages/project', this.project.id]);
    }

    get numberOfAllTasks(): number {
        return this.project.numberOfTasks;
    }

    get numberOfCompletedTasks(): number {
        return this.project.numberOfCompletedTasks;
    }

    public deleteProject() {
        this.dataLoader.removeProject(this.project).subscribe(() => {
            const alert = document.getElementById("delete-project");
            alert.classList.add("show-alert");
            setTimeout(function () {
                alert.classList.remove("show-alert")
            }, 3100);
        });
    }

}
