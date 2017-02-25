import {Component, OnInit} from '@angular/core';
import {User} from "../../models/user";
import {Router} from "@angular/router";
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import {RegistrationFormValidator} from "./registrationFormValivator";
import {UserAccessService} from "../../services/user-access.service";

@Component({
    selector: 'ws-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

    private user: User;
    private repeatPassword: string
    regForm: FormGroup;
    private messageError:string;

    constructor(private router: Router,
                private fb: FormBuilder,
                private userAccess: UserAccessService) {
        this.user = new User;
        this.regForm = fb.group({
            emailControl: ['', [Validators.required,
                Validators.pattern("[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})"),
                RegistrationFormValidator.validateEmailNotTaken]],
            userNameControl: ['', [Validators.required, Validators.minLength(3)]],
            passwords: fb.group({
                passwordControl: ['', [Validators.required, Validators.minLength(5)]],
                repeatPasswordControl: ['', [Validators.required, Validators.minLength(5)]]
            }, {validator: RegistrationFormValidator.validateEqualsPasswords('passwordControl', 'repeatPasswordControl')})
        });
    }

    ngOnInit() {
    }

    registration() {
        this.userAccess.registration(this.user).subscribe((data) => {
            this.messageError = '';
            this.router.navigate(['/pages']);
        }, (error:string)=>{
            this.messageError = error;
        });
    }
}
