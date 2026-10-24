import { Injectable, signal } from '@angular/core';
import { Task } from './task.model';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private readonly taskState = signal<Task[]>([]);
  readonly tasks = this.taskState.asReadonly();
  private nextId = 1;

  add(title: string): void {
    const task: Task = {
      id: this.nextId++,
      title,
      done: false,
    };

    this.taskState.update((tasks) => [...tasks, task]);
  }

  toggle(id: number): void {
    this.taskState.update((tasks) =>
      tasks.map((task) =>
        task.id === id ? { ...task, done: !task.done } : task,
      ),
    );
  }

  remove(id: number): void {
    this.taskState.update((tasks) => tasks.filter((task) => task.id !== id));
  }
}
