# Todo List App — Project Context

## 1. Project Goal

Build a polished, production-minded Todo List application with a modern, engaging user interface. The experience should feel like a premium productivity SaaS product: clean, responsive, fast, accessible, and delightful to use.

Prioritize a usable task workflow over decorative effects. Animations should reinforce actions and hierarchy rather than distract from completing tasks.

## 2. Core Requirements

### Task model

Each task must have:
- `id`: stable unique identifier
- `title`: required task title
- `done`: completion status

Recommended optional fields for a more complete UI:
- `description`
- `priority`: low, medium, high
- `dueDate`
- `createdAt`
- `category` or `projectId`

Keep the core model simple if this is being built for the Angular assessment. Do not add optional fields unless the scope allows them.

### Required task actions
- Add a task
- Mark a task complete/incomplete
- Delete a task
- Display the number of remaining tasks
- Show a useful empty state
- Validate task titles (required, minimum 3 characters)
- Disable submission when the form is invalid
- Show validation feedback only after the field has been touched
- Reset the form after successful task creation

### Optional enhancements
- Edit a task
- Search and filter tasks
- Filter by All / Active / Completed
- Sort by creation date, due date, or priority
- Confirmation or undo for deletion
- Persist tasks in local storage or a backend
- Load initial tasks from `GET /api/tasks`, with loading and error states

Do not implement optional features at the expense of the required assessment criteria.

## 3. Technology Direction

### Framework
- Use the framework already present in the repository. If this project is the Angular assessment, use **Angular standalone components**, **Signals**, **Reactive Forms**, and Angular's built-in control flow (`@if`, `@for`, `@empty`).
- Do not silently switch to React or Next.js.
- If the repository is a fresh project and the user has not specified a framework, ask before choosing one.

### UI component libraries
Use these libraries as visual references or installable options, after checking compatibility with the current framework:

- **Magic UI** — animated UI examples and decorative components.
- **NextUI / HeroUI** — modern interface components primarily designed for React ecosystems; do not assume direct Angular compatibility.
- **shadcn/ui** — customizable React components; use as a design reference for Angular unless the project already has a compatible alternative.
- **Angular Material** — Angular-native accessible components and theming.
- **PrimeNG** — Angular-native component library with a broad component set.
- **Tailwind CSS** — utility-first styling if already configured or intentionally added.
- **Lucide icons** — use consistent, meaningful icons; select an Angular-compatible package if working in Angular.

Do not add multiple overlapping UI libraries just to use their names. Choose a coherent stack that works with the repository and keeps the bundle manageable.

### Animation libraries
Potential options:
- **GSAP** — timeline-based motion for complex sequences, scroll-triggered effects, and precise orchestration.
- **Motion / Framer Motion** — Framer Motion is primarily React-oriented; do not use it directly in Angular. For Angular, prefer native Angular animations where supported, CSS transitions/keyframes, or a framework-compatible motion library.
- **Angular animations** — use when supported by the project's Angular version and setup.
- **CSS transitions and keyframes** — ideal for hover states, button feedback, small reveals, and simple UI motion.

Before installing any dependency:
1. Inspect `package.json` and the existing project structure.
2. Verify framework and version compatibility.
3. Prefer the smallest dependency set that satisfies the design.
4. Keep lockfiles in sync and explain any setup steps.

## 4. Visual Design Direction

Create a premium productivity dashboard with a clear visual hierarchy.

### Overall aesthetic
- Modern, minimal, confident, and slightly playful.
- Generous spacing, crisp typography, subtle borders, soft shadows, and restrained gradients.
- Use a consistent spacing scale and design tokens.
- Avoid excessive glassmorphism, neon effects, heavy blur, oversized gradients, and constant movement.
- Ensure text contrast and clear focus indicators.

### Suggested layout
1. **App shell / sidebar (desktop)**
   - Product mark and app name.
   - Navigation: Inbox, Today, Upcoming, Completed (only implement views that work).
   - Optional project/category list.
   - Settings/profile area only if it has real functionality.

2. **Main task workspace**
   - Header with page title, short helpful subtitle, and remaining-task count.
   - Prominent add-task form.
   - Filter tabs: All, Active, Completed.
   - Task list with a strong distinction between active and completed tasks.
   - Empty, loading, and error states.

3. **Responsive mobile layout**
   - Collapse the sidebar into a compact header or drawer.
   - Keep the add-task action easy to reach.
   - Prevent horizontal overflow.
   - Make controls comfortable to tap.

### Suggested design tokens
Adjust these to match the existing brand and theme.

```css
:root {
  --color-bg: #f7f8fc;
  --color-surface: #ffffff;
  --color-text: #171923;
  --color-muted: #687083;
  --color-border: #e6e8ef;
  --color-primary: #635bff;
  --color-primary-hover: #5148e5;
  --color-success: #198754;
  --color-danger: #d64545;
  --radius-card: 16px;
  --radius-control: 10px;
  --shadow-card: 0 8px 28px rgb(20 25 45 / 7%);
}
```

Use CSS variables rather than scattering literal colors throughout components. Support dark mode only if it can be implemented consistently.

## 5. UI Component Requirements

Build reusable, focused components where appropriate:

