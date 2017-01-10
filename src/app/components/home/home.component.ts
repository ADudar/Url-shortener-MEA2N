import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Http } from '@angular/http';
import { AuthHttp } from 'angular2-jwt';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { Link } from '../../models/link';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})

export class HomeComponent implements OnInit {
    users: User[] = [];
    link = new Link();

    constructor(private userService: UserService) { }

    ngOnInit() {
        // get users from secure api end point
        this.userService.getUsers()
            .subscribe(users => {
                this.users = users;
            });
    }

    getShortUrl() {
        
    }

}

// export class HomeComponent {

//   jwt: string;
//   decodedJwt: string;

//   constructor(public router: Router, public http: Http) {
//     this.jwt = localStorage.getItem('id_token');
//     this.decodedJwt = this.jwt 
//     // && window.jwt_decode(this.jwt)
//     ;
//   }

//   logout() {
//     localStorage.removeItem('id_token');
//     this.router.navigate(['login']);
//   }

// }


