import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Http } from '@angular/http';
// import { FormsModule, ReactiveFormsModule  } from '@angular/forms';

import { contentHeaders } from '../../common/headers';

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

  constructor(public router: Router, public http: Http) {
    
  }

  // signup(event, username, password) {
  //   event.preventDefault();
  //   let body = JSON.stringify({ username, password });
  //   this.http.post('http://localhost:3000/users', body, { headers: contentHeaders })
  //     .subscribe(
  //       response => {
  //         localStorage.setItem('id_token', response.json().id_token);
  //         this.router.navigate(['home']);
  //       },
  //       error => {
  //         alert(error.text());
  //         console.log(error.text());
  //       }
  //     );
  // }

    signup() {
      console.log("signup press"); 
      //reset form?
}


  login(event) {
    event.preventDefault();
    this.router.navigate(['login']);
  }
}
