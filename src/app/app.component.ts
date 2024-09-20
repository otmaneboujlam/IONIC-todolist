import { Component } from '@angular/core';
import { Page } from './interfaces/page';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor() {}

  appPages: Page[] = [
    {
      title: 'Home',
      url: '/home',
      icon: 'home',
    },
    {
      title: 'Todo list',
      url: '/todos',
      icon: 'people',
    },
  ];
}
