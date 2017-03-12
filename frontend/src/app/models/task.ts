import {User} from "./user";
export class Task {
    id: number;
    title: string;
    description: string;
    user: User;
    projectId: number;
    completed: boolean;

    cloneOfObjectToTask(o: any): void {
        this.id = o.id;
        this.title = o.title;
        this.description = o.description;
        this.projectId = o.projectId;
        this.completed = o.completed;
        this.user = new User();
        this.user.cloneOfObjectToUser(o.user);
    }

    deleteInArray(array: Array<Task>) {
        const index:number = array.findIndex((value) => {
            if (value.id === this.id) return true;
        });
        if (index !== -1){
            array.splice(index, 1);
        }
    }
}