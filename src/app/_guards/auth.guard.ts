import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { CookieService } from 'angular2-cookie/core';


@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router, private _cookieService:CookieService) { }

    getCookie(key: string){
      return this._cookieService.get(key);
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        let userToken = this.getCookie('access_token');
        let userId = this.getCookie('userId');
        if(userToken && userId)
        {
            // logged in so return true
            return true;
        }

        // not logged in so redirect to login page with the return url
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
        return false;
    }
}
