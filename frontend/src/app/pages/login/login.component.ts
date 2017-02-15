import {Component, OnInit} from '@angular/core';
import {User} from "../../models/user";
import {UserAccessService} from "../../services/user-access.service";
import {Router} from "@angular/router";

@Component({
    selector: 'ws-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    private user:User;

    constructor(private accessService: UserAccessService, private router:Router) {
        this.user = new User();
        this.user.username = '';
        this.user.password = '';
    }

    ngOnInit() {
    }

    registration(): void {
        /*this.accessService.registration(this.user).subscribe((data) => {
            console.log("success in Reg" + data);
        }, (error:any) => {
            console.log("error in Reg" + error);
        });*/
    }

    login(){
        this.accessService._isAuthorized = true;
        console.log(this.accessService.redirectUrl);
        this.router.navigate([this.accessService.redirectUrl]);
        // this.accessService.login(this.user).subscribe((data)=>{
        //     console.log(data);
        // }, (error:any) =>{
        //     console.log("error in Log" + error);
        // });
        // console.log("end");
    }
}
