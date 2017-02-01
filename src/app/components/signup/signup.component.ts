import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Http } from '@angular/http';
// import { FormsModule, ReactiveFormsModule  } from '@angular/forms';

import { contentHeaders } from '../../common/headers';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.less']
})
export class SignupComponent {
  username='';
  password='';
  passwordConfirm='';
  email='';
  error='';
  isLoading = false;
  // currentUser = '';

  constructor(public router: Router, public http: Http, public auth : AuthenticationService) {
    
  }

  signup() {
      //  console.log("signup press");
      //  this.isLoading = true;
    // event.preventDefault();
    this.isLoading =true;
    this.auth.signup(this.username, this.password, this.email)

          .subscribe(result => {
        this.isLoading = true;
                if (result === true) {
                    this.router.navigate(['/home']);
                } else {
                    this.error = 'User with username \"'+ this.username + '\" exist';
                }
                    this.isLoading = false;
            }
            );
  }

    //   login() {
    //     this.isLoading = true;
    //     this.authenticationService.login(this.username, this.password)
    //         .subscribe(result => {
    //             if (result === true) {
    //                 this.router.navigate(['/home']);
    //             } else {
    //                 this.error = 'Username or password is incorrect';
    //                 this.isLoading = false;
    //             }
    //         });
    // }

//     signup() {
//       console.log("signup press"); 
//       //reset form?
// }

}
