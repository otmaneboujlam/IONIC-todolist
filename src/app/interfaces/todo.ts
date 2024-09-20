export interface Todo {
  id: string;
  title?: string;
  body?: string;
  status?: 'Waiting' | 'InProgress' | 'Finished';
  priority?: 'Low' | 'Medium' | 'Hight';
}
