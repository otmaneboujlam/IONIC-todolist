import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  ActionSheetController,
  AlertController,
  ToastController,
} from '@ionic/angular';
import { Todo } from '../interfaces/todo';
import { TodoService } from '../providers/todo.service';
import { TodoObservableService } from '../Observables/todo-observable.service';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.page.html',
  styleUrls: ['./todos.page.scss'],
})
export class TodosPage implements OnInit {
  constructor(
    private toastController: ToastController,
    private alertController: AlertController,
    private todoService: TodoService,
    private actionSheetCtrl: ActionSheetController,
    private todoObservableService: TodoObservableService,
    private router: Router
  ) {}

  todos!: Todo[];

  ngOnInit(): void {
    this.todoService.getAll();
    this.todoObservableService.abonner().subscribe({
      next: (value: Todo[]) => (this.todos = value),
    });
  }

  deleteTodo = (todo: Todo) => {
    this.todoService.removeOne(todo);
    this.presentToast(todo);
  };

  updateStatusTodo = (
    todo: Todo,
    status: 'Waiting' | 'InProgress' | 'Finished'
  ) => {
    this.todoService.updateOne(todo, status);
  };

  async presentToast(todo: Todo) {
    const toast = await this.toastController.create({
      message: `${todo.id} : ${todo.title} a été supprimé.`,
      position: 'top',
      duration: 3000,
    });
    await toast.present();
  }

  async presentActionSheet(todo: Todo) {
    const actionSheet = await this.actionSheetCtrl.create({
      header: `${todo.id} : ${todo.title}`,
      buttons: [
        {
          text: 'Delete',
          role: 'destructive',
          icon: 'trash',
          handler: () => this.presentDeleteAlert(todo),
        },
        {
          text: 'In Progress',
          role: 'destructive',
          icon: 'construct-outline',
          handler: () => this.updateStatusTodo(todo, 'InProgress'),
        },
        {
          text: 'Waiting',
          role: 'destructive',
          icon: 'eye',
          handler: () => this.updateStatusTodo(todo, 'Waiting'),
        },
        {
          text: 'Finished',
          role: 'destructive',
          icon: 'checkmark-done-outline',
          handler: () => this.updateStatusTodo(todo, 'Finished'),
        },
        {
          text: 'Cancel',
          role: 'cancel',
          icon: 'close',
          handler: () => {},
        },
      ],
    });

    await actionSheet.present();
  }

  showInfo(todo: Todo) {
    this.todoService.setCurrentTodo(todo);
    this.router.navigateByUrl('todo');
  }

  async presentDeleteAlert(todo: Todo) {
    const alert = await this.alertController.create({
      header: 'Supprimer cette todo ?',
      subHeader: `${todo.id} : ${todo.title}`,
      message: 'Cette opération ne pourra être annuler.',
      buttons: [
        {
          text: 'Supprimer',
          handler: () => this.deleteTodo(todo),
        },
        {
          text: 'Non',
          role: 'cancel',
        },
      ],
    });

    await alert.present();
  }
}
