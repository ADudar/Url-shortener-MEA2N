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
  isLoading = true;
  constructor(
    private linkService: LinkService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.route.params
      .switchMap((params: Params) => this.linkService.getLinkByShortUrl(params['shortUrl']))
      .subscribe(link => {
        this.isLoading = false;
        this.link = link;
        this.processTags();
      });
  }

  processTags() {
         this.tagsArray = this.link.tags;
  }

  getLinksByTag(tag : string) {
    this.tag = tag;
    this.linkService.getLinksByTag(tag)
    .subscribe( links =>{ this.links = links});
  }
}
