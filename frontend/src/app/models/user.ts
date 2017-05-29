import {computeMsgId} from "@angular/compiler/src/i18n/digest";
export class User {
    id: number;
    username: string;
    email: string;
    password: string;
    contactsId: Array<number>;

    cloneOfObjectToUser(o: any): void {
        if (!o) return;
        this.id = o.id;
        this.email = o.email;
        this.username = o.username;
        this.password = o.password;
        this.contactsId = [];
    }

    constructor() {
        this.contactsId = [];
    }
}
