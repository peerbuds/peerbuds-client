import {
  Component,
  OnInit
} from '@angular/core';
import { AuthenticationService } from '../_services/index';
import { AppState } from '../app.service';
import { XLargeDirective } from './x-large';


@Component({
  selector: 'onboarding', 
  // We need to tell Angular's Dependency Injection which providers are in our app.
  providers: [],
  // Our list of styles in our component. We may add more to compose many styles together
  styleUrls: [ './onboarding.component.scss' ],
  // Every Angular template is first compiled by the browser before Angular runs it's compiler
  templateUrl: './onboarding.component.html'
})
export class OnboardingComponent implements OnInit {
  // Set our default values
  public localState = { value: '' };


  // TypeScript public modifiers
  constructor(
    public appState: AppState,
    public authenticationService: AuthenticationService
    ) {
    }

  public ngOnInit() {

  }


}
