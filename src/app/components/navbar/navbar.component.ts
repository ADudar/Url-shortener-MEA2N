import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.less']
})
export class NavbarComponent implements OnInit {

  constructor(private auth : AuthenticationService) { }

  ngOnInit() {
  }

    logout() {
    // this.loggedIn = false;
    this.auth.logout();
  }

}
