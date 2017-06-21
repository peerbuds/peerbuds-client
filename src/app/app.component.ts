/*
 * Angular 2 decorators and services
 */
import {
  Component,
  OnInit,
  ViewEncapsulation
} from '@angular/core';
import { AppState } from './app.service';
import { AuthenticationService } from './_services/index';

/*
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'app',
  encapsulation: ViewEncapsulation.None,
  styleUrls: [
    './app.component.css'
  ],
  template: `
  <header>
    <nav class="navbar navbar-default navbar-fixed-top">
      <div class="container">
        <div class="navbar-header">
          <a class="navbar-brand" href="#">Peerbuds</a>
        </div>
        <div id="navbar" class="navbar-collapse collapse">
          <ul class="nav navbar-nav">

          </ul>
          <ul class="nav navbar-nav navbar-right">
            <li><span style="float:right;margin-right:20px;margin-top:20px;"><a href="#" *ngIf="loggedIn" (click)="authenticationService.logout()">Logout</a></span></li>
            <li><a *ngIf="!loggedIn" routerLink="register">Sign Up</a></li>
            <li><a *ngIf="!loggedIn" routerLink="login">Login</a></li>
          </ul>
        </div><!--/.nav-collapse -->
      </div>
    </nav>
  </header>

    <main>
      <alert></alert>
      <router-outlet></router-outlet>
    </main>

  <footer class="footer">
    <div class="container">
      <a [href]="url">Contact Us</a>
    </div>
  </footer>
  `
})
export class AppComponent implements OnInit {
  public peerbudslogo = 'assets/img/favicon.ico';
  public name = 'Peerbuds';
  public url = 'https://peerbuds.com';
  public loggedIn = false;

  constructor(
    public appState: AppState,
    public authenticationService: AuthenticationService
  ) {
    this.loggedIn = this.authenticationService.isLoggedIn();
  }

  public ngOnInit() {
    console.log('Initial App State', this.appState.state);
  }

}

/*
 * Please review the https://github.com/AngularClass/angular2-examples/ repo for
 * more angular app examples that you may copy/paste
 * (The examples may not be updated as quickly. Please open an issue on github for us to update it)
 * For help or questions please contact us at @AngularClass on twitter
 * or our chat on Slack at https://AngularClass.com/slack-join
 */
