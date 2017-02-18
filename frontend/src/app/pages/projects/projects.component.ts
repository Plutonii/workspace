import {Component, OnInit} from '@angular/core';
import {Project} from "../../models/project";

@Component({
    selector: 'ws-projects',
    templateUrl: './projects.component.html',
    styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {

    constructor() {
        let project:Project = new Project();
        project.id = 10;
        project.description="23";
        project.numberOfTasks = 10;
        project.numberOfUsers = 15;
        console.dir(project);
    }

    ngOnInit() {
    }

}
