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
        let letter = this.user.username.substr(0, 3);
        let backgroundColour = this. stringToColor(this.user.username);
        let elementAvatar = document.getElementById('avatar2');
        let elementName = document.getElementById('name2');
        elementName.innerHTML = this.user.username;
        elementAvatar.innerHTML = letter;
        elementAvatar.style.backgroundColor = backgroundColour;
      }, (error) => {
        if (error === 401) {
          this.userAccess.accessDenied();
        }
      });
    });
  }

  stringToColor(str) {
    let hash = 0;
    let color = '#';
    let i;
    let value;
    let strLength;

    if(!str) {
      return color + '333333';
    }

    strLength = str.length;

    for (i = 0; i < strLength; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }

    for (i = 0; i < 3; i++) {
      value = (hash >> (i * 8)) & 0xFF;
      color += ('00' + value.toString(16)).substr(-2);
    }

    return color;
  };

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
