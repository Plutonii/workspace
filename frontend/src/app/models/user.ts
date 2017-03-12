export class User {
    id:number;
    username:string;
    email:string;
    password:string;

    cloneOfObjectToUser(o:any): void {
        if (!o) return;
        this.id = o.id;
        this.email = o.email;
        this.username = o.username;
        this.password = o.password;
    }
}