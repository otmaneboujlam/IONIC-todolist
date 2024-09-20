import { TestBed } from '@angular/core/testing';

import { TodoObservableService } from './todo-observable.service';

describe('TodoObservableService', () => {
  let service: TodoObservableService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TodoObservableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
