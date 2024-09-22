import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { TaskListComponentComponent as TaskListComponent } from './pages/task-list-component/task-list-component.component';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    TaskListComponent // Include TaskListComponent in the providers
  ]
};
