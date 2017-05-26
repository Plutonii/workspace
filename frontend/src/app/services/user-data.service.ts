import {Injectable} from '@angular/core';
import {Http, RequestOptions, Headers, Response} from "@angular/http";
import {UserProfile} from "../models/user-profile";
import {Observable} from "rxjs";
import {UserAccessService} from "./user-access.service";
import {Contact} from "../models/contact";
import {User} from "../models/user";

@Injectable()
export class UserDataService {

  private requestArgs: RequestOptions;
  private url: string;

  constructor(private http: Http,
              private userAccess: UserAccessService) {
    this.requestArgs = new RequestOptions();
    this.requestArgs.headers = new Headers({'Content-Type': 'application/json;charset=utf-8'});
    /*this.url = 'http://plutonii.ru:8888/workspace/api/';*/
    this.url = 'http://localhost:8080/api/';
  }

  public getUserProfileById(id: number): Observable<UserProfile> {
    this.setCurrentTokenInHeader();
    return this.http.get(this.url + 'user/' + id,
      this.requestArgs).map((resp) => {
      const userProfileList = resp.json();
      const userProfile: UserProfile = new UserProfile();
      userProfile.cloneOfObjectToUser(userProfileList);
      return userProfile;
    }).catch((error: Response) => {
      return Observable.throw(error.status);
    });
  }

  public addContact(contact: Contact) {
    this.setCurrentTokenInHeader();
    return this.http.post(this.url + 'contact', JSON.stringify(contact),
      this.requestArgs);
  }

  public updateContactsIdByUser(): void {
    this.setCurrentTokenInHeader();
    this.http.get(this.url + '/contact/userid/' + this.userAccess.getUserId(), this.requestArgs).map((resp: Response) => {
      const usersList: Array<User> = resp.json();
      usersList.forEach((val: User) => {
        this.userAccess.addContactId(val.id);
      })
    }).subscribe();
  }

  private setCurrentTokenInHeader() {
    this.requestArgs.headers.set('token', this.userAccess.getToken());
  }

}
