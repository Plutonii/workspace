import {Component, OnInit} from "@angular/core";
import {Todo} from "../../../../../models/todo.model";
import {TodoService} from "../../../../../services/TodoService";


@Component({
    selector: 'ws-list-todo',
    templateUrl: './list-todo.component.html',
    styleUrls: ['./list-todo.component.css']
})
export class ListTodoComponent implements OnInit {

    todos: Todo[];

    constructor(private todoService: TodoService) {
    }

    ngOnInit(): void {
        this.todos = this.todoService.getTasks();
    }

    deleteTask(todo: Todo): void {
        this.todoService.removeTask(todo);
    }

    saveCompleted():void{
        this.todoService.updateTodos();
    }
}