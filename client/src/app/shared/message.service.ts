import { catchError, map, Observable, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams, HttpRequest } from '@angular/common/http';

import { AngularFireMessaging } from '@angular/fire/compat/messaging';
import { BehaviorSubject } from 'rxjs'
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
  })
  
  export class MessageService {
    currentMessage = new BehaviorSubject(null);
   

    baseUri:string = environment.apiBaseUrl;
    headers = new HttpHeaders().set('Content-Type', 'application/json');
    public selectedData = new BehaviorSubject<any>(null)
    constructor(private http: HttpClient) { }
    
    // Create
    createPush(data:any): Observable<any> {
      let url = `${this.baseUri}/push/add-push`;
      return this.http.post(url, data)
        .pipe(
          catchError(this.errorMgmt)
        )
    }
  
    // Get all employees
    getPush() {
      return this.http.get(`${this.baseUri}/push/getpush`);
    }
  
     // Update employee
    updatePush(id:any, data:any): Observable<any> {
      let url = `${this.baseUri}/push/updatePush/${id}`;
      return this.http.put(url, data, { headers: this.headers }).pipe(
        catchError(this.errorMgmt)
      )
    }
  
   
  
    // Error handling 
    errorMgmt(error: HttpErrorResponse) {
      let errorMessage = '';
      if (error.error instanceof ErrorEvent) {
        // Get client-side error
        errorMessage = error.error.message;
      } else {
        // Get server-side error
        errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
      }
      console.log(errorMessage);
      return throwError(errorMessage);
    }
  
 }