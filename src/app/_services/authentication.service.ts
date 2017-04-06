import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

import { AppConfig } from '../app.config';

@Injectable()
export class AuthenticationService {
    constructor(private http: Http, private config: AppConfig) {}
    public login(username: string, password: string) {
        return this.http.post(this.config.apiUrl + '/api/peers/login', { username: username, password: password })
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                let user = response.json()[0];
                if (user && user.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                }
            });
    }

    public logout() {
        let token;
        if(localStorage.getItem('currentUser') != null)
        {
           token = JSON.parse(localStorage.getItem('currentUser')).token.properties.id;
           this.http.post(this.config.apiUrl + '/api/peers/logout')
               .map((response: Response) => {
                   console.log("Logged out from server");
               });
        }
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');

    }
}
