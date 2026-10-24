import { Component, computed, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TaskService } from '../task.service';

type TaskFilter = 'all' | 'active' | 'completed';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [ReactiveFormsModule],
  styleUrl: './task-list.css',
  templateUrl: './task-list.html',
})
export class TaskListComponent {
  private readonly taskService = inject(TaskService);

  readonly tasks = this.taskService.tasks;
  readonly filter = signal<TaskFilter>('all');
  readonly taskCounts = computed(() => {
    const tasks = this.tasks();
    const completed = tasks.filter((task) => task.done).length;

    return {
      all: tasks.length,
      active: tasks.length - completed,
      completed,
    };
  });
  readonly remaining = computed(() => this.taskCounts().active);
  readonly visibleTasks = computed(() => {
    const selectedFilter = this.filter();

    return this.tasks().filter((task) => {
      if (selectedFilter === 'active') {
        return !task.done;
      }

      if (selectedFilter === 'completed') {
        return task.done;
      }

      return true;
    });
  });
  readonly form = new FormGroup({
    title: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(3)],
    }),
  });

  setFilter(filter: TaskFilter): void {
    this.filter.set(filter);
  }

  addTask(): void {
    if (this.form.invalid) {
      return;
    }

    this.taskService.add(this.form.controls.title.value);
    this.form.reset();
  }

  toggleTask(id: number): void {
    this.taskService.toggle(id);
  }

  removeTask(id: number): void {
    this.taskService.remove(id);
  }
}
