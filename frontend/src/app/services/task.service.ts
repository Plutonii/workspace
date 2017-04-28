import {Injectable} from '@angular/core';
import {Headers, Http, RequestOptions, Response} from "@angular/http";
import {Task} from "../models/task";
import {UserAccessService} from "./user-access.service";
import {Observable} from "rxjs";

@Injectable()
export class TaskService {
  private requestArgs: RequestOptions;
  private url: string;

  constructor(private http: Http, private userAccess: UserAccessService) {
    this.requestArgs = new RequestOptions();
    this.requestArgs.headers = new Headers({'Content-Type': 'application/json;charset=utf-8'});
    this.url = 'http://plutonii.ru:8888/workspace/api/';
    /*this.url = 'http://localhost:8080/api/'*/
  }

  public getTasksByProjectId(projectId: number): Observable<Task[]> {
    this.setCurrentTokenInHeader();
    return this.http.get(this.url + 'task/project/' + projectId,
      this.requestArgs).map((resp) => {
      const taskList = resp.json();
      const tasks: Task[] = [];
      for (let index in taskList) {
        if (!taskList.hasOwnProperty(index)) continue;
        const task: Task = new Task();
        task.cloneOfObjectToTask(taskList[index]);
        tasks.push(task);
      }
      return tasks;
    }).catch((error: Response) => {
      return Observable.throw(error.status);
    });
  }

  public addTask(task: Task): Observable<Task> {
    this.setCurrentTokenInHeader();
    return this.http.post(this.url + 'task/', JSON.stringify(task),
      this.requestArgs).map((resp) => {
      const taskObject = resp.json();
      const task: Task = new Task();
      task.cloneOfObjectToTask(taskObject);
      return task;
    }).catch((error: Response) => {
      return Observable.throw(error.status);
    });
  }

  public  getTaskById(id: number): Observable<Task> {
    this.setCurrentTokenInHeader();
    return this.http.get(this.url + 'task/' + id,
      this.requestArgs).map((resp) => {
      const taskObject = resp.json();
      const task: Task = new Task();
      task.cloneOfObjectToTask(taskObject);
      return task;
    }).catch((error: Response) => {
      return Observable.throw(error.status);
    });
  }

  public removeTask(task: Task): Observable<Task> {
    this.setCurrentTokenInHeader();
    return this.http.delete(this.url + 'task/' + task.id,
      this.requestArgs).map(() => {
      return task;
    }).catch((error: Response) => {
      return Observable.throw(error.status);
    });
  }

  private setCurrentTokenInHeader() {
    this.requestArgs.headers.set('token', this.userAccess.getToken());
  }

}
