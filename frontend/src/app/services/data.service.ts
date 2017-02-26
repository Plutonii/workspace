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
        this._headers.set('token', this.userAccess.getToken());
        let projectList;
        return this.http.get(this.url + 'project/userid/' + this.userAccess.getUserId(),
            {headers: this._headers}).map((resp) => {
            projectList = resp.json();
            let projects:Project[] = [];
            for (let index in projectList) {
                let project:Project = new Project();
                project.id = projectList[index].id;
                project.title = projectList[index].title;
                project.description = projectList[index].description;
                project.numberOfTasks = projectList[index].numberOfTasks;
                project.numberOfCompletedTasks = projectList[index].numberOfCompletedTasks;
                project.numberOfUsers = projectList[index].numberOfUsers;
                project.userId = projectList[index].userId;
                projects.push(project);
            }
            return projects;
        }).catch((error:any) =>{
            return Observable.throw(error);
        });
    }

    public loadTasksByProjectId(projectId:number): Observable<Task[]> {
        this._headers.set('token', this.userAccess.getToken());
        let taskList;
        return this.http.get(this.url + 'task/project/' + projectId,
            {headers: this._headers}).map((resp) => {
            taskList = resp.json();
            let tasks:Task[] = [];
            for (let index in taskList) {
                let task:Task = new Task();
                task.id = taskList[index].id;
                task.title = taskList[index].title;
                task.description = taskList[index].description;
                task.completed = taskList[index].completed;
                task.makerId = taskList[index].makerId;
                task.projectId = taskList[index].projectId;
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
}
