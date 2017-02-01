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
              private auth : AuthenticationService){

    if (tokenNotExpired()) {
      console.log('guard token not expired ');
      this.auth.loggedIn = true;
      var token = localStorage.getItem('id_token');
      
      this.auth.username = (new JwtHelper).decodeToken(token).username;
      
      // this.auth.getCurrentUser()
      // .subscribe(username => {this.auth.loggedIn = true;this.auth.username = username;});
      // console.log(this.auth.Token);// auth.token = undefined
      // return true;
    }


              }



}
