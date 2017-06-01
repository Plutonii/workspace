import {Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import {Project} from "../../models/project";
import {ProjectService} from "../../services/project.service";
import {Router} from "@angular/router";
import {UserAccessService} from "../../services/user-access.service";
import {EventListenerService} from "../../services/event-listener.service";
import {User} from "../../models/user";
declare let $: any;

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

    private contacts: Array<any>;
    private showProject: Project;

    constructor(private dataLoader: ProjectService,
                private router: Router,
                private userAccess: UserAccessService,
                private eventListener: EventListenerService) {
        this.projects = [];
        this.newProject = new Project();
        this.contacts = [];
        this.showProject = new Project();
    }

    ngOnInit() {
        this.loadProjects();
        this.eventListener.subscribeReloadProject.subscribe(() => {
            this.loadProjects();
        });
      /*$('#modalOfContacts').on('shown.bs.modal', () => {
        console.dir(123231);
      });*/
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

  changedMember(friend) {
    if (friend.isTeam) {
      this.removeUserFromProject(friend.contact);
    } else {
      this.addUsersInProject(friend.contact);
    }
  }

  removeUserFromProject(user: User) {
    this.dataLoader.removeTeam(this.showProject.id, user.id).subscribe(() => {
      const indexContact = this.contacts.findIndex((value) => {
        if (value.contact.id === user.id) return true;
      });
      this.contacts[indexContact].isTeam = false;
      const indexTeam = this.showProject.teams.findIndex((value) => {
        if (value.id === user.id) return true;
      });
      this.showProject.teams.splice(indexTeam, 1);
      this.showProject.numberOfUsers--;
    }, (errorStatusCode: number) => {
      if (errorStatusCode === 401) {
        this.userAccess.accessDenied();
      }
    });
  }

  addUsersInProject(user: User) {
    this.dataLoader.addUserToProject(this.showProject.id, user).subscribe(() => {
      const indexContact = this.contacts.findIndex((value) => {
        if (value.contact.id === user.id) return true;
      });
      this.contacts[indexContact].isTeam = true;
      this.showProject.teams.push(user);
      this.showProject.numberOfUsers++;
    }, (errorStatusCode: number) => {
      if (errorStatusCode === 401) {
        this.userAccess.accessDenied();
      }
    });
  }

    showing(e){
      this.contacts = e.contacts;
      this.showProject = e.project;
    }
}
