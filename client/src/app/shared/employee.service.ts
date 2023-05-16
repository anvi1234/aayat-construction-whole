import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class EmployeeService {
  
  baseUri:string = environment.apiBaseUrl;
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  attendenceLength = new BehaviorSubject(null)

  constructor(private http: HttpClient) { }

  // Create
  createEmployee(data:any): Observable<any> {
    let url = `${this.baseUri}/users/register`;
    return this.http.post(url, data)
      .pipe(
        catchError(this.errorMgmt)
      )
  }

  // Get all employees
  getEmployee() {
    return this.http.get(`${this.baseUri}/users/getUser`);
  }

  // Get employee
  getEmployeeById(id:any): Observable<any> {
    let url = `${this.baseUri}/users/getUserById/${id}`;
    return this.http.get(url, {headers: this.headers}).pipe(
      map((res:any) => {
        return res;
      }),
      catchError(this.errorMgmt)
    )
  }

  // Update employee
  updateEmployee(id:any, data:any): Observable<any> {
    let url = `${this.baseUri}/users/updateUser/${id}`;
    return this.http.put(url, data, { headers: this.headers }).pipe(
      catchError(this.errorMgmt)
    )
  }

  // Delete employee
  deleteEmployee(id:any): Observable<any> {
    let url = `${this.baseUri}/users/deleteUser/${id}`;
    return this.http.delete(url, { headers: this.headers }).pipe(
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

  createAttendence(data:any): Observable<any> {
    let url = `${this.baseUri}/attendence/add-attendence`;
    return this.http.post(url, data)
      .pipe(
        catchError(this.errorMgmt)
      )
  }

  getAttendById(id:any): Observable<any> {
    let url = `${this.baseUri}/attendence/getAttendenceById/${id}`;
    return this.http.get(url, {headers: this.headers}).pipe(
      map((res:any) => {
        return res;
      }),
      catchError(this.errorMgmt)
    )
  }

  deleteAttendence(id:any): Observable<any> {
    let url = `${this.baseUri}/attendence/deleteAttendecne/${id}`;
    return this.http.delete(url, { headers: this.headers }).pipe(
      catchError(this.errorMgmt)
    )
  }

  updateAttendecne(id:any, data:any): Observable<any> {
    let url = `${this.baseUri}/attendence/updateAttendence/${id}`;
    return this.http.put(url, data, { headers: this.headers }).pipe(
      catchError(this.errorMgmt)
    )
  }
   sendNotification(data:any): Observable<any> {
    let url = "https://fcm.googleapis.com/fcm/send";
   let headersValue = new HttpHeaders({
    'Content-Type':'application/json',
    'Authorization': `key=AAAAfsaQVIc:APA91bG_L3jYVcklJBSMRJH9SeFpJGLH3g-hDkAtknbqmks_F-Nqx_mVdbyxRFPTQHFLuwAA4asTr8S2YmzDItYas3Wl9qJS2QhfAgSqaLzhrgkua3GZfUev_2K5kwII9DIt2d6Vooaj`
   });
   return this.http.post(url, data, { headers: headersValue  }).pipe(
      catchError(this.errorMgmt)
    )
  }
}