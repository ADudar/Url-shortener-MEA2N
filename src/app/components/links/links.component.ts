import { Component, OnInit, Input,OnChanges } from '@angular/core';
import { Link } from '../../models/link';
// import { UserService } from '../../services/user.service';
import { LinkService } from '../../services/link.service';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-links',
  templateUrl: './links.component.html',
  styleUrls: ['./links.component.less']
})
export class LinksComponent implements OnInit,OnChanges {

      links: Link[] = [];
    @Input() link : Link ;
    isLoading = true;

    constructor(
        // private userService: UserService,
        private linkService: LinkService,
        // private http: Http,
        // private router: Router,
        private auth: AuthenticationService,
        // private authHttp: AuthHttp
    ) {


    }    

    ngOnChanges(object : any) {
      // this.links.unshift(object.link.currentValue);
        if(object.link.currentValue) {
          this.links.unshift(object.link.currentValue);
        }
        console.log("NGONCHANGES CALL");
        // console.log(object);
        // console.log(object.link.currentValue);

    }

ngOnInit()  : void {
        this.getUsersLinks();
        
}

    getUsersLinks() {
        this.isLoading = true;
        this.auth.getCurrentUser()
            .subscribe((user) => {
                console.log("current user");
                console.log(user);
                if (user) {
                    this.linkService.getFilteredLinks(user._id)
                        .subscribe((links) => {
                            console.log("finded links");
                            console.log(links);

                            this.links = links
                            this.isLoading = false;
                        });
                }
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

}
