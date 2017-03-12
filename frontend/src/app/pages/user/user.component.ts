import {Component, OnInit} from '@angular/core';
import {UserProfile} from "../../models/user-profile";
import {UserAccessService} from "../../services/user-access.service";

@Component({
    selector: 'ws-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

    private user:UserProfile;

    private authUserId:number;

    constructor(private userAccess:UserAccessService) {
        this.user= new UserProfile();
        this.user.id = 777;
        this.user.username = "bot";
        this.user.email = "email@mail.ru"
        this.user.numberOfCompletedTasks = 75;
        this.user.numberOfTasks = 100;
        this.user.numberOfProjects = 10;
        this.user.numberOfContacts = 25;
    }

    ngOnInit() {
        this.authUserId = this.userAccess.getUserId();
    }

}