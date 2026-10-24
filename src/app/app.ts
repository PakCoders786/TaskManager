import { Component } from '@angular/core';
import { TaskListComponent } from './task-list/task-list';

@Component({
  imports: [TaskListComponent],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
}
