import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [``]
})

export class LoginComponent {
  username = '';
  password = '';
  model: any;
  isLoading = false;
  error = '';

  constructor(
    private router: Router,
    private auth: AuthenticationService
  ) { }

  login() {
    this.isLoading = true;
    this.auth.login(this.username, this.password)
      .subscribe(result => {
        if (result.success === true) {
          this.router.navigate(['/home']);
        }
      },
      err => {
        this.error = err.json().message;
      });
    this.isLoading = false;
  }
}
