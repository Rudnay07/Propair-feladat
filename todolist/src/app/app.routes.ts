import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { TaskListComponentComponent as TaskListComponent } from './pages/task-list-component/task-list-component.component';

import { NewTaskComponent } from './pages/new-task-component/new-task-component.component';
import { NgModule } from '@angular/core';

export const routes: Routes = [
    {
        path: '',
        redirectTo: '/task-list',
        pathMatch: 'full'
    },
    { path: 'task-list', component: TaskListComponent },
    { path: "new-task", component: NewTaskComponent},
    { path: 'not-found', component: NotFoundComponent },
    { path: '**', redirectTo: '/not-found' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
