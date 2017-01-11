import { Injectable } from '@angular/core';
import { Link } from '../models/link';
import { LINKS } from '../mock-links';

@Injectable()
export class LinkService {

  getLinks(): Promise<Link[]> {
    return Promise.resolve(LINKS);
  }

    getLink(id: number): Promise<Link> {
    return this.getLinks()
               .then(links => links.find(link => link._id === id));
  }

  //   getLinkByShortUrl(shortUrl: string): Promise<Link> {
  //   return this.getLinks()
  //              .then(links => links.find(link => {console.log(link.shortUrl.substring(link.shortUrl.length -6) === shortUrl); return link.shortUrl.substring(link.shortUrl.length -6) === shortUrl}));
  // }

}
