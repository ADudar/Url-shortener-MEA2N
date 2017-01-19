import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Http, HttpModule } from '@angular/http';
import { AuthHttp } from 'angular2-jwt';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { Link } from '../../models/link';
import { LinkService } from '../../services/link.service';
import { LinkFactory } from '../../services/links-factory';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.less']
})

export class HomeComponent implements OnInit {
    users: User[] = [];
    links: Link[] = [];
    changedLink : Link;
    isEditMode = false;


    // @Input()
    // selectedLink : Link  = new Link();
    // @Output()
    // changeLink = new EventEmitter<Link>();

    OnAddLink(link: Link): void {
        // console.log(link);
        link.shortUrl = "http://" + window.location.hostname + ":" + window.location.port + "/" + link.shortUrl;
        this.links.unshift(link);
        // this.getAllLinks();
    }

    OnChange(link : Link) {
        // this.isEditMode  = true;
        this.changedLink = link;
    }

    constructor(private userService: UserService,
        private linkService: LinkService,
        private http: Http) {
        //         LinkFactory.getAll().then((data) =>{
        //    this.links = data;

        // });
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

    getAllLinks() {
        this.linkService.getAllLinks()
            .subscribe(links => {
                this.links = links
            });
    }

    ngOnInit(): void {
        this.getAllLinks();


        // get users from secure api end point
        // this.userService.getUsers()
        //     .subscribe(users => {
        //         this.users = users;
        //     });
        // this.linkService.getLinks().then(links => this.links = links);
        // this.linkService.getAllLinks().subscribe(links => {

        //     const items=[];
        //     for (let  key in links ) {
        //         items.push(links[key]);
        //     }
        //     this.links = items;
        //     // this.links = links ;
        //         });
        // this.linkService.getAllLinks()
        // .then(links => this.links = links);

        // .then(links => this.links = links);
    }



    deleteLink(id: number): void {
       
        this.linkService.deleteLink(id)
        .subscribe( data => {
             this.links.splice(this.links.findIndex(link => link._id === id), 1);
        })
    }

    orderByClicks(): void {
        this.links.sort((a, b) => a > b ? 1 : 0);
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
