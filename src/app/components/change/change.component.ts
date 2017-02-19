import { Subscription } from 'rxjs/Subscription';
import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Link } from '../../models/link';
import { LinkService } from '../../services/link.service';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-change',
  templateUrl: './change.component.html',
  styleUrls: ['./change.component.less']
})
export class ChangeComponent implements OnInit, OnDestroy {
  link: Link;
  paramsSubscription: Subscription;
  message;
  isLoading = true;

 ngTagsModel = '';

  constructor(
    private linkService: LinkService,
    private route: ActivatedRoute
  ) {
  }


  ngOnInit(): void {
    this.paramsSubscription = this.route.params.subscribe(params => {
      this.linkService.getLinkById(params['_id']).subscribe(link => {
        this.link = link;
        this.ngTagsModel = this.link.tags.join(' ');
        this.isLoading = false;
      });
    });
  }

  ngOnDestroy(): void {
    this.paramsSubscription.unsubscribe();
  }

  UpdateUrl() {

    this.link.tags = this.ngTagsModel.split(/[\-_#,\s]/).filter(tag => tag !== '');
    this.linkService.updateLink(this.link)
      .subscribe(data => {
        this.message = data.message;
      });
  }
}
