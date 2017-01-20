import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from './services/authentication.service';
import 'rxjs/Rx';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  constructor(private router: Router,
              private auth : AuthenticationService){

  }

  logout() {
    // console.log("islogout");
    // this.auth.loggedIn = false;

    // this.router.navigate(['login']);
    this.auth.logout();
  }




}
