import {
  Component,
  OnInit
} from '@angular/core';
import { AuthenticationService } from '../_services/index';
import { AppState } from '../app.service';

@Component({
  // The selector is what angular internally uses
  // for `document.querySelectorAll(selector)` in our index.html
  // where, in this case, selector is the string 'home'
  selector: 'default',  // <home></home>
  // We need to tell Angular's Dependency Injection which providers are in our app.
  providers: [],
  // Our list of styles in our component. We may add more to compose many styles together
  styleUrls: [ './default.component.css' ],
  // Every Angular template is first compiled by the browser before Angular runs it's compiler
  templateUrl: './default.component.html'
})

export class DefaultComponent implements OnInit {
  // Set our default values
  public localState = { value: '' };
  public loggedIn = false;

  // TypeScript public modifiers
  constructor(
    public appState: AppState,
    public authenticationService: AuthenticationService
    ) {
      this.loggedIn = this.authenticationService.isLoggedIn();
    }

  public ngOnInit() {
  }

}
