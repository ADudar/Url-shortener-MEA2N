import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Http, HttpModule } from '@angular/http';
import { AuthHttp } from 'angular2-jwt';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { Link } from '../../models/link';
import { LinkService } from '../../services/link.service';
// import { LinkFactory } from '../../services/links-factory';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.less']
})

export class HomeComponent implements OnInit {
    // users: User[] = [];
    links: Link[] = [];
    // changedLink: Link;
    // isEditMode = false;
    // response: string;

    constructor(
                private userService: UserService,
                private linkService: LinkService,
                // private http: Http,
                // private router: Router,
                private auth: AuthenticationService,
                // private authHttp: AuthHttp
                                                ) {


    }

    ngOnInit(): void {
        // console.log(this.auth.username);
        // this.getAllLinks();
                // this.getCurrentUser();
                console.log('home component init and get user llinks')
            this.getUsersLinks();

            
    }
    
    // getCurrentUser() {

    //                     // console.log(this.auth.user);
                
    // }


    getUsersLinks() {
                        this.auth.getCurrentUser()
                        .subscribe( (user) => {
                            console.log("current user");
                            console.log(user);
                        if(user ) {
                            this.linkService.getFilteredLinks(user._id)
                        .subscribe((links) => {
                            console.log("finded links");
                            console.log(links);
                            
                            this.links = links});
                        }
                        });

    }

    // logout() {
    //     this.auth.logout();
    // }

    OnAddLink(link: Link): void {
        link.shortUrl = "http://" + 
                        window.location.hostname + 
                        ":" + window.location.port + 
                        "/" + link.shortUrl;
                        console.log("need to be shorted link with correct url");
                        console.log(link);
        this.links.unshift(link);
    }

    // OnChange(link: Link) {
    //     // this.isEditMode  = true;
    //     this.changedLink = link;
    // }

    getAllLinks() {
        this.linkService.getAllLinks()
            .subscribe(links => {
                this.links = links
            });
    }



    deleteLink(id: number): void {
        this.linkService.deleteLink(id)
            .subscribe(data => {
                this.links.splice(this.links.findIndex(link => link._id === id), 1);
            })
    }

    getTotalClicks(): number {
        var _totalClicks = 0;
        for (var i = 0; i < this.links.length; i++) {
            _totalClicks += +this.links[i].clicks;
        }
        return _totalClicks;
    }

    getTotalLinks(): number {
        return this.links.length;
    }

    orderByClicks(): void {
        this.links.sort((a, b) => a > b ? 1 : 0);
        console.log("sort by clicks");
    }

    // redirect(shortlink : string) {
    //     // window.location.href = 
    //     this.linkService.redirect(shortlink)
    //     .subsc

    // }
}

