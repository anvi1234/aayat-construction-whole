import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class SorService {
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  sorDataForBill = new BehaviorSubject(null);
  sitenameforBill = new BehaviorSubject(null)
  ledgerBill = new BehaviorSubject(null)
  baseUri:string = environment.apiBaseUrl;

   constructor(private http: HttpClient){
}
private handleError(error: HttpErrorResponse): any {
  if (error.error instanceof ErrorEvent) {
    console.error('An error occurred:', error.error.message);
  } else {
    console.error(
      `Backend returned code ${error.status}, ` +
      `body was: ${error.error}`);
  }
  return throwError(
    'Something bad happened; please try again later.');
}
  createSor(data:any): Observable<any> {
    let url = `${this.baseUri}/sor/add-sor`;
    return this.http.post(url, data)
      .pipe(
        catchError(this.errorMgmt)
      )
  }
  
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

  getSOR() {
    return this.http.get(`${this.baseUri}/sor/getSor`);
  }

  updateSOR(id:any, data:any): Observable<any> {
    let url = `${this.baseUri}/sor/updateSor/${id}`;
    return this.http.put(url, data, { headers: this.headers }).pipe(
      catchError(this.errorMgmt)
    )
  }

  createSampleSor(data:any): Observable<any> {
    let url = `${this.baseUri}/sor/add-sample-sor`;
    return this.http.post(url, data)
      .pipe(
        catchError(this.errorMgmt)
      )
  }

  createSorRegSite(data:any): Observable<any> {
    let url = `${this.baseUri}/sor/add-sor-reg-site`;
    return this.http.post(url, data)
      .pipe(
        catchError(this.errorMgmt)
      )
  }

  createSorBill(data:any): Observable<any> {
    let url = `${this.baseUri}/sor/add-bill-sor`;
    return this.http.post(url, data)
      .pipe(
        catchError(this.errorMgmt)
      )
  }

  getSORBill() {
    return this.http.get(`${this.baseUri}/sor/sor-bill`);
  }
  
  getSORRegSite() {
    return this.http.get(`${this.baseUri}/sor/get-sor-reg-site`);
  }
  getSampleSOR() {
    return this.http.get(`${this.baseUri}/sor/getSampleSor`);
  }

  updateSORRegSite(id:any, data:any): Observable<any> {
    let url = `${this.baseUri}/sor/updateSorbyReg/${id}`;
    return this.http.put(url, data, { headers: this.headers }).pipe(
      catchError(this.errorMgmt)
    )
  }
  deleteMB(id:any): Observable<any> {
    const header = new HttpHeaders();
    let url = `${this.baseUri}/sor/delete-sor-mb/${id}`;
    return this.http.delete(url, { headers: header }).pipe(
      catchError(this.handleError)
    )
  }
  deleteBill(id:any): Observable<any> {
    const header = new HttpHeaders();
    let url = `${this.baseUri}/sor/delete-sor-bill/${id}`;
    return this.http.delete(url, { headers: header }).pipe(
      catchError(this.handleError)
    )
  }
  addledger(data:any){
    let url = `${this.baseUri}/ledger/add-ledger`;
    return this.http.post(url, data)
      .pipe(
        catchError(this.errorMgmt)
      )
  }

  getledger(){
    return this.http.get(`${this.baseUri}/ledger/getledger`);
  }
  
  updateLedger(id:any, data:any): Observable<any> {
    let url = `${this.baseUri}/ledger/updateLedger/${id}`;
    return this.http.put(url, data, { headers: this.headers }).pipe(
      catchError(this.errorMgmt)
    )
  }

  deleteLedger(id:any): Observable<any> {
    const header = new HttpHeaders();
    let url = `${this.baseUri}/ledger/deleteLedger/${id}`;
    return this.http.delete(url, { headers: header }).pipe(
      catchError(this.handleError)
    )
  }
}