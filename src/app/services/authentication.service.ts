import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Router } from '@angular/router';
import { contentHeaders } from '../common/headers';
import { JwtHelper, tokenNotExpired } from 'angular2-jwt';


@Injectable()
export class AuthenticationService {

  private token: string;
  get Token(): string { return this.token; }
  loggedIn = false;
  public username;
  public user_id;

  constructor(private http: Http,
    private router: Router) { }


  isLoggedIn(): boolean {
    if (tokenNotExpired()) {
      this.loggedIn = true;
      const token = localStorage.getItem('id_token');
      this.username = (new JwtHelper).decodeToken(token).username;
      this.user_id = (new JwtHelper).decodeToken(token).user_id;
      return true;
    }
    return false;
  }

  getCurrentUser() {
    return this.http.get('/api/user/filter?username=' + this.username)
      .map(res => res.json());
  }

  authenticate(username, password, url, email = ''): Observable<any> {
    const body = JSON.stringify({ username, password, email });
    return this.http.post(url, body, { headers: contentHeaders })
      .map((response) => {
        const token = response.json() && response.json().token;
        if (token) {
          this.token = token;
          this.username = username;
          localStorage.setItem('id_token', token);
          this.loggedIn = true;
        } else {
          this.loggedIn = false;
        }
          return response.json();
      });
  }

  login(username, password): Observable<any> {
    return this.authenticate(username, password, 'api/login');
  }

  signup(username, password, email): Observable<any> {
    return this.authenticate(username, password, '/api/user', email);
  }

  logout(): void {
    // clear token remove user from local storage to log user out
    this.token = null;
    localStorage.removeItem('id_token');
    this.loggedIn = false;
    this.router.navigate(['/login']);
  }
}
