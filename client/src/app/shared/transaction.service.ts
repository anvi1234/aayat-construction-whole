import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class TransactionService {
  
  baseUri:string = environment.apiBaseUrl;
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  sitesWholeData:any = new BehaviorSubject(null)
  TransactionData = new BehaviorSubject(null)
  constructor(private http: HttpClient) { }

  // Create
  createTransaction(data:any): Observable<any> {
    let url = `${this.baseUri}/transaction/add-transaction`;
    return this.http.post(url, data)
      .pipe(
        catchError(this.errorMgmt)
      )
  }

  // Get all employees
  getTransaction() {
    return this.http.get(`${this.baseUri}/transaction/gettransaction`).subscribe((res:any)=>{
      this.TransactionData.next(res)
    });
  }

  // Get employee
  getTransactionById(id:any): Observable<any> {
    let url = `${this.baseUri}/transaction/gettransactionById/${id}`;
    return this.http.get(url, {headers: this.headers}).pipe(
      map((res:any) => {
        return res;
      }),
      catchError(this.errorMgmt)
    )
  }

  // Update employee
  updateTransaction(id:any, data:any): Observable<any> {
    let url = `${this.baseUri}/transaction/updatetransaction/${id}`;
    return this.http.put(url, data, { headers: this.headers }).pipe(
      catchError(this.errorMgmt)
    )
  }

  // Delete employee
  deleteTransaction(id:any): Observable<any> {
    let url = `${this.baseUri}/transaction/deletetransaction/${id}`;
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
 
  gettransactionByQuery(id:any): Observable<any> {
    let url = `${this.baseUri}/transaction/gettransactionByQuery/${id}`;
    return this.http.get(url, {headers: this.headers}).pipe(
      map((res:any) => {
        return res;
      }),
     
    )
  }
  gettotaltransactionByQuery(data:any) {
    console.log("------",data)  
    let url = `${this.baseUri}/transaction/gettotaltransactionByQuery`;      
    // const parameters = data.map( e =>{
    //   return {sitename:e.siteName,location:e.location}
    // })   
    
    const parameters = {sitename:data.siteName,location:data.location,status:data.status}
    return this.http.post(url,  parameters).pipe(catchError(this.errorMgmt));       
   
   
  }
}