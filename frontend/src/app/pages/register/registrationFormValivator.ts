import {FormGroup, FormControl} from '@angular/forms';

export class RegistrationFormValidator {

    public static validateEqualsPasswords(firstField, secondField) {

        return (c:FormGroup) => {

            return (c.controls && c.controls[firstField].value == c.controls[secondField].value) ? null : {
                    passwordsEqual: {
                        valid: false
                    }
                };
        }
    }

    public static validateEmailNotTaken(emailField:FormControl) : {[key:string]:boolean} {
        if (emailField.value !== '12345@rr.rr') return null;
        return {EmailNotTaken: true};
    }

}