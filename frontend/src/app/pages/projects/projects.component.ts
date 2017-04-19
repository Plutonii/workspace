import {Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import {Project} from "../../models/project";
import {DataService} from "../../services/data.service";
import {Router} from "@angular/router";
import {UserAccessService} from "../../services/user-access.service";
import {EventListenerService} from "../../services/event-listener.service";

@Component({
    selector: 'ws-projects',
    templateUrl: './projects.component.html',
    styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {

    private projects: Project[];
    private newProject: Project;
    @ViewChild("closeModal")
    closeModal: ElementRef;

    constructor(private dataLoader: DataService,
                private router: Router,
                private userAccess: UserAccessService,
                private eventListener: EventListenerService) {
        this.projects = [];
        this.newProject = new Project();
    }

    ngOnInit() {
        this.loadProjects();
        this.eventListener.subscribeReloadProject.subscribe(() => {
            this.loadProjects();
        });
    }

    private loadProjects(){
        this.dataLoader.getProjectsByUserId().subscribe((projects: Project[]) => {
            this.projects = projects;
        }, (errorStatusCode: number) => {
            if (errorStatusCode === 401){
                this.userAccess.accessDenied();
            }
        });
    }

    private createProject() {
        this.newProject.user.id = this.userAccess.getUserId();
        console.dir(this.newProject);
        this.dataLoader.addProject(this.newProject).subscribe((project: Project) => {
            this.closeModal.nativeElement.dispatchEvent(new Event('click', {bubbles: true}));
            this.newProject = new Project();
            this.dataLoader.getProjectById(project.id).subscribe((project1: Project) => {
                this.projects.push(project1);
            });
        }, (errorStatusCode: number) => {
            if (errorStatusCode === 401){
                this.userAccess.accessDenied();
            }
        });
    }

}
