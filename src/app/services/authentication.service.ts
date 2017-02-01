import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'
import { Router } from '@angular/router';
import { contentHeaders } from '../common/headers';
import { User } from '../models/user';
import { JwtHelper, tokenNotExpired } from 'angular2-jwt';


@Injectable()
export class AuthenticationService {

  private token: string;
  get Token(): string {return this.token;}
  loggedIn = false;
  public username;
  public  user_id;
  // public  user : User ;

  constructor(private http: Http,
              private router: Router) {

     
  }


      isLoggedIn(): boolean {
      if (tokenNotExpired()) {
      console.log('guard token not expired ');
      this.loggedIn = true;
      var token = localStorage.getItem('id_token');
      this.username = (new JwtHelper).decodeToken(token).username;

      return true;
    }
    return false;
      }

      getCurrentUser() {
              console.log('auth service getcuurent user');

          return this.http.get('/api/user/filter?username='+ this.username) 
                            .map(res =>  res.json());
  }


  authenticate(username, password, url, email=''): Observable<boolean> {
    let body = JSON.stringify({ username, password, email });
    return this.http.post(url, body, { headers: contentHeaders })
      .map((response) => {

        // login successful if there's a jwt token in the response
        let token = response.json() && response.json().token;
        if (token) {
          this.token = token; //set token property
          this.username = username;
          // store username and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('id_token', token);
          this.loggedIn = true;
                // this.getCurrentUser();

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

  signup(username, password, email): Observable<boolean> {

    return this.authenticate(username, password, '/api/users', email)
  }

  logout(): void {
    // clear token remove user from local storage to log user out
    this.token = null;
    localStorage.removeItem('id_token');
    this.loggedIn = false;
    this.router.navigate(['login']);
  }
}