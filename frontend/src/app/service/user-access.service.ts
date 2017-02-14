import {Injectable} from '@angular/core';
import {User} from "../model/user";
import {Headers, Http, Response} from "@angular/http";
import {Observable, Subject} from "rxjs";

@Injectable()
export class UserAccessService {

    private _isAuthorized: boolean;
    private changeAccess = new Subject<boolean>();
    changedAccess = this.changeAccess.asObservable();
    private user: User;
    private token:string = null;
    private _headers: Headers;

    constructor(private http: Http) {
        this._headers = new Headers({'Content-Type': 'application/json;charset=utf-8'});
    }

    init(): boolean {
        let token = localStorage.getItem("ws-token");
        if (token !== null && token !== undefined) {
            this._isAuthorized = true;
            this.changeAccess.next(true);
            this.token = token;
            let userStr = localStorage.getItem("ws-user");
            if (userStr !==null && userStr !== undefined && userStr !== ''){
                this.user = JSON.parse(userStr);
            }
        } else {
            this._isAuthorized = false;
            this.changeAccess.next(false);
        }
        return this._isAuthorized;
    }

    isAuthorized(): boolean {
        return this._isAuthorized;
    }

    registration(user: User) {
        this.user = user;
        return this.http.post('http://plutonii.ru:8888/workspace/access/new', JSON.stringify(user),
            {headers: this._headers}).map((resp: Response) => {
            let token: string = resp.headers.get("token");
            this.user.id = parseInt(token);
            this._isAuthorized = true;
            this.changeAccess.next(true);
            this.saveInfoAboutUser(token);
            return resp.status;
        }).catch((error: any) => {
            console.log("inServiceErrReg" + error);
            return Observable.throw(error);
        })
    }

    login(user: User) {
        this.user = user;
        return this.http.post('http://plutonii.ru:8888/workspace/access/login', JSON.stringify(user),
            {headers: this._headers}).map((resp: Response) => {
            let token: string = resp.headers.get("token");
            this.user.id = parseInt(token);
            this._isAuthorized = true;
            this.changeAccess.next(true);
            this.saveInfoAboutUser(token);
            return resp.status;
        }).catch((error: any) => {
            console.log("inServiceErrLogin" + error);
            return Observable.throw(error);
        })
    }

    logout() {
        console.log("click");
        console.dir(this.user);
        return this.http.post('http://plutonii.ru:8888/workspace/access/logout', JSON.stringify(this.user),
            {headers: this._headers}).map((resp: Response) => {
            console.log("inServiceOkReg" + resp);
            localStorage.clear();
            this._isAuthorized = false;
            this.changeAccess.next(false);
        }).catch((error: any) => {
            console.log("inServiceErrReg" + error);
            return Observable.throw(error);
        })
    }

    private saveInfoAboutUser(token:string): void {
        localStorage.setItem("ws-token", token);
        this.user.password = '';
        localStorage.setItem("ws-user", JSON.stringify(this.user));
    }

}
