import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  username = '';
  password = '';
  passwordConfirm = '';
  email = '';
  error = '';
  isLoading = false;

  constructor(public router: Router,
    public auth: AuthenticationService) { }

  signup() {
    this.isLoading = true;
    this.auth.signup(this.username, this.password, this.email)
      .subscribe(result => {
        if (result.success === true) {
          this.router.navigate(['/home']);
        } else {
          this.error = result.message;
        }
      }
      );
        this.isLoading = false;
  }
}
