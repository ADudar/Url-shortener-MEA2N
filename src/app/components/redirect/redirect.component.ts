import { Component, OnInit } from '@angular/core';
import { LinkService } from '../../services/link.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-redirect',
  templateUrl: './redirect.component.html',
  styleUrls: ['./redirect.component.less']
})
export class RedirectComponent implements OnInit {

  paramsSubscription: Subscription;
  isLoading = true;
  result = 'Redirecting...';

  constructor(private linkService: LinkService,
    private route: ActivatedRoute
  ) { }

  redirect() {
    this.paramsSubscription = this.route.params.subscribe(params => {
      this.linkService.redirect(params['id']).subscribe(longUrl => {
        if (longUrl.url) {
          window.location.href = longUrl.url;
        } else {
          this.result = 'Failed to redirect';
          this.isLoading = false;
        }
      });
    });
  }

  ngOnInit() {
    this.redirect();
  }

  ngOnDestroy() {
    this.paramsSubscription.unsubscribe();
  }
}
