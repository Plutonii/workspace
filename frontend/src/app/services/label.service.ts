///<reference path="../models/label.ts"/>
import {Injectable} from '@angular/core';
import {Headers, Http, RequestOptions, Response} from "@angular/http";
import {Project} from "../models/project";
import {UserAccessService} from "./user-access.service";
import {Observable} from "rxjs";
import {EventListenerService} from "./event-listener.service";
import {Label} from "../models/label";
import {LabelTasks} from "../models/labeltasks";

@Injectable()
export class LabelService {
  private requestArgs: RequestOptions;
  private url: string;

  constructor(private http: Http, private userAccess: UserAccessService,
              private eventListener: EventListenerService) {
    this.requestArgs = new RequestOptions();
    this.requestArgs.headers = new Headers({'Content-Type': 'application/json;charset=utf-8'});
    /*this.url = 'http://plutonii.ru:8888/workspace/api/';*/
    this.url = 'http://localhost:8080/api/';
  }

  public getLabelsByProjectId(projectId: Number): Observable<Label[]> {
    this.setCurrentTokenInHeader();
    return this.http.get(this.url + 'label/projectid/' + projectId,
      this.requestArgs).map((resp) => {
      const labelList = resp.json();
      const labels: Label[] = [];
      for (const index in labelList) {
        if (!labelList.hasOwnProperty(index)) continue;
        const label: Label = new Label();
        label.cloneOfObjectToLabel(labelList[index]);
        labels.push(label);
      }
      return labels;
    }).catch((error: Response) => {
      return Observable.throw(error.status);
    });
  }

  public getLabelIdsByTaskId(taskId: Number): Observable<Number[]> {
    this.setCurrentTokenInHeader();
    return this.http.get(this.url + 'labeltasks/taskid/' + taskId,
      this.requestArgs).map((resp) => {
      return resp.json();
    }).catch((error: Response) => {
      return Observable.throw(error.status);
    });
  }

  public getLabelById(id: Number): Observable<Label> {
    this.setCurrentTokenInHeader();
    return this.http.get(this.url + 'label/' + id,
      this.requestArgs).map((resp) => {
      const labelObject = resp.json();
      const label: Label = new Label();
      label.cloneOfObjectToLabel(labelObject);
      return label;
    }).catch((error: Response) => {
      return Observable.throw(error.status);
    });
  }

  public addLabelTasks(label: LabelTasks): Observable<LabelTasks> {
    this.setCurrentTokenInHeader();
    return this.http.post(this.url + 'labeltasks/', JSON.stringify(label),
      this.requestArgs).map((resp) => {
      const labelObject = resp.json();
      const label: LabelTasks = new LabelTasks();
      label.cloneOfObjectToLabelTasks(labelObject);
      return label;
    }).catch((error: Response) => {
      return Observable.throw(error.status);
    });
  }

  public removeLabelTasks(label: LabelTasks) {
    this.setCurrentTokenInHeader();
    return this.http.delete(this.url + 'labeltasks/' + label.labelId + "/" + label.taskId,
      this.requestArgs).map((resp: Response) => {
      return resp.status;
    }).catch((error: Response) => {
      return Observable.throw(error.status);
    });
  }

  public addLabel(label: Label): Observable<Label> {
    this.setCurrentTokenInHeader();
    return this.http.post(this.url + 'label/', JSON.stringify(label),
      this.requestArgs).map((resp) => {
      const labelObject = resp.json();
      const label: Label = new Label();
      label.cloneOfObjectToLabel(labelObject);
      return label;
    }).catch((error: Response) => {
      return Observable.throw(error.status);
    });
  }

  public removeProject(label: Label) {
    this.setCurrentTokenInHeader();
    return this.http.delete(this.url + 'project/' + label.id,
      this.requestArgs).map((resp: Response) => {
      return resp.status;
    }).catch((error: Response) => {
      return Observable.throw(error.status);
    });
  }

  private setCurrentTokenInHeader() {
    this.requestArgs.headers.set('token', this.userAccess.getToken());
  }
}
