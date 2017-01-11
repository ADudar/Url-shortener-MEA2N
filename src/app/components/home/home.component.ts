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
    link = new Link();
    links: Link[] = [];
    shortLinkisCopied: boolean = false;
    shortedLink = "";



    constructor(private userService: UserService, private linkService: LinkService) { }

    ngOnInit(): void {
        // get users from secure api end point
        // this.userService.getUsers()
        //     .subscribe(users => {
        //         this.users = users;
        //     });
        this.linkService.getLinks().then(links => this.links = links);

    }

    getShortUrl() {

        this.link.shortUrl = "" + window.location.hostname + ":" + window.location.port + "/" + this.makeId();
        this.link.clicks = 1;
        this.links.push(this.link);
        this.shortedLink = this.link.shortUrl;
        this.link = new Link();
    }

    private makeId(): string {
        var text = "";
        var str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for (var i = 0; i < 6; i++) {

            text += str.charAt(Math.floor(Math.random() * str.length))
        }
        return text; 

    }

    deleteLink(): void {
        this.links.splice(this.links.indexOf(this.link), 1);
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


