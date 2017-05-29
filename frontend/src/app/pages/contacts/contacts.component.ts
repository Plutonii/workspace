import {Component, OnInit} from '@angular/core';
import {UserAccessService} from "../../services/user-access.service";
import {User} from "../../models/user";
import {UserDataService} from "../../services/user-data.service";

@Component({
  selector: 'ws-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {

  private contacts: Array<User>;
  private userId: number;

  constructor(private userAccess: UserAccessService,
              private userData: UserDataService) {
    this.userData.updateContactsIdByUser().subscribe(()=>{
      this.contacts = this.userAccess.getContacts();
    })
  }

  ngOnInit() {
    this.userId = this.userAccess.getUserId();
  }

  removeFromContact(id) {
    this.userData.removeContactByUserId(this.userId, id).subscribe(() => {
      this.userAccess.removeContactById(id);
      this.userAccess.removeContactId(id);
    }, (errorStatusCode: number) => {
      if (errorStatusCode === 401) {
        this.userAccess.accessDenied();
      }
    });
  }

}
