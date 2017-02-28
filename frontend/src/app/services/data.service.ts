import {Injectable} from '@angular/core';
import {Headers, Http} from "@angular/http";
import {Project} from "../models/project";
import {Task} from "../models/task";
import {UserAccessService} from "./user-access.service";
import {Observable} from "rxjs";

@Injectable()
export class DataService {
    private _headers: Headers;
    private url: string;
    private _openProject:Project;

    constructor(private http: Http, private userAccess: UserAccessService) {
        this._headers = new Headers({'Content-Type': 'application/json;charset=utf-8'});
        this.url = 'http://plutonii.ru:8888/workspace/api/';
        /*this.url = 'http://localhost:8080/api/'*/
    }

    public loadProjectsByUserId(): Observable<Project[]> {
        this.setCurrentTokenInHeader();
        return this.http.get(this.url + 'project/userid/' + this.userAccess.getUserId(),
            {headers: this._headers}).map((resp) => {
            const projectList = resp.json();
            const projects:Project[] = [];
            for (let index in projectList) {
                if (!projectList.hasOwnProperty(index)) continue;
                const project:Project = new Project();
                project.cloneOfObjectToProject(projectList[index]);
                projects.push(project);
            }
            return projects;
        }).catch((error:any) =>{
            return Observable.throw(error);
        });
    }

    public loadTasksByProjectId(projectId:number): Observable<Task[]> {
        this.setCurrentTokenInHeader();
        return this.http.get(this.url + 'task/project/' + projectId,
            {headers: this._headers}).map((resp) => {
            const taskList = resp.json();
            const tasks:Task[] = [];
            for (let index in taskList) {
                if (!taskList.hasOwnProperty(index)) continue;
                const task:Task = new Task();
                task.cloneOfObjectToTask(taskList[index]);
                tasks.push(task);
            }
            return tasks;
        }).catch((error:any) =>{
            return Observable.throw(error);
        });
    }

    get openProject(): Project {
        return this._openProject;
    }

    set openProject(value: Project) {
        this._openProject = value;
    }

    public loadProjectById(projectId:Number): Observable<Project>{
        this.setCurrentTokenInHeader();
        return this.http.get(this.url + 'project/' + projectId,
            {headers: this._headers}).map((resp) => {
            const projectObject = resp.json();
            const project:Project = new Project();
            project.cloneOfObjectToProject(projectObject);
            return project;
        }).catch((error:any) =>{
           return Observable.throw(error);
        });
    }

    private setCurrentTokenInHeader(){
        this._headers.set('token', this.userAccess.getToken());
    }
}
