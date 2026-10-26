import { TestBed } from '@angular/core/testing';
import { TaskListComponent } from './task-list';

describe('TaskListComponent task title validation', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskListComponent],
    }).compileComponents();
  });

  it('rejects a single random-looking word', () => {
    const fixture = TestBed.createComponent(TaskListComponent);
    const title = fixture.componentInstance.form.controls.title;

    title.setValue('efhefe');

    expect(title.hasError('sentenceLike')).toBe(true);
    expect(title.invalid).toBe(true);
  });

  it('accepts a task written as two words', () => {
    const fixture = TestBed.createComponent(TaskListComponent);
    const title = fixture.componentInstance.form.controls.title;

    title.setValue('Call Alex');

    expect(title.valid).toBe(true);
  });
});
