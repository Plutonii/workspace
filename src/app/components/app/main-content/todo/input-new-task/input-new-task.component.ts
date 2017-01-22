import {Component} from "@angular/core";
import {Todo} from "../../../../../models/todo.model";
import {TodoService} from "../../../../../services/TodoService";

@Component({
    selector: 'ws-input-new-task',
    templateUrl: './input-new-task.component.html',
    styleUrls: ['./input-new-task.component.css']
})
export class InputNewTaskComponent {
    newTitle: string;

    constructor(private todoService: TodoService) {
        this.newTitle = '';
    }

    saveNewTask(): void {
        this.todoService.addTask(new Todo(this.newTitle));
        this.newTitle = '';
    }
}