import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

import { AppConfig } from '../app.config';

@Injectable()
export class AuthenticationService {
    constructor(private http: Http, private config: AppConfig) {}
    public login(username: string, password: string) {
        return this.http.post(this.config.apiUrl + '/auth/local', { username: username, password: password })
            .map((response: Response) => {
            debugger;
                // login successful if there's a jwt token in the response
                let user = response.json()[0];
                if (user && user.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                }
            });
    }

    public signup(provider: string) {
        return this.http.get(this.config.apiUrl + '/auth/' + provider)
            .map((response: Response) => {
                debugger;
                // login successful if there's a jwt token in the response
                /*let user = response.json()[0];
                if (user && user.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                }*/
            });
    }

    public register(username: string, password: string, email: string) {
        return this.http.post(this.config.apiUrl + '/signup', { username: username, password: password, email: email })
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                debugger;
                let user = response.json()[0];
                console.log(user);
                if (user && user.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                }
            });
    }

    public logout() {
      	let token;
        if(localStorage.length != 0 && localStorage.getItem('currentUser') != null)
        {
           console.log("before http call");
           token = JSON.parse(localStorage.getItem('currentUser')).token.properties.id;
           console.log(this.config.apiUrl + '/auth/logout');
           return this.http.get(this.config.apiUrl + '/auth/logout', { accessToken: token})
               .map((res: Response) => {
                   console.log("Logged out from server");
               }).subscribe();
        }
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');

    }
}
