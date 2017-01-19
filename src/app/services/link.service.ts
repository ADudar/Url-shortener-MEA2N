import { Injectable } from '@angular/core';
import { Link } from '../models/link';
import { LINKS } from '../mock-links';
import { Http, Headers, Response } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class LinkService {
  constructor(private http: Http) {}
  private baseUrl = 'http://localhost:3000';
  private headers = new Headers({'Content-Type': 'application/json'});

  // getLinks(): Promise<Link[]> {
  //   return Promise.resolve(LINKS);
  // }

  // getAllLinks2()  : Promise<Link[]>  {
  //       return this.http.get('http://localhost:3000/api/links')
  //       .toPromise()
  //       .then(response => response.json().data as Link[])
  //       .catch(this.handleError);
  //       // .map(res => res.json());
  // }

    getAllLinks()  {
        return this.http.get('/api/links')
        .map(response => response.json());
        // .then(response => response.json().data as Link[])
        // .map(res => res.json());
  }

    getLink(id: number)
    // : Promise<Link>
     {
    return this.getAllLinks()
    .find( link => link._id === id  );
    // .map(res => res.json());
              //  .then(links => links.find(link => link._id === id));
  }

 
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }



  deleteLink(id: number)
  // : Promise<void>
   {
    const url = '/api/links/'+id;
    return this.http.delete(url, {headers: this.headers})
          .map((data) =>{
        console.log(data);  return data.json();
      });
      // .toPromise()
      // .then(() => null)
      // .catch(this.handleError);
  }

  addLink(link: Link)
  // : Promise<Link> 
  {
    const body = JSON.stringify(link);
    return this.http
      .post('/api/links', body, {headers: this.headers})
      // .toPromise()
      // .then(res => res.json().data as Link)
      // .catch(this.handleError);
      .map((data) =>{
        console.log(data);  return data.json();
      });
      // .catch(this.handleError);
  }

  updateLink(link: Link)
  // : Promise<Link> 
  {
    // const url = `${this.baseUrl}/${link._id}`;
    return this.http
      .put('/api/links/'+link._id, JSON.stringify(link), {headers: this.headers})
      .map(data => data.json());
      // .toPromise()
      // .then(() => link)
      // .catch(this.handleError);
  }




  //  getLink(id: number): Promise<Link> {
  //   const url = `${this.baseUrl}/${id}`;
  //   return this.http.get(url)
  //     .toPromise()
  //     .then(response => response.json().data as Link)
  //     .catch(this.handleError);
  // }
  //   getLinkByShortUrl(shortUrl: string): Promise<Link> {
  //   return this.getLinks()
  //              .then(links => links.find(link => {console.log(link.shortUrl.substring(link.shortUrl.length -6) === shortUrl); return link.shortUrl.substring(link.shortUrl.length -6) === shortUrl}));
  // }

}
