import { Component, computed, inject, signal } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { finalize } from 'rxjs';
import { LanguageToolMatch, TaskTitleValidator } from '../task-title-validator';
import { TaskService } from '../task.service';

type TaskFilter = 'all' | 'active' | 'completed';

const sentenceLikeValidator: ValidatorFn = (
  control: AbstractControl,
): ValidationErrors | null => {
  const words = String(control.value ?? '').match(
    /\p{L}[\p{L}\p{M}]*(?:['’-]\p{L}[\p{L}\p{M}]*)*/gu,
  );

  return words && words.length >= 2 ? null : { sentenceLike: true };
};

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [ReactiveFormsModule],
  styleUrl: './task-list.css',
  templateUrl: './task-list.html',
})
export class TaskListComponent {
  private readonly taskService = inject(TaskService);
  private readonly taskTitleValidator = inject(TaskTitleValidator);

  readonly checkingGrammar = signal(false);
  readonly grammarIssue = signal<LanguageToolMatch | null>(null);
  readonly grammarCheckUnavailable = signal(false);
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
      validators: [
        Validators.required,
        Validators.minLength(3),
        sentenceLikeValidator,
      ],
    }),
  });

  setFilter(filter: TaskFilter): void {
    this.filter.set(filter);
  }

  addTask(): void {
    if (this.form.invalid || this.checkingGrammar()) {
      return;
    }

    this.grammarIssue.set(null);
    this.grammarCheckUnavailable.set(false);
    this.checkingGrammar.set(true);

    const title = this.form.controls.title.value.trim();
    this.taskTitleValidator
      .check(title)
      .pipe(finalize(() => this.checkingGrammar.set(false)))
      .subscribe({
        next: (issue) => {
          if (issue) {
            this.grammarIssue.set(issue);
            return;
          }

          this.taskService.add(title);
          this.form.reset();
        },
        error: () => this.grammarCheckUnavailable.set(true),
      });
  }

  clearGrammarFeedback(): void {
    this.grammarIssue.set(null);
    this.grammarCheckUnavailable.set(false);
  }

  toggleTask(id: number): void {
    this.taskService.toggle(id);
  }

  removeTask(id: number): void {
    this.taskService.remove(id);
  }
}
