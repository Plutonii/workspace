import {Component, OnInit} from '@angular/core';
import {UserAccessService} from "../../services/user-access.service";
import {User} from "../../models/user";
import {UserDataService} from "../../services/user-data.service";
import {Router} from "@angular/router";
import {Contact} from "../../models/contact";
declare let $: any;

@Component({
  selector: 'ws-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {

  private contacts: Array<User>;
  private userId: number;
  private findUserName: string;
  private foundUsers: Array<any>;

  constructor(private userAccess: UserAccessService,
              private userData: UserDataService,
              private router: Router,) {
    this.userData.updateContactsIdByUser().subscribe(() => {
      this.contacts = this.userAccess.getContacts();
    }, (errorStatusCode: number) => {
      if (errorStatusCode === 401) {
        this.userAccess.accessDenied();
      }
    });
    this.foundUsers = null;
  }

  ngOnInit() {
    this.userId = this.userAccess.getUserId();
  }

  removeFromContact(id, e: Event, userF) {
    this.userData.removeContactByUserId(this.userId, id).subscribe(() => {
      this.userAccess.removeContactById(id);
      this.userAccess.removeContactId(id);
      if (userF) userF.isFriend = false;
    }, (errorStatusCode: number) => {
      if (errorStatusCode === 401) {
        this.userAccess.accessDenied();
      }
    });
    e.stopPropagation();
  }

  findUsers(string: string) {
    this.userData.getUsersByUsername(string).subscribe((userList) => {
      this.foundUsers = [];
      userList.forEach((value) => {
        if (this.userAccess.isFriend(value.id)) {
          this.foundUsers.push({"user": value, "isFriend": true});
        } else {
          this.foundUsers.push({"user": value, "isFriend": false});
        }
      });
    }, (errorStatusCode: number) => {
      if (errorStatusCode === 401) {
        this.userAccess.accessDenied();
      }
      if (errorStatusCode === 400) {
        this.foundUsers = null;
      }
    });
  }

  addInContact(userF, e: Event) {
    const contact = new Contact();
    contact.userId = this.userAccess.getUserId();
    const user = new User();
    user.id = userF.user.id;
    contact.contact = user;
    this.userData.addContact(contact).subscribe((resp) => {
      this.userAccess.addContact(resp.json());
      this.userAccess.addContactId(userF.user.id);
      userF.isFriend = true;
    }, (errorStatusCode: number) => {
      if (errorStatusCode === 401) {
        this.userAccess.accessDenied();
      }
    });
    e.stopPropagation();
  }

  clickByUser(id: number) {
    this.router.navigate(['/pages/user/' + id]);
    $('#modalOfFindContacts').modal('hide');
  }

}
