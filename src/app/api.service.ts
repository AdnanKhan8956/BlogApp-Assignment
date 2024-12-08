import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl = 'https://localhost:7282/api';

  constructor(private http: HttpClient) {}

  
  getData(endpoint: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${endpoint}`).pipe(
      catchError((error) => {
        console.error('API Error:', error);
        return throwError(() => error);
      })
    );
  }
  postData(endpoint: string, payload: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/${endpoint}`, payload).pipe(
      catchError(this.handleError)
    );
  }

  
  putData(endpoint: string, payload: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${endpoint}`, payload).pipe(
      catchError(this.handleError)
    );
  }

  
  deleteData(endpoint: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${endpoint}`).pipe(
      catchError(this.handleError) 
    );
  }

 
  private handleError(error: any) {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}
