import { Subscription } from'rxjs/Subscription';
import { Component, OnInit,OnDestroy, Input, EventEmitter } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Location }               from '@angular/common';
import { Link } from '../../models/link';
import { LinkService } from '../../services/link.service';
import 'rxjs/add/operator/switchMap';


@Component({
  selector: 'app-change',
  templateUrl: './change.component.html',
  styleUrls: ['./change.component.less']
})
export class ChangeComponent implements OnInit, OnDestroy {
  // @Input()
  link;
  paramsSubscription : Subscription;
  // finishedEdit = new EventEmitter();

  constructor(
      private linkService: LinkService,
      private route: ActivatedRoute,
      private router: Router,
      private location: Location ) {


  }

  ngOnInit(): void {
            this.paramsSubscription = this.route.params.subscribe( params => {
           this.linkService.getLinkById(params['_id']).subscribe(link => this.link = link);
        });

      // .subscribe(link => this.link = link);
}

ngOnDestroy() : void {
  this.paramsSubscription.unsubscribe();

}

  // initLink(): void {
  //   this.shortedLinkUrl = this.link.shortUrl;
  //   this.linkService.addLink(this.link)
  //     .subscribe(
  //     data => {
  //       this.addLink.emit(this.link);
  //       this.link = new Link();     //for clear the fields
  //     });
  // }



UpdateUrl() {
      this.linkService.updateLink(this.link)
      .subscribe(data => { 
        //  this.router.navigateByUrl('/home');
        //  this.link = null;
        this.router.navigate(['/home']);
      });

}
  goBack(): void {
    this.location.back();
  }
}