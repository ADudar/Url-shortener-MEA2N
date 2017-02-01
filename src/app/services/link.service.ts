import { Injectable } from '@angular/core';
import { Link } from '../models/link';
import { LINKS } from '../mock-links';
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
        return response.json()
      });
  }

  getFilteredLinks(filter = '') {
          console.log('link service get filtered links ');

                return this.authHttp.get('api/link/filter?user_id='+filter)
              .map(res =>  res.json())
  }

  getLinkById(id: number) {
    console.log('get link by id call, id = ' + id);
    return this.authHttp.get('/api/links/' + id, { headers: contentHeaders })
      .map(res => res.json());
  }


  getLinkByShortUrl(shortUrl : string) {
    return this.http.get('/api/'+shortUrl+'/details', {headers: contentHeaders})
    .map (res => res.json());
  }

  // getLinkByShortUrl(shortUrl: string) {
  //   const url = '/' + shortUrl;
  //   return this.authHttp.get(url, { headers: contentHeaders })
  //     .map(res => res.json());
  // }

  redirect(shortUrl: string) {
    return this.http.get('/api/redirect/'+shortUrl,{ headers: contentHeaders })
    .map (longUrl => longUrl.json());
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
        console.log("response data from servi");
        console.log(data.json());
         return data.json();
      });
  }

  updateLink(link: Link) {
    return this.authHttp
      .put('/api/links/' + link._id, JSON.stringify(link), { headers: contentHeaders })
      .map(data => data.json());
  }

  getLinksByTag(tag: string) {
    return this.http
    .get('api/link/filter?tag='+tag,{headers : contentHeaders})
    .map(data => data.json());
  }


}
