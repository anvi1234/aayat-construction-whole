import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';

import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { setCookie } from 'src/util/util';

// Interfaces here

@Injectable()
export class AuthenticationService {
  baseUri:string = environment.apiBaseUrl;
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  public sideBar = new BehaviorSubject(true)
  constructor(private http: HttpClient) { }

  login(authCredentials:any) {
    return this.http.post(environment.apiBaseUrl + '/users/authenticate', authCredentials);
  }

 setToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  deleteToken() {
    localStorage.removeItem('token');
  }

  getUserPayload() {
    var token = this.getToken();
    if (token) {
      var userPayload = atob(token.split('.')[1]);
      return JSON.parse(userPayload);
    }
    else
      return null;
  }

 
}