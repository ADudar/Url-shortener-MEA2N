import { Component, OnInit } from '@angular/core';
import { LinkService } from '../../services/link.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { AuthenticationService } from '../../services/authentication.service';
import { AuthHttp } from 'angular2-jwt';

@Component({
  selector: 'app-redirect',
  templateUrl: './redirect.component.html',
  styleUrls: ['./redirect.component.less']
})
export class RedirectComponent implements OnInit {
  paramsSubscription: Subscription;
  constructor(private linkService: LinkService,
    private route: ActivatedRoute,
    private router: Router,
    private auth: AuthenticationService) {

  }
  isLoading = true;
  result = 'Redirecting...';

  redirect() {
    console.log("route params");
    console.log(this.route);
    this.paramsSubscription = this.route.params.subscribe(params => {
      this.linkService.redirect(params['id']).subscribe(longUrl => {
        if (longUrl.url) {
          window.location.href = longUrl.url;
        }
        else {

          this.result = "Failed to redirect";
          this.isLoading = false;
        }
      })
    });
  }

  ngOnInit() {
    this.redirect();
    // console.log(this.route);
  }

  ngOnDestroy(): void {
    this.paramsSubscription.unsubscribe();
  }
}
