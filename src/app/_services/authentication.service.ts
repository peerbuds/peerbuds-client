import { Injectable } from '@angular/core';
import { Http, Headers, Response, BaseRequestOptions, RequestOptions, RequestOptionsArgs } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

import { CookieService } from 'angular2-cookie/core';

import { AppConfig } from '../app.config';

@Injectable()
export class AuthenticationService {

    public key = 'access_token';

    constructor(private http: Http, private config: AppConfig, private _cookieService:CookieService) {}

    getCookie(key: string){
      return this._cookieService.get(key);
    }

    setCookie(key: string, value: string, options?: CookieOptionsArgs)
    {
      this._cookieService.put(key, value, options);
    }

    removeCookie(key: string, options?: CookieOptionsArgs)
    {
      this._cookieService.remove(key, options);
    }

    public login(username: string, password: string) {

      var body = `{"username":"${username}","password":"${password}"}`;
      var headers = new Headers();
      headers.append('Content-Type', 'application/json');
      let options = new RequestOptions({ headers: headers, withCredentials: true });
      return this.http
                 .post(this.config.apiUrl + '/auth/local', body, options)
                 .map((response: Response) => {
                   // login successful if there's a jwt token in the response
                   let user = response.json();
                   if (user && user.access_token) {
                       //Set Cookie
                       //this.setCookie("access_token", user.access_token);
                       //this.setCookie("userId", user.userId);
                   }
                 }, (err) => {
                     console.log('Error: ' + err);
           });


      /*return this.http.post(this.config.apiUrl + '/auth/local', { username: username, password: password })
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                let user = response.json();

                if (user && user.access_token) {

                }
            });*/
    }

    public signup(provider: string) {
        return this.http.get(this.config.apiUrl + '/auth/' + provider)
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                let user = response.json();
                if (user && user.access_token) {
                    //Set Cookie
                    this.setCookie(this.key, user.access_token);
                }
            });
    }

    public register(username: string, password: string, email: string) {
        debugger;
        var body = `{"username":"${username}","password":"${password}","email":"${email}"}`;
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let options = new RequestOptions({ headers: headers, withCredentials: true });
        return this.http
                   .post(this.config.apiUrl + '/signup', body, options)
                   .map((response: Response) => {
                     // login successful if there's a jwt token in the response
                     let user = response.json();
                     if (user && user.access_token) {
                         //Set Cookie
                         //this.setCookie("access_token", user.access_token);
                         //this.setCookie("userId", user.userId);
                     }
                   }, (err) => {
                       console.log('Error: ' + err);
             });
        /*return this.http.post(this.config.apiUrl + '/signup', { username: username, password: password, email: email })
            .map((response: Response) => {
                debugger;
                // login successful if there's a jwt token in the response
                let user = response.json();
                if (user && user.access_token) {
                    //Set Cookie
                    //this.setCookie(this.key, user.access_token);
                }
            });*/
    }

    public logout() {
        if(this.getCookie(this.key))
        {
            this.http.get(this.config.apiUrl + '/auth/logout',)
                .map((res: Response) => {
                    console.log("Logged out from server");
                    this.removeCookie(this.key);
                }).subscribe();
        }


    }
}
