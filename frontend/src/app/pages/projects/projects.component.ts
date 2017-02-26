import {Component, OnInit} from '@angular/core';
import {Project} from "../../models/project";
import {DataService} from "../../services/data.service";
import {Router} from "@angular/router";

@Component({
    selector: 'ws-projects',
    templateUrl: './projects.component.html',
    styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {

    private projects:Project[];

    constructor(private dataLoader:DataService,
    private router:Router) {
    }

    ngOnInit() {
        this.dataLoader.loadProjectsByUserId().subscribe((projects:Project[])=>{
            this.projects = projects;
            console.dir(this.projects);
        }, (error:any) => {
            /*localStorage.clear();
            this.router.navigate(['/login']);*/
        });
    }

}
