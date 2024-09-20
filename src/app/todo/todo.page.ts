import { Component, OnInit } from '@angular/core';
import { Todo } from '../interfaces/todo';
import { TodoService } from '../providers/todo.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.page.html',
  styleUrls: ['./todo.page.scss'],
})
export class TodoPage implements OnInit {
  todo!: Todo;
  editedTodo!: Todo;

  constructor(private todoService: TodoService) {}

  ngOnInit() {
    this.todo = this.todoService.getCurrentTodo();
    this.editedTodo = Object.assign({}, this.todo);
  }

  save() {
    this.todo.title = this.editedTodo.title;
    this.todo.body = this.editedTodo.body;
    this.todo.status = this.editedTodo.status;
    this.todo.priority = this.editedTodo.priority;
  }

  cancel() {
    this.editedTodo.title = this.todo.title;
    this.editedTodo.body = this.todo.body;
    this.editedTodo.status = this.todo.status;
    this.editedTodo.priority = this.todo.priority;
  }
}
