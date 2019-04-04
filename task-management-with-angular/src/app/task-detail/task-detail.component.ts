import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TasksService } from '../tasks.service';
import { Task } from '../task';
import { Location } from '@angular/common'

@Component({
	selector: 'app-task-detail',
	templateUrl: './task-detail.component.html',
	styleUrls: ['./task-detail.component.css']
})
export class TaskDetailComponent implements OnInit {

	task: Task;
	constructor(
		private route: ActivatedRoute,
		private tasksService: TasksService,
		private location: Location
	) { }

	
	ngOnInit() : void{
		this.getTask();
	}

	getTask(): void {
		const id =  +this.route.snapshot.paramMap.get('id');
		console.log(id);
		this.tasksService.getTask(id)
		.subscribe(t=>{
			this.task = t;
		})
	}
	// getTasks(): void {
	// 	this.tasksService.getTasks()
	// 		.subscribe(
	// 			tasks => this.tasks = tasks
	// 		)
	// }
	goBack(): void {
		this.location.back();
	  }
}