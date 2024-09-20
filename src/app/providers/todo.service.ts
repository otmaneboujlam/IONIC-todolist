import { Todo } from '../interfaces/todo';
import { TodoObservableService } from './../Observables/todo-observable.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  constructor(private todoObservableService: TodoObservableService) {}

  currentTodo!: Todo;

  todos: Todo[] = [
    { id: '1', title: 'Sport', status: 'InProgress' },
    { id: '2', title: 'Courses', status: 'Waiting' },
    { id: '3', title: 'Recherche' },
    { id: '4', title: '' },
    { id: '5' },
  ];

  getAll = () => {
    this.todoObservableService.publier(this.todos);
  };

  removeOne = (todo: Todo) => {
    this.todos = this.todos.filter((t) => t !== todo);
    this.getAll();
  };

  updateOne = (todo: Todo, status: 'Waiting' | 'InProgress' | 'Finished') => {
    let todoIndex: number = this.todos.findIndex((t) => t === todo);
    if (todoIndex > -1) {
      this.todos[todoIndex].status = status;
      this.getAll();
    }
  };

  setCurrentTodo(todo: Todo) {
    this.currentTodo = todo;
  }
  getCurrentTodo(): Todo {
    return this.currentTodo;
  }
}
