import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { AuthenticationService } from './authentication.service';
import { User } from '../models/user';
import { AuthHttp } from 'angular2-jwt';


@Injectable()
export class UserService {
    constructor(
        private authHttp: AuthHttp
        ,        private auth: AuthenticationService
        ) {
    }



    // getUsers(): Observable<User[]> {
    //     // add authorization header with jwt token
    //     let headers = new Headers({ 'id_token': 'Bearer ' + this.authenticationService.Token });
    //     let options = new RequestOptions({ headers: headers });

    //     // get users from api
    //     return this.http.get('/api/users', options)
    //         .map((response: Response) => response.json());
    // }
}