- `AppShell` / application layout
- `TaskForm` / task creation form
- `TaskList` / task collection
- `TaskItem` / individual task row
- `TaskFilters` / filter controls
- `EmptyState`
- `LoadingState`
- `ErrorMessage`

For Angular, use standalone components where that matches the existing project. Keep task state and business rules in a service or a clearly defined state layer; keep presentation components focused on rendering and user interaction.

### Interaction details
- Checkbox completion should have immediate visual feedback.
- Completed tasks should be visibly distinct, for example with muted text and a line-through.
- Delete should be clear and keyboard accessible.
- Show a concise confirmation or an undo option if deletion could cause accidental loss.
- Forms must support keyboard submission.
- Provide visible hover, focus, active, disabled, loading, and error states.

## 6. Motion and Animation Guidelines

Use motion to clarify state changes and make the app feel responsive.

### Good places for animation
- Short fade/slide when a task enters the list.
- Subtle completion transition when checking a task.
- Smooth filter-state changes.
- Small button press feedback.
- A restrained initial page reveal.
- Optional animated progress indicator for remaining tasks.

### Motion rules
- Keep most micro-interactions around 120–250 ms.
- Use consistent easing; avoid springy motion for every element.
- Do not animate every item continuously.
- Avoid scroll-triggered animation for core task controls.
- Respect `prefers-reduced-motion`.
- Animation must not delay task interaction or hide content from assistive technology.

### Library selection
- For an Angular project, begin with CSS transitions and Angular-compatible animation support.
- Add GSAP only if a real requirement needs complex timelines or scroll choreography.
- Do not add Framer Motion to an Angular app; it is React-oriented.
- For a React project, Motion / Framer Motion can be used for list transitions and layout animations, while GSAP can be reserved for complex sequences. Avoid using both for the same interaction.

## 7. Accessibility and Responsive Quality

- Use semantic HTML (`main`, `nav`, `form`, `label`, `button`, `ul`, `li`).
- Every input must have an accessible label.
- Do not rely on color alone to communicate completion or errors.
- Ensure keyboard navigation and visible focus styles.
- Use appropriate ARIA attributes only when native semantics are insufficient.
- Respect reduced-motion preferences.
- Check the layout at narrow mobile, tablet, and desktop widths.
- Maintain readable contrast and scalable text.

## 8. Data and Error Handling

- Keep updates immutable.
- Use stable task IDs; do not use array indexes as identity keys.
- Represent loading, success, empty, and error states explicitly when using an API.
- Always reset loading state on both success and failure, for example with RxJS `finalize()` in Angular.
- Avoid claiming API persistence if the app only stores tasks in memory.
- If local storage is added, handle malformed or unavailable storage safely.
- If the backend is not available, provide a clear error state and a sensible development workflow.

## 9. Angular Assessment Compatibility

If this is for the supplied Angular assessment, the implementation must visibly satisfy these criteria:

1. `Task` interface with `id: number`, `title: string`, and `done: boolean`.
2. `TaskService` with `providedIn: 'root'`.
3. Private writable signal and public read-only signal.
4. Immutable `add(title)`, `toggle(id)`, and `remove(id)` operations.
5. Standalone `TaskListComponent` injecting the service with `inject()`.
6. Reactive form with a title control, `Validators.required`, and `Validators.minLength(3)`.
7. Validation message shown only after the title control is touched.
8. Add button disabled while the form is invalid.
9. Form reset after a successful addition.
10. `@for` with `track task.id` and an `@empty` state.
11. Checkbox toggles task completion; delete button removes a task.
12. `[class.done]="task.done"` or an equivalent explicit class binding.
13. `computed()` signal for remaining tasks.
14. Optional API bonus: GET `/api/tasks`, visible loading/error states, and loading reset on success and failure.

Do not replace the required Angular constructs with a third-party state library.

## 10. Quality Checklist

Before considering the feature complete, verify:

- [ ] The app starts with the documented command.
- [ ] A task cannot be submitted with a blank or fewer-than-3-character title.
- [ ] Validation feedback appears only after touch.
- [ ] Adding a task creates a unique stable ID and resets the form.
- [ ] Completion can be toggled repeatedly.
- [ ] Deleting a task removes the correct task.
- [ ] Remaining count updates immediately.
- [ ] Empty state appears when no tasks exist.
- [ ] Loading and error states work if an API is used.
- [ ] The UI is responsive and keyboard accessible.
- [ ] Animations are subtle and respect reduced-motion preferences.
- [ ] Dependencies match the project's framework and versions.
- [ ] Required assessment criteria remain satisfied.

## 11. Implementation Workflow

1. Inspect the repository and identify framework, versions, styling setup, and existing components.
2. Preserve existing conventions and avoid unnecessary rewrites.
3. Implement the task model and state/service layer first.
4. Implement the form, list, and required task actions.
5. Add the visual system and responsive layout.
6. Add purposeful animations after core functionality works.
7. Add API loading/error handling only if the endpoint exists or is part of the agreed scope.
8. Run the project and fix type, build, accessibility, and runtime issues.
9. Summarize changed files, dependencies, run commands, and any remaining limitations.

## 12. Definition of Done

The result should be visually polished and genuinely functional—not just a static mockup. All required task actions must work, the layout must be responsive, motion must be purposeful, and the implementation must remain compatible with the existing framework. For an Angular assessment, preserving the rubric requirements takes priority over using any particular UI or animation library.
