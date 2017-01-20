import { Injectable } from '@angular/core';
import { Link } from '../models/link';
import { LINKS } from '../mock-links';
import { AuthHttp } from 'angular2-jwt';
import { contentHeaders } from '../common/headers';
import 'rxjs/add/operator/map';

@Injectable()
export class LinkService {
  constructor(public authHttp: AuthHttp) { }

  getAllLinks() {
    return this.authHttp.get('/api/links')
      .map((response) => {
        return response.json()
      });
  }

  getLinkById(id: number) {
    const url = '/api/links/' + id;

    return this.authHttp.get(url, { headers: contentHeaders })
      .map(res => res.json());
  }

  getLinkByShortUrl(shortUrl: string) {
    const url = '/' + shortUrl;
    return this.authHttp.get(url, { headers: contentHeaders })
      .map(res => res.json());
  }

  deleteLink(id: number) {
    const url = '/api/links/' + id;
    return this.authHttp.delete(url, { headers: contentHeaders })
      .map((data) => {
        console.log(data); return data.json();
      });
  }

  addLink(link: Link)  {
    const body = JSON.stringify(link);
    return this.authHttp
      .post('/api/links', body, { headers: contentHeaders })
      .map((data) => {
        console.log(data); return data.json();
      });
  }

  updateLink(link: Link) {
    return this.authHttp
      .put('/api/links/' + link._id, JSON.stringify(link), { headers: contentHeaders })
      .map(data => data.json());
  }
}
