import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from './services/authentication.service';
import { JwtHelper, tokenNotExpired } from 'angular2-jwt';
// import 'rxjs/Rx';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  constructor(private router: Router,
    private auth: AuthenticationService
  ) {

    if (tokenNotExpired()) {
      this.auth.loggedIn = true;
      let token = localStorage.getItem('id_token');
      this.auth.username = (new JwtHelper).decodeToken(token).username;
      this.auth.user_id = (new JwtHelper).decodeToken(token).user_id;
    }
  }
}
