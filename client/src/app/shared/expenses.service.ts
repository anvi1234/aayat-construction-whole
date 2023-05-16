import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class ExpensesService {
  public selectedSiteAmoount = new BehaviorSubject<any>(null)
  public selectedIdAfterSavingData = new BehaviorSubject<any>(null)
  totalTransSUbject = new BehaviorSubject(null);
  totalExpenseSubject = new BehaviorSubject<any>(null);
  totalSiteSubject = new BehaviorSubject(null)
  baseUri:string = environment.apiBaseUrl;
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) { 
    this.getExpenses() 
  }

 
  createExpenses(data:any): Observable<any> {
    let url = `${this.baseUri}/expense/add-expense`;
    return this.http.post(url, data)
      .pipe(
        catchError(this.errorMgmt)
      )
  }

  // Get all employees
  getExpenses() {
    this.http.get(`${this.baseUri}/expense/getExpenses`).subscribe((res:any)=>{
      this.totalExpenseSubject.next(res);
    });
  }

  // Get employee
  getExpensesById(id:any): Observable<any> {
    let url = `${this.baseUri}/expense/getExpensesById/${id}`;
    return this.http.get(url, {headers: this.headers}).pipe(
      map((res:any) => {
        return res;
      }),
      catchError(this.errorMgmt)
    )
  }

  // Update employee
  updateExpenses(id:any, data:any): Observable<any> {
  
    let url = `${this.baseUri}/expense/updateExpenses/${id}`;
    return this.http.put(url, data, { headers: this.headers }).pipe(
      catchError(this.errorMgmt)
    )
  }

  updateMultipleExpenses(data:any): Observable<any> {
    let url = `${this.baseUri}/expense/updateMultipleExpenses`;
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        "Access-Control-Allow-Origin": "*",
        
      } ),responseType: 'text' as 'json'
    };
    return this.http.put(url, data,httpOptions).pipe(
      catchError(this.errorMgmt)
    )
  }


  // Delete employee
  deleteEmployee(id:any): Observable<any> {
    let url = `${this.baseUri}/expense/deleteExpenses/${id}`;
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

  getExpensesByQuery(id:any): Observable<any> {
  // let parameters = {"siteName":siteName, "location":location};
    // let queryParams = new HttpParams({ fromObject: parameters });
    let url = `${this.baseUri}/expense/getexpensesByQuery/${id}`;
    return this.http.get(url, {headers: this.headers}).pipe(
      map((res:any) => {
        return res;
      }),
     
    )
  }

  getTotalExpensesByQuery(data:any): Observable<any> {
    let url = `${this.baseUri}/expense/gettotalexpensesByQuery`;
    const parameters = {sitename:data.siteName,location:data.location,status:data.status}
    return this.http.post(url,  parameters).pipe(catchError(this.errorMgmt));       
  }
}
 