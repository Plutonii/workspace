export class UserProfile {
    id:number;
    username:string;
    email:string;
    avatar:string;
    numberOfTasks:number;
    numberOfCompletedTasks:number;
    numberOfProjects:number;
    numberOfContacts:number;

    cloneOfObjectToUser(o:any): void {
        if (!o) return;
        this.id = o.id;
        this.email = o.email;
        this.username = o.username;
    }
}