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
        this.id = o.user.id;
        this.email = o.user.email;
        this.username = o.user.username;
        this.numberOfTasks = o.userProfile.numberOfTasks;
        this.numberOfCompletedTasks = o.userProfile.numberOfCompletedTasks;
        this.numberOfProjects = o.userProfile.numberOfProjects;
    }
}