import { Injectable } from '@angular/core';
import { map, catchError, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable, of } from 'rxjs';

const endpoint = 'http://localhost:8080/pe4j/webapi/';
const httpOptions = {
	headers: new HttpHeaders({
		'Content-Type': 'application/json'
	})
};

 	
@Injectable({
	providedIn: 'root',
})
export class ConfigService {

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

	getTask(id): Observable<any> {
		return this.http.get(endpoint + 'tasks/' + id).pipe(
			map(this.extractData));
	}

	addTask(task): Observable<any> {
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
