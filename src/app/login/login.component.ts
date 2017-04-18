import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AlertService, AuthenticationService } from '../_services/index';

import { AppState } from '../app.service';
import { XLargeDirective } from './x-large';

@Component({
  selector: 'login',  // <login></login>
  providers: [],
  // Our list of styles in our component. We may add more to compose many styles together
  styleUrls: [ './login.component.css' ],
  // Every Angular template is first compiled by the browser before Angular runs it's compiler
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  // Set our default values
  public model: any = {};
  public loading = false;
  public returnUrl: string;
  // TypeScript public modifiers

  constructor(
    public appState: AppState,
    private route: ActivatedRoute,
    private router: Router,
    public authenticationService: AuthenticationService,
    private alertService: AlertService) {
      console.log(authenticationService);
    }

  public ngOnInit() {
    // reset login status
    debugger;
    console.log(this);
    this.authenticationService.logout();
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  login() {
      this.loading = true;
      this.authenticationService.login(this.model.username, this.model.password)
          .subscribe(
              data => {
                  this.router.navigate([this.returnUrl]);
              },
              error => {
                  this.alertService.error(error._body);
                  this.loading = false;
              });
  }


}
