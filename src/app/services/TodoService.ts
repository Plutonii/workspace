import {Todo} from "../models/todo.model";
export class TodoService {
    private todos: Todo[];

    getTasks(): Todo[] {
        let data = localStorage.getItem("ws-todos");
        if (data === null|| data === "undefined") {
            this.todos = [];
            return;
        }
        this.todos = JSON.parse(data);
        return this.todos;
    }

    addTask(todo: Todo): void {
        this.todos.push(todo);
        this.updateTodos();
    }

    removeTask(todo: Todo): void {
        this.todos.splice(this.todos.indexOf(todo), 1);
        this.updateTodos();
    }

    qwerrr(): void {
        console.dir(this.todos);
    }

    updateTodos(): void {
        var that = this;
        setTimeout(function () {
            localStorage.setItem("ws-todos", JSON.stringify(that.todos));
        }, 4);
    }
}