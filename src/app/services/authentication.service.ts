import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'
import { Router } from '@angular/router';
import { contentHeaders } from '../common/headers';

@Injectable()
export class AuthenticationService {

  private token: string;
  loggedIn = false;

  constructor(private http: Http,
              private router: Router) {
  }

  authenticate(username, password, url): Observable<boolean> {
    let body = JSON.stringify({ username, password });
    return this.http.post('api/login', body, { headers: contentHeaders })
      .map((response) => {

        // login successful if there's a jwt token in the response
        let token = response.json() && response.json().token;
        if (token) {
          this.token = token; //set token property
          // store username and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('id_token', response.json().token);
          this.loggedIn = true;
          return true; //login success
        } else {
          this.loggedIn = false; //login failed
          return false;
        }
      });

  }

  login(username, password): Observable<boolean> {

    return this.authenticate(username, password, 'api/login')
  }

  signup(username, password): Observable<boolean> {

    return this.authenticate(username, password, '/api/users')
  }

  logout(): void {
    // clear token remove user from local storage to log user out
    this.token = null;
    localStorage.removeItem('id_token');
    this.loggedIn = false;
    this.router.navigate(['login']);
  }
}