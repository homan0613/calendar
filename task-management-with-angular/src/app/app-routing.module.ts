import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TaskDetailComponent } from './task-detail/task-detail.component';
import { TasksComponent } from './tasks/tasks.component';

const routes: Routes = [
	{ path: '', redirectTo: '/tasks', pathMatch: 'full' },
	{ path:'detail/:id', component: TaskDetailComponent },
	{ path:'tasks', component: TasksComponent }
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
