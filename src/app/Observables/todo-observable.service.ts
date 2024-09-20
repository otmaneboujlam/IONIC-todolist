import { Injectable } from '@angular/core';
import { Todo } from '../interfaces/todo';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TodoObservableService {
  todosSub = new BehaviorSubject<Todo[]>([]);

  constructor() {}

  publier(todos: Todo[]): void {
    this.todosSub.next(todos);
  }

  abonner(): Observable<Todo[]> {
    return this.todosSub.asObservable();
  }
}
