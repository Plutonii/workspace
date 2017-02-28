import {User} from "./user";
export class Project {
    id: number;
    title: string;
    description: string;
    user: User;
    numberOfUsers: number;
    numberOfTasks: number;
    numberOfCompletedTasks: number;

    cloneOfObjectToProject(o:any): void {
        this.id = o.id;
        this.title = o.title;
        this.description = o.description;
        this.numberOfTasks = o.numberOfTasks;
        this.numberOfCompletedTasks = o.numberOfCompletedTasks;
        this.numberOfUsers = o.numberOfUsers;
        this.user = new User();
        this.user.cloneOfObjectToUser(o.user);
    }
}