import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from './services/authentication.service';
import { JwtHelper, tokenNotExpired } from 'angular2-jwt';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: [``]
})
export class AppComponent {
  constructor(private router: Router,
              private auth: AuthenticationService ) {
                this.auth.isLoggedIn();
              }
}
