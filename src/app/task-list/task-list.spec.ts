import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TaskListComponent } from './task-list';

describe('TaskListComponent task title validation', () => {
  let httpTesting: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskListComponent],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();

    httpTesting = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTesting.verify();
  });

  it('rejects a single random-looking word', () => {
    const fixture = TestBed.createComponent(TaskListComponent);
    const title = fixture.componentInstance.form.controls.title;

    title.setValue('efhefe');

    expect(title.hasError('sentenceLike')).toBe(true);
    expect(title.invalid).toBe(true);
  });

  it('checks a valid title only after submit and adds it when no issues are found', async () => {
    const fixture = TestBed.createComponent(TaskListComponent);
    const component = fixture.componentInstance;
    const title = component.form.controls.title;

    title.setValue('Call Alex');

    httpTesting.expectNone('https://api.languagetool.org/v2/check');
    component.addTask();
    httpTesting.expectOne('https://api.languagetool.org/v2/check').flush({
      matches: [],
    });
    await fixture.whenStable();

    expect(component.tasks()).toHaveLength(1);
    expect(title.value).toBe('');
    expect(title.pristine).toBe(true);
  });

  it('shows a LanguageTool issue and suggestion without adding the task', async () => {
    const fixture = TestBed.createComponent(TaskListComponent);
    const component = fixture.componentInstance;
    const title = component.form.controls.title;

    title.setValue('Calll Alex');

    component.addTask();
    httpTesting.expectOne('https://api.languagetool.org/v2/check').flush({
      matches: [
        {
          message: 'Possible spelling mistake found.',
          replacements: [{ value: 'Call Alex' }],
        },
      ],
    });
    await fixture.whenStable();

    expect(component.grammarIssue()?.message).toBe(
      'Possible spelling mistake found.',
    );
    expect(component.grammarIssue()?.replacements[0]?.value).toBe('Call Alex');
    expect(component.tasks()).toHaveLength(0);
  });

  it('reports when LanguageTool is unavailable', async () => {
    const fixture = TestBed.createComponent(TaskListComponent);
    const component = fixture.componentInstance;
    const title = component.form.controls.title;

    title.setValue('Call Alex');

    component.addTask();
    httpTesting
      .expectOne('https://api.languagetool.org/v2/check')
      .error(new ProgressEvent('error'));
    await fixture.whenStable();

    expect(component.grammarCheckUnavailable()).toBe(true);
    expect(component.tasks()).toHaveLength(0);
  });
});
