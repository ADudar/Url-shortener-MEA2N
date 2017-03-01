import { Component, OnInit } from '@angular/core';
import { Link } from '../../models/link';
import { ActivatedRoute, Params } from '@angular/router';
import { LinkService } from '../../services/link.service';
import 'rxjs/add/operator/switchMap';
@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styles: [`
    .break-word {
        word-break: break-all;
    word-wrap: break-word;
}
  `]
})
export class DetailsComponent implements OnInit {
  link: Link;
  tagsArray = [];
  links: Link[] = [];
  tag = '';
  isLoading = true;
  constructor(
    private linkService: LinkService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params
      .switchMap((params: Params) => this.linkService.getLinkByShortUrl(params['shortUrl']))
      .subscribe(data => {
        this.isLoading = false;
        if (data.success) {
        this.link = data.link;
        }
        this.processTags();
      });
  }

  processTags() {
         this.tagsArray = this.link.tags;
  }

  getLinksByTag(tag: string) {
    this.tag = tag;
    this.linkService.getLinksByTag(tag)
    .subscribe( links => { this.links = links; });
  }
}
