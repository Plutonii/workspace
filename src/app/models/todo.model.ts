export class Todo {
    id: number;
    completed: boolean;
    title: string;
    description: string;

    constructor(title: string) {
        this.id = Math.random();
        this.completed = false;
        this.title = title;
        this.description = "descr";
    }
}