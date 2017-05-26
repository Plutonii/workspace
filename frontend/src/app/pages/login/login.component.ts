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

    private user: User;
    loginForm: FormGroup;
    private messageError:string;

    constructor(private accessService: UserAccessService,
                private router: Router,
                private fb: FormBuilder) {
        this.user = new User();
        this.loginForm = this.fb.group({
            userNameControl: ['', Validators.required],
            passwordControl: ['', [Validators.required, Validators.minLength(5)]]
        });
    }

    ngOnInit() {
    }

    login() {
        this.accessService.login(this.user).subscribe((data) => {
          if (this.accessService.redirectUrl){
            this.router.navigate([this.accessService.redirectUrl]);
          } else {
            this.router.navigate(['/page']);
          }
        }, (error: string) => {
            this.messageError = error;
        });
    }
}
