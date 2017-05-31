import {Injectable} from '@angular/core';
import {User} from "../models/user";
import {Headers, Http, Response} from "@angular/http";
import {Observable, Subject} from "rxjs";
import {EventListenerService} from "./event-listener.service";
import {Router} from "@angular/router";

@Injectable()
export class UserAccessService {

  private _isAuthorized: boolean;
  private changeAccess = new Subject<boolean>();
  changedAccess = this.changeAccess.asObservable();
  private user: User;
  private contacts: Array<User>;
  private token: string = null;
  private _headers: Headers;
  public redirectUrl: string;
  private url: string;

  constructor(private http: Http,
              private eventListener: EventListenerService,
              private router: Router) {
    this._headers = new Headers({'Content-Type': 'application/json;charset=utf-8'});
    /*this.url = 'http://plutonii.ru:8888/workspace/access/';*/
    this.url = 'http://localhost:8080/access/';
    this.contacts = [];
  }

  public init(): boolean {
    let token = localStorage.getItem("ws-token");
    if (token) {
      this._isAuthorized = true;
      this.changeAccess.next(true);
      this.token = token;
      let userStr = localStorage.getItem("ws-user");
      if (userStr) {
        this.user = JSON.parse(userStr);
      }
    } else {
      this._isAuthorized = false;
      this.changeAccess.next(false);
    }
    return this._isAuthorized;
  }

  public isAuthorized(): boolean {
    return this._isAuthorized;
  }

  public registration(user: User) {
    this.user = user;
    return this.http.post(this.url + 'new', JSON.stringify(user),
      {headers: this._headers}).map((resp: Response) => {
      let token: string = resp.headers.get("token");
      this.user.id = parseInt(token);
      this.saveInfoAboutUser(token);
      this.token = token;
      this._isAuthorized = this.init();
      this.changeAccess.next(this._isAuthorized);
      return resp.status;
    }).catch((error: any) => {
      return Observable.throw(JSON.parse(error._body).msg);
    })
  }

  public login(user: User) {
    this.user = user;
    return this.http.post(this.url + 'login', JSON.stringify(user),
      {headers: this._headers}).map((resp: Response) => {
      let token: string = resp.headers.get("token");
      this.user.id = parseInt(token);
      this.saveInfoAboutUser(token);
      this.token = token;
      this._isAuthorized = this.init();
      this.changeAccess.next(this._isAuthorized);
      return resp.status;
    }).catch((error: any) => {
      return Observable.throw(JSON.parse(error._body).msg);
    })
  }

  public logout() {
    return this.http.post(this.url + 'logout', JSON.stringify(this.user),
      {headers: this._headers}).map(() => {
      localStorage.clear();
      this._isAuthorized = false;
      this.changeAccess.next(false);
    }).catch((error: any) => {
      return Observable.throw(error);
    })
  }

  private saveInfoAboutUser(token: string): void {
    localStorage.setItem("ws-token", token);
    this.user.password = '';
    localStorage.setItem("ws-user", JSON.stringify(this.user));
  }

  public accessDenied() {
    localStorage.clear();
    this.eventListener.showAlert("Сессия закончена. Авторизуйтесь заново.");
    this.router.navigate(["/login"]);
  }


  public getUserId(): number {
    return this.user.id;
  }

  public getToken(): string {
    return this.token;
  }

  public getUserName(): string {
    return this.user.username;
  }

  public addContactId(id: number) {
    this.user.contactsId.push(id);
  }

  public addContact(user: User) {
    this.contacts.push(user)
  }

  public setContacts(contacts: Array<User>) {
    this.contacts = contacts;
  }

  public setContactsId(ids: Array<number>) {
    this.user.contactsId = ids;
  }

  public getContacts() {
    return this.contacts;
  }

  public removeContactId(id: number) {
    const index: number = this.user.contactsId.findIndex((value) => {
      if (value === id) return true;
    });
    if (index !== -1) {
      this.user.contactsId.splice(index, 1);
    }
  }

  public removeContactById(userId: number) {
    const index: number = this.contacts.findIndex((value) => {
      if (value.id === userId) return true;
    });
    if (index !== -1) {
      this.contacts.splice(index, 1);
    }
  }

  public isFriend(id: number): boolean {
    return this.user.contactsId.findIndex((value) => value === id) !== -1;
  }
}
