import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Task } from './task';

const endpoint = '/api';
const httpOptions = {
	headers: new HttpHeaders({
		'Content-Type': 'application/json'
	})
};

@Injectable({
	providedIn: 'root'
})
export class TasksService {

	constructor(private http: HttpClient) { }

	private extractData(res: Response) {
		let body = res;
		return body || {};
	}
	
	getTasks(): Observable<any> {
		return this.http.get(endpoint + 'lists/getall')
			.pipe(
				catchError(this.handleError<any>('gettasks'))
			)
	}

	getTask(id: number): Observable<Task> {
		return this.http.get<Task>(endpoint + '/lists/gettask?id=' + id)
			.pipe(
				catchError(this.handleError<Task>('gettasks'))
			)
	}

	// getTask(id: number): Observable<any> {
	// 	return this.http.get(endpoint + '/lists/gettask?id=' + id).pipe(
	// 		map(this.extractData));
	// }
	// getTask(id: number): Observable<Task> {
	// 	console.log(endpoint + '/lists/gettask?id=' + id);
	// 	return this.http.get<Task>(endpoint + 'lists/gettask?id=' + id).pipe(
	// 		catchError(this.handleError<Task>(`getTask`))
	// 	);
	// }

	addTask(task: Task): Observable<any> {
		console.log(task);
		return this.http.post<any>(endpoint + 'tasks', JSON.stringify(task), httpOptions).pipe(
			tap((task) => console.log(`added task w/ id=${task.id}`)),
			catchError(this.handleError<any>('addtask'))
		);
	}

	updateTask(id, task): Observable<any> {
		return this.http.put(endpoint + 'tasks/' + id, JSON.stringify(task), httpOptions).pipe(
			tap(_ => console.log(`updated task id=${id}`)),
			catchError(this.handleError<any>('updatetask'))
		);
	}

	deleteTask(id): Observable<any> {
		return this.http.delete<any>(endpoint + 'tasks/' + id, httpOptions).pipe(
			tap(_ => console.log(`deleted task id=${id}`)),
			catchError(this.handleError<any>('deletetask'))
		);
	}
	private handleError<T>(operation = 'operation', result?: T) {
		return (error: any): Observable<T> => {

			// TODO: send the error to remote logging infrastructure
			console.error(error); // log to console instead

			// TODO: better job of transforming error for user consumption
			console.log(`${operation} failed: ${error.message}`);

			// Let the app keep running by returning an empty result.
			return of(result as T);
		};
	}
}
