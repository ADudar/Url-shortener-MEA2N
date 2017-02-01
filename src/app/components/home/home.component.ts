import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Http, HttpModule } from '@angular/http';
import { AuthHttp } from 'angular2-jwt';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { Link } from '../../models/link';
import { LinkService } from '../../services/link.service';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.less']
})

export class HomeComponent  {
link : Link;

    constructor(
        // private userService: UserService,
        // private linkService: LinkService,
        // // private http: Http,
        // // private router: Router,
        // private auth: AuthenticationService,
        // // private authHttp: AuthHttp
    ) {


    }

    // ngOnInit(): void {
    //     // this.getUsersLinks();

    // }



    OnAddLink(link: Link): void {
        // this.links.unshift(link);
        this.link = link;
    }
}

