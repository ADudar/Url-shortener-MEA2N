import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { JwtHelper, tokenNotExpired } from 'angular2-jwt';


@Injectable()
export class AuthGuard implements  CanActivate {

    constructor(private router: Router,
                private auth : AuthenticationService) { }

private username = '';
    // canActivate() {
    //     // if (localStorage.getItem('currentUser')) {
    //     //     // logged in so return true
    //     //     return true;
    //     // }

    //     // // not logged in so redirect to login page
    //     // this.router.navigate(['/login']);
    //     // return false;
    // if (!this.auth.loggedIn) {
    //   this.router.navigate(['/login']);
    //   return false;
    // }
    // return true;

    // }

    // isLoggedIn() {
    //   return tokenNotExpired();
    // }


// useJwtHelper() {
//   var token = localStorage.getItem('id_token');

//   console.log(
//     this.jwtHelper.decodeToken(token),
//     this.jwtHelper.getTokenExpirationDate(token),
//     this.jwtHelper.isTokenExpired(token)
//   );
// }


      canActivate() {
        // this.useJwtHelper();

    if (tokenNotExpired()) {
      console.log('guard token not expired ');
      this.auth.loggedIn = true;
      var token = localStorage.getItem('id_token');
      
      this.auth.username = (new JwtHelper).decodeToken(token).username;
      
      // this.auth.getCurrentUser()
      // .subscribe(username => {this.auth.loggedIn = true;this.auth.username = username;});
      // console.log(this.auth.Token);// auth.token = undefined
      return true;
    }
    this.router.navigate(['/login']);
    return false;

  }
}
