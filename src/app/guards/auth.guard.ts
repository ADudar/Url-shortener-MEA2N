import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { tokenNotExpired } from 'angular2-jwt';

@Injectable()
export class AuthGuard implements  CanActivate {

    constructor(private router: Router,
                private auth : AuthenticationService) { }

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

      canActivate() {
    if (tokenNotExpired()) {
      return true;
    }

    this.router.navigate(['/login']);
    return false;

  }
}
