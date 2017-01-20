import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Http } from '@angular/http';
import { contentHeaders } from '../../common/headers';
import { AuthenticationService } from '../../services/authentication.service';
import { Observable } from 'rxjs/Observable';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.less']
})

export class LoginComponent implements OnInit {
    username = '';
    password = '';
    model: any;
    loading = false;
    error = '';

    constructor(
        private router: Router,
        private auth: AuthenticationService,
        private route: ActivatedRoute,
        private http : Http) { }

    ngOnInit() {
        // reset login status
        // this.auth.logout();
    }

      login() {
    // // event.preventDefault();
    // let body = JSON.stringify({ username:this.username, password: this.password });
    // this.http.post('api/login', body, { headers: contentHeaders })
    //   .subscribe(
    //     response => {
    //       localStorage.setItem('id_token', response.json().token);
    //       this.router.navigate(['home']);
    //     },
    //     error => {
    //       alert(error.text());
    //       console.log(error.text());
    //     }
    //   );
    this.loading = true;
    this.auth.login(this.username, this.password)
          .subscribe(result => {
                if (result === true) {
                    this.router.navigate(['/home']);
                } else {
                    this.error = 'Username or password is incorrect';
                    this.loading = false;
                }
            });

  }
}

    // login() {
    //     // this.loading = true;
    //     // this.authenticationService.login(this.username, this.password)
    //     //     .subscribe(result => {
    //     //         if (result === true) {
    //     //             this.router.navigate(['/home']);
    //     //         } else {
    //     //             this.error = 'Username or password is incorrect';
    //     //             this.loading = false;
    //     //         }
    //     //     });
        
        
    //     if (this.auth.login(this.username, this.password)) {
    //         //   const destination =
    //         //     this.route.snapshot.queryParams['destination'] || '/';
    //         //   this.router.navigateByUrl(destination);
    //         this.router.navigate(['/home']);
    //     }
    // }







// export class LoginComponent {
  // constructor(public router: Router, public http: Http) {
  // }

  // login(event, username, password) {
  //   event.preventDefault();
  //   let body = JSON.stringify({ username, password });
  //   this.http.post('http://localhost:3000/sessions/create', body, { headers: contentHeaders })
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

  // signup(event) {
  //   event.preventDefault();
  //   this.router.navigate(['signup']);
  // }
// }
