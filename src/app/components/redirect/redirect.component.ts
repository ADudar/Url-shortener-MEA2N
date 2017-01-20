import { Component, OnInit } from '@angular/core';
import { LinkService } from '../../services/link.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-redirect',
  templateUrl: './redirect.component.html',
  styleUrls: ['./redirect.component.less']
})
export class RedirectComponent implements OnInit {
url ='';
  constructor(private linkService : LinkService,
              private route : ActivatedRoute,
              private router : Router) {
      
  }

redirect() {
  this.linkService.getLinkByShortUrl(this.route.params['shortUrl'])
                  .subscribe(url => this.url = url);
  this.router.navigateByUrl('http://mail.ru');
}

  ngOnInit() {
    this.redirect();
  }

}
