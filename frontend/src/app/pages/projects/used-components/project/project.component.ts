import {Component, OnInit, ViewChild, ElementRef, Input, Output, EventEmitter} from '@angular/core';
import {Project} from "../../../../models/project";
import {Router} from "@angular/router";
import {ProjectService} from "../../../../services/project.service";
import {UserAccessService} from "../../../../services/user-access.service";
import {EventListenerService} from "../../../../services/event-listener.service";
import {User} from "../../../../models/user";
declare let $: any;

@Component({
  selector: 'ws-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {

  @ViewChild("progressBar")
  progressBar: ElementRef;

  private authUserId: number;

  @Output() onShow = new EventEmitter();

  @Input()
  project: Project;

  private contacts: Array<any>;

  constructor(private router: Router,
              private dataLoader: ProjectService,
              private userAccess: UserAccessService,
              private eventListener: EventListenerService) {
    this.authUserId = this.userAccess.getUserId();
    this.contacts = [];
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
    //когда открывается ставим событие на открытие модалки и только тогда обнавляем контакты и друья
    //Только проверь преждевременно, действительно ли баг в этом (т.е. установи причину бага).
    this.controlProgressBar();

    $('#modalOfContacts').on('hidden.bs.modal', () => {
      /*this.contacts.forEach((value) => {
       console.dir(value.isTeam);
       });
       console.dir(this.project.teams);*/
    });
  }

  open() {
    this.dataLoader.openProject = this.project;
    this.router.navigate(['/pages/project', this.project.id]);
  }

  /*changedMember(friend) {
    if (friend.isTeam) {
      this.removeUserFromProject(friend.contact);
    } else {
      this.addUsersInProject(friend.contact);
    }
  }

  removeUserFromProject(user: User) {
    this.dataLoader.removeTeam(this.project.id, user.id).subscribe(() => {
      const indexContact = this.contacts.findIndex((value) => {
        if (value.contact.id === user.id) return true;
      });
      this.contacts[indexContact].isTeam = false;
      const indexTeam = this.project.teams.findIndex((value) => {
        if (value.id === user.id) return true;
      });
      this.project.teams.splice(indexTeam, 1);
      this.project.numberOfUsers--;
    }, (errorStatusCode: number) => {
      if (errorStatusCode === 401) {
        this.userAccess.accessDenied();
      }
    });
  }

  addUsersInProject(user: User) {
    this.dataLoader.addUserToProject(this.project.id, user).subscribe(() => {
      const indexContact = this.contacts.findIndex((value) => {
        if (value.contact.id === user.id) return true;
      });
      this.contacts[indexContact].isTeam = true;
      this.project.teams.push(user);
      this.project.numberOfUsers++;
    }, (errorStatusCode: number) => {
      if (errorStatusCode === 401) {
        this.userAccess.accessDenied();
      }
    });
  }*/

  get numberOfAllTasks(): number {
    return this.project.numberOfTasks;
  }

  get numberOfCompletedTasks(): number {
    return this.project.numberOfCompletedTasks;
  }

  public deleteProject() {
    this.dataLoader.removeProject(this.project).subscribe(() => {
      this.eventListener.showAlert("Проект был перемещён в корзину.");
    }, (errorStatusCode: number) => {
      if (errorStatusCode === 401) {
        this.userAccess.accessDenied();
      }
    });
  }

  showAllContacts() {
    $('#modalOfContacts').modal('show');
    this.dataLoader.getTeamByProjectId(this.project.id).subscribe((users) => {
      this.project.teams = users;
      this.contacts = [];
      this.userAccess.getContacts().forEach((value) => {
        let ifFound = this.project.teams.find((valueIn) => {
          if (valueIn.id === value.id) return true;
        });
        if (ifFound) {
          this.contacts.push({"contact": value, "isTeam": true});
        } else {
          this.contacts.push({"contact": value, "isTeam": false});
        }
      });
      const emmiter = {
        "contacts": this.contacts,
        "project": this.project
      };
      this.onShow.emit(emmiter);
    }, (errorStatusCode: number) => {
      if (errorStatusCode === 401) {
        this.userAccess.accessDenied();
      }
    });

  }

}
