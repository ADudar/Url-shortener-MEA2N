import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Http } from '@angular/http';
import { AuthHttp } from 'angular2-jwt';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { Link } from '../../models/link';
import { LinkService } from '../../services/link.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.less']
})

export class HomeComponent implements OnInit {
    users: User[] = [];
    links: Link[] = [];

    getTotalClicks() : number {
        var _totalClicks = 0;
        for(var i =0; i<this.links.length; i++) {
            _totalClicks += +this.links[i].clicks;
        }
        return _totalClicks;
    }

    constructor(private userService: UserService, private linkService: LinkService) { }

    ngOnInit(): void {
        // get users from secure api end point
        // this.userService.getUsers()
        //     .subscribe(users => {
        //         this.users = users;
        //     });
        this.linkService.getLinks().then(links => this.links = links);
    }

    OnSubmitForm(event: Link) : void {
        this.links.unshift(event);
    }

    deleteLink(id : number): void {
        this.links.splice(this.links.findIndex(link => link._id === id), 1);
    }

    orderByClicks() : void {
        this.links.sort((a,b) => a>b?1:0);
        console.log("sort by clicks");
    }
    //how to order data?
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
