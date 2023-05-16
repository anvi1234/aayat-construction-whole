import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class SiteRegService {
  
  baseUri:string = environment.apiBaseUrl;
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  dataForFilter = new BehaviorSubject(null)
  public selectedData = new BehaviorSubject<any>(null)
  constructor(private http: HttpClient) { }
  
  // Create
  createSite(data:any): Observable<any> {
    let url = `${this.baseUri}/site/add-site`;
    return this.http.post(url, data)
      .pipe(
        catchError(this.errorMgmt)
      )
  }

  // Get all employees
  getSite() {
    return this.http.get(`${this.baseUri}/site/getSite`);
  }

  // Get employee
  getSiteById(id:any): Observable<any> {
    let url = `${this.baseUri}/site/getSiteById/${id}`;
    return this.http.get(url, {headers: this.headers}).pipe(
      map((res:any) => {
        return res;
      }),
      catchError(this.errorMgmt)
    )
  }


  // Update employee
  updateSite(id:any, data:any): Observable<any> {
    let url = `${this.baseUri}/site/updateSite/${id}`;
    return this.http.put(url, data, { headers: this.headers }).pipe(
      catchError(this.errorMgmt)
    )
  }

  // Delete employee
  deleteSite(id:any): Observable<any> {
    let url = `${this.baseUri}/site/deleteSite/${id}`;
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

}