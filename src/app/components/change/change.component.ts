import { Component, OnInit, Input, EventEmitter } from '@angular/core';
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
export class ChangeComponent implements OnInit {
  @Input()
  link: Link;
  finishedEdit = new EventEmitter();

  constructor(
    private linkService: LinkService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit(): void {

    // this.route.params
    //   .switchMap((params: Params) => this.linkService.getLink(+params['_id']))
    //   .subscribe(link => this.link = link);
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
         this.link = null;
      });

}
  goBack(): void {
    this.link = null;
  }
}