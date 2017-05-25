import {User} from "./user";
import {Label} from './label';

export class Task {
  id: number;
  title: string;
  description: string;
  projectId: number;
  completed: boolean;
  user: User;
  labels: Array<Label>;

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
    const index: number = array.findIndex((value) => {
      if (value.id === this.id) return true;
    });
    if (index !== -1) {
      array.splice(index, 1);
    }
  }
}
