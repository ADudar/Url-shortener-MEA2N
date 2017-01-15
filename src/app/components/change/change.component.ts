import { Component, OnInit }      from '@angular/core';
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
  link: Link;
  constructor(
    private linkService: LinkService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.route.params
      .switchMap((params: Params) => this.linkService.getLink(+params['_id']))
      .subscribe(link => this.link = link);
  }

  goBack(): void {
    this.location.back();
  }
}
