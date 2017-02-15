import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Link } from '../../models/link';
// import { UserService } from '../../services/user.service';
import { LinkService } from '../../services/link.service';
import { AuthenticationService } from '../../services/authentication.service';


@Component({
  selector: 'app-links',
  templateUrl: './links.component.html',
  styleUrls: ['./links.component.less']
})
export class LinksComponent implements OnInit, OnChanges {
public radioModel: string = 'Middle';

  links: Link[] = [];
  totalCount: number;
  totalClicks: number;
  itemsPerPage = 5;
  currentPage = 1;
  @Input() link: Link;
  isLoading = true;
  linkToDelete: Link = new Link();

  constructor(
    // private userService: UserService,
    private linkService: LinkService,
    // private http: Http,
    // private router: Router,
    private auth: AuthenticationService,
    // private authHttp: AuthHttp
  ) {
  }

  ngOnChanges(object: any) {
    if (object.link.currentValue) {
      this.links.unshift(object.link.currentValue);
      this.totalCount++;
    }
  }

  ngOnInit(): void {
    this.getUsersLinks();
    this.getTotalClicks();
  }

  getUsersLinks() {
    // this.auth.getCurrentUser()
      // .subscribe((user) => {
        // this.auth.user_id = user._id;
        this.OnPageChange(this.currentPage);
      // });
  }

  OnPageChange(page = 1) {
    this.isLoading = true;
    this.linkService.getUsersLinksPage(this.auth.user_id, this.itemsPerPage, this.currentPage = page)
      .subscribe((res) => {
        this.totalCount = res.count;
        this.links = res.links;
        this.isLoading = false;
      }
      );

  }

  onDelete(link: Link) {
    this.linkToDelete = link;
  }

  deleteLink(): void {
    this.linkService.deleteLink(this.linkToDelete._id)
      .subscribe(data => {
        let indexDeleted = this.links.findIndex(link => link._id === this.linkToDelete._id);
        this.totalClicks -= this.links[indexDeleted].clicks;
        // this.links.splice( indexDeleted, 1);
        // this.totalCount--;
        this.getUsersLinks();
      });
  }



  getTotalClicks() {
    // this.auth.getCurrentUser()
    // .subscribe(user => {
      // this.auth.user_id = user._id;
            this.linkService.getTotalClicks(this.auth.user_id)
    .subscribe(res => this.totalClicks = res.totalClicks);
  // });
  }

ascSort  = true;
sortByProperty(property : string) {

      if (this.ascSort)  this.links.sort((a, b) => a[property] > b[property] ? 1 :  a[property] === b[property]?0:-1  );
    else this.links.sort((a, b) => a[property] <b[property] ? 1 :  a[property] === b[property]?0:-1 );

      this.ascSort  = !this.ascSort;

}

  onPerPageChanged(cnt = 10) {
    this.itemsPerPage = cnt;
    this.OnPageChange();
  }
}
