import { Component, OnInit } from '@angular/core';
import { Link } from '../../models/link';
import { ActivatedRoute, Params } from '@angular/router';
import { Location }               from '@angular/common';
import { LinkService } from '../../services/link.service';
@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.less']
})
export class DetailsComponent implements OnInit {
  link: Link;
  tagsArray = [];
  links: Link[] = [];
  tag ='';
  constructor(
    private linkService: LinkService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.route.params
      // .switchMap((params: Params) => this.linkService.getLinkById(params['_id']))
      // .subscribe(link => this.link = link);
      .switchMap((params: Params) => this.linkService.getLinkByShortUrl(params['shortUrl']))
      .subscribe(link => {
        this.link = link
        this.processTags();
      });
  }
//need to change path from details/:id to /:id/details
    goBack(): void {
    this.location.back();
  }

  processTags() {
    // this.tagsArray = this.link.tags.split(" ").filter(tag => tag!='');
    //  console.log(this.tagsArray);
         this.tagsArray = this.link.tags;
  }

  getLinksByTag(tag : string) {
    this.tag = tag;
    this.linkService.getLinksByTag(tag)
    .subscribe( links => this.links = links);
  }
}
