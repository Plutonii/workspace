import {Injectable} from '@angular/core';
import {Headers, Http, RequestOptions, Response} from "@angular/http";
import {Project} from "../models/project";
import {UserAccessService} from "./user-access.service";
import {Observable} from "rxjs";
import {EventListenerService} from "./event-listener.service";
import {User} from "../models/user";
import {Team} from "../models/team";

@Injectable()
export class ProjectService {
  private requestArgs: RequestOptions;
  private url: string;
  private _openProject: Project;

  constructor(private http: Http, private userAccess: UserAccessService,
              private eventListener: EventListenerService) {
    this.requestArgs = new RequestOptions();
    this.requestArgs.headers = new Headers({'Content-Type': 'application/json;charset=utf-8'});
    /*this.url = 'http://plutonii.ru:8888/workspace/api/';*/
    this.url = 'http://localhost:8080/api/';
  }

  public getProjectsByUserId(): Observable<Project[]> {
    this.setCurrentTokenInHeader();
    return this.http.get(this.url + 'project/userid/' + this.userAccess.getUserId(),
      this.requestArgs).map((resp) => {
      const projectList = resp.json();
      const projects: Project[] = [];
      for (let index in projectList) {
        if (!projectList.hasOwnProperty(index)) continue;
        const project: Project = new Project();
        project.cloneOfObjectToProject(projectList[index]);
        projects.push(project);
      }
      return projects;
    }).catch((error: Response) => {
      return Observable.throw(error.status);
    });
  }

  public getProjectById(projectId: Number): Observable<Project> {
    this.setCurrentTokenInHeader();
    return this.http.get(this.url + 'project/' + projectId,
      this.requestArgs).map((resp) => {
      const projectObject = resp.json();
      const project: Project = new Project();
      project.cloneOfObjectToProject(projectObject);
      return project;
    }).catch((error: Response) => {
      return Observable.throw(error.status);
    });
  }

  public getTeamByProjectId(projectId: Number): Observable<Array<User>> {
    this.setCurrentTokenInHeader();
    return this.http.get(this.url + 'team/users/' + projectId,
      this.requestArgs).map((resp) => {
      const users = resp.json();
      return users;
    }).catch((error: Response) => {
      return Observable.throw(error.status);
    });
  }

  //@Plutonii
  public removeTeam(projectId: number, userId: number) {
    this.setCurrentTokenInHeader();
    return this.http.delete(this.url + 'team/' + projectId + "/" + userId,
      this.requestArgs).map((resp: Response) => {
      return resp.status;
    }).catch((error: Response) => {
      return Observable.throw(error.status);
    });
  }

  public addUserToProject(projectId:number, user:User): Observable<number> {
    this.setCurrentTokenInHeader();
    const team:Team = new Team();
    team.projectId = projectId;
    team.user = user;
    return this.http.post(this.url + 'team/', JSON.stringify(team),
      this.requestArgs).map((resp) => {
      return resp.status;
    }).catch((error: Response) => {
      return Observable.throw(error.status);
    });
  }

  public addProject(project: Project): Observable<Project> {
    this.setCurrentTokenInHeader();
    return this.http.post(this.url + 'project/', JSON.stringify(project),
      this.requestArgs).map((resp) => {
      const projectObject = resp.json();
      const project: Project = new Project();
      project.cloneOfObjectToProject(projectObject);
      return project;
    }).catch((error: Response) => {
      return Observable.throw(error.status);
    });
  }

  public removeProject(project: Project) {
    this.setCurrentTokenInHeader();
    return this.http.delete(this.url + 'project/' + project.id,
      this.requestArgs).map((resp: Response) => {
      if (resp.status === 200) {
        this.eventListener.emitRemoveProject();
      }
      return resp.status;
    }).catch((error: Response) => {
      return Observable.throw(error.status);
    });
  }

  private setCurrentTokenInHeader() {
    this.requestArgs.headers.set('token', this.userAccess.getToken());
  }

  get openProject(): Project {
    return this._openProject;
  }

  set openProject(value: Project) {
    this._openProject = value;
  }
}
