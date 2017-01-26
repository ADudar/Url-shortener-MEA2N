import { Component, OnInit } from '@angular/core';
import { LinkService } from '../../services/link.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-redirect',
  templateUrl: './redirect.component.html',
  styleUrls: ['./redirect.component.less']
})
export class RedirectComponent implements OnInit {
  paramsSubscription: Subscription;
  constructor(private linkService: LinkService,
    private route: ActivatedRoute,
    private router: Router) {

  }

  redirect() {
    // this.linkService.getLinkByShortUrl(this.route.params['shortUrl'])
    //                 .subscribe(url => this.url = url);
    // this.router.navigate(['/'+this.url]);
    // console.log(this.route.params.value.id);
    //   this.linkService.redirect(this.route.params['id'])
    //   .subscribe((url) => {
    //     console.log("here need url to redirect");
    //     console.log(url);
    //     window.location.href=url;  
    //   })


    this.paramsSubscription = this.route.params.subscribe(params => {
      this.linkService.redirect(params['id']).subscribe(longUrl => {
        window.location.href = longUrl.url;
      })
    });
  }

  ngOnInit() {
    this.redirect();
  }

  ngOnDestroy(): void {
    this.paramsSubscription.unsubscribe();
  }

}
