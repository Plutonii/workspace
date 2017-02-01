import {Component, OnInit} from "@angular/core";
import {Todo} from "../../../../models/todo.model";
import {TodoService} from "../../../../services/TodoService";


@Component({
    selector: 'ws-todo-view',
    templateUrl: './todo.component.html',
    styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {

    todos: Todo[];

    constructor(private todoService: TodoService) {
    }

    ngOnInit(): void {
        this.todos = this.todoService.getTasks();
    }

    deleteTask(todo: Todo): void {
        this.todoService.removeTask(todo);
    }
}