import { Component, OnInit } from '@angular/core';

import { TasksService } from '../tasks.service';
import { Task } from '../task';

@Component({
	selector: 'app-tasks',
	templateUrl: './tasks.component.html',
	styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

	tasks: Task[];
	countPage: Number;
	pages : Number[];

	constructor(
		private tasksService: TasksService
	) { }

	ngOnInit() {
		this.getTasks()
	}
	getTasks(): void {
		this.tasksService.getTasks()
			.subscribe(
				tasks => {
					this.tasks = tasks.slice(0,10);
					this.pages=[];
					this.countPage = tasks.length/10;
					for( var i=1;i<=this.countPage;i++){
						this.pages[i-1]=i;	
					}
				}
			)
	}
	partionPage(start: number): void {
		this.tasksService.getTasks()
			.subscribe(
				tasks =>{
					console.log(start);
					this.tasks = tasks.slice((start-1)*10, start * 10)
				}
			)
	}
}
