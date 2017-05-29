import {Component, OnInit, OnDestroy} from '@angular/core';
import {UserProfile} from "../../models/user-profile";
import {UserAccessService} from "../../services/user-access.service";
import {Subscription} from "rxjs";
import {UserDataService} from "../../services/user-data.service";
import {ActivatedRoute} from "@angular/router";
import {Contact} from "../../models/contact";
import {User} from "../../models/user";

@Component({
  selector: 'ws-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit, OnDestroy {

  private user: UserProfile;
  private authUserId: number;
  private subscriptionOnParamsUrl: Subscription;
  private isFriend: boolean;

  constructor(private userAccess: UserAccessService,
              private userDataLoader: UserDataService,
              private activateRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.authUserId = this.userAccess.getUserId();
    this.subscriptionOnParamsUrl = this.activateRoute.params.subscribe((params) => {
      this.userDataLoader.getUserProfileById(params['id']).subscribe((userProfile: UserProfile) => {
        this.user = userProfile;
        this.isFriend = this.userAccess.isFriend(this.user.id);
      }, (error) => {
        if (error === 401) {
          this.userAccess.accessDenied();
        }
      });
    });
  }

  ngOnDestroy() {
    this.subscriptionOnParamsUrl.unsubscribe();
  }

  friends() {
    const contact = new Contact();
    contact.userId = this.userAccess.getUserId();
    const user = new User();
    user.id = this.user.id;
    contact.contact = user;
    this.userDataLoader.addContact(contact).subscribe((resp) => {
      this.userAccess.addContact(resp.json());
      this.userAccess.addContactId(this.user.id);
      this.isFriend = this.userAccess.isFriend(this.user.id);
    });
  }

  removeFromFriend() {
    const userId = this.userAccess.getUserId();
    this.userDataLoader.removeContactByUserId(userId, this.user.id).subscribe(() => {
      this.userAccess.removeContactId(this.user.id);
      this.userAccess.removeContactById(this.user.id);
      this.isFriend = this.userAccess.isFriend(this.user.id);
    });
  }
}
