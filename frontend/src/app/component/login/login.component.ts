import {Component, OnInit} from '@angular/core';
import {User} from "../../model/user";
import {UserAccessService} from "../../service/user-access.service";

@Component({
    selector: 'ws-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    private user:User;

    constructor(private accessService: UserAccessService) {
        this.user = new User();
        this.user.username = '';
        this.user.password = '';
    }

    ngOnInit() {
    }

    registration(): void {
        this.accessService.registration(this.user).subscribe((data) => {
            console.log("success in Reg" + data);
        }, (error:any) => {
            console.log("error in Reg" + error);
        });
    }

    login(){
        this.accessService.login(this.user).subscribe((data)=>{
            console.log(data);
        }, (error:any) =>{
            console.log("error in Log" + error);
        });     
        console.log("end");
    }
}
