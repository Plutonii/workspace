import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {AppComponent} from './components/app/app.component';
import {TodoComponent} from "./components/app/main-content/todo/todo.component";
import {HeaderComponent} from "./components/app/header/header.component";
import {MenuComponent} from "./components/app/left-menu/menu.component";
import {MainContentComponent} from "./components/app/main-content/main-content.component";
import {InputNewTaskComponent} from "./components/app/main-content/todo/input-new-task/input-new-task.component";
import {TodoService} from "./services/TodoService";
import {ListTodoComponent} from "./components/app/main-content/todo/list-todos/list-todo.component";
import {Routes, RouterModule} from '@angular/router';
import {EditTaskComponent} from "./components/app/main-content/todo/editTask/edit-task.component";

const appRoutes: Routes = [
    {path: 'edit-task', component: EditTaskComponent},
    {path: 'todo', component: TodoComponent}
];

@NgModule({
    declarations: [
        AppComponent,
        TodoComponent,
        HeaderComponent,
        MenuComponent,
        MainContentComponent,
        InputNewTaskComponent,
        ListTodoComponent,
        EditTaskComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        RouterModule.forRoot(appRoutes)
    ],
    providers: [TodoService],
    bootstrap: [AppComponent]
})
export class AppModule {

}
