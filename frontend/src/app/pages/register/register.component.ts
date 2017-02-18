import {Component, OnInit} from '@angular/core';
import {User} from "../../models/user";
import {Router} from "@angular/router";
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import {EqualPasswordsValidator} from "./equalPasswordsValidator";

@Component({
    selector: 'ws-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

    private user: User;
    private repeatPassword: string
    regForm: FormGroup;

    constructor(private router: Router,
                private fb: FormBuilder) {
        this.user = new User;
        this.regForm = fb.group({
            emailControl: ['', [Validators.required, Validators.pattern("[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})")]],
            userNameControl: ['', [Validators.required, Validators.minLength(3)]],
            passwords: fb.group({
                passwordControl: ['', [Validators.required, Validators.minLength(5)]],
                repeatPasswordControl: ['', [Validators.required, Validators.minLength(5)]]
            }, {validator: EqualPasswordsValidator.validate('passwordControl', 'repeatPasswordControl')})
        });
    }

    ngOnInit() {
    }

    registration() {
        console.log("OK");
        this.router.navigate(['/pages/projects']);
    }
}
