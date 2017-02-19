import { Injectable } from '@angular/core';
import { Link } from '../models/link';
import { AuthHttp } from 'angular2-jwt';
import { contentHeaders } from '../common/headers';
import 'rxjs/add/operator/map';
import { Http } from '@angular/http';

@Injectable()
export class LinkService {
  constructor(public authHttp: AuthHttp, private http: Http) { }

  getAllLinks() {
    return this.authHttp.get('/api/links')
      .map((response) => {
        return response.json();
      });
  }

  getUsersLinksPage(user_id = '', itemsPerPage = 10, page = 1) {
    return this.authHttp
      .get('api/links/filter?user_id=' + user_id
      + '&itemsPerPage='
      + itemsPerPage
      + '&page='
      + page, { headers: contentHeaders })
      .map(res => res.json());
  }

  getLinkById(id: number) {
    return this.authHttp.get('/api/links/' + id, { headers: contentHeaders })
      .map(res => res.json());
  }

  getLinkByShortUrl(shortUrl: string) {
    return this.http
      .get('/api/' + shortUrl + '/details', { headers: contentHeaders })
      .map(res => res.json());
  }

  redirect(shortUrl: string) {
    return this.http
      .get('/api/redirect/' + shortUrl, { headers: contentHeaders })
      .map(longUrl => longUrl.json());
  }

  deleteLink(id: number) {
    const url = '/api/links/' + id;
    return this.authHttp
      .delete(url, { headers: contentHeaders })
      .map((data) => {
      });
  }

  addLink(link: Link) {
    const body = JSON.stringify(link);
    return this.authHttp
      .post('/api/links', body, { headers: contentHeaders })
      .map(data => data.json());
  }

  updateLink(link: Link) {
    return this.authHttp
      .put('/api/links/' + link._id, JSON.stringify(link), { headers: contentHeaders })
      .map(data => data.json());
  }

  getLinksByTag(tag: string) {
    return this.http
      .get('api/link/filter?tag=' + tag, { headers: contentHeaders })
      .map(data => data.json());
  }

  getTotalClicks(user_id: number) {
    return this.authHttp
      .get('api/links/clicks?user_id=' + user_id)
      .map(data => data.json());
  }
}
