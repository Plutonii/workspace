import {Component, OnInit} from '@angular/core';
import {User} from "../../models/user";
import {UserAccessService} from "../../services/user-access.service";
import {Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
    selector: 'ws-login',
    templateUrl: './login.component.html',
    styleUrls: ['./../register/register.component.css']
})
export class LoginComponent implements OnInit {

    private user:User;
    loginForm:FormGroup;

    constructor(private accessService: UserAccessService,
                private router:Router,
                private fb: FormBuilder) {
        this.user = new User();
        this.loginForm = this.fb.group({
            userNameControl:['', Validators.required],
            passwordControl:['', [Validators.required, Validators.minLength(5)]]
        });
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
        this.router.navigate([this.accessService.redirectUrl]);
        // this.accessService.login(this.user).subscribe((data)=>{
        //     console.log(data);
        // }, (error:any) =>{
        //     console.log("error in Log" + error);
        // });
        // console.log("end");
    }
}
