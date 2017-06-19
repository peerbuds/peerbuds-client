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
  styleUrls: ['./onboarding.component.scss'],
  // Every Angular template is first compiled by the browser before Angular runs it's compiler
  templateUrl: './onboarding.component.html',
})
export class OnboardingComponent implements OnInit {
  // Set our default values
  public localState = { value: '' };
  public progressBarSpan:number=0;
  public startExploringSection:boolean=false;

  // TypeScript public modifiers
  constructor(
    public appState: AppState,
    public authenticationService: AuthenticationService
  ) {
  }

  public ngOnInit() {
    this.setContentHeight();
  }

  GoToNext(step) {
    var prevStep = 1;
    var nextStep = step;
    if (step != 1) {
      prevStep = step - 1;
      this.progressBarSpan = 11.11 * prevStep;
    }
    var showClass = document.getElementById("step" + nextStep);
    var hideClass = document.getElementById("step" + prevStep);
    hideClass.classList.add("hide");
    showClass.classList.remove("hide");
  }

  /* function for change steps on click 'Next' button */
  checkChanged(chkNum){
    var rdGroup = document.getElementsByName("fp-radio[]");
    var checkCount = 0;
    for(var i=0; i < rdGroup.length; i++){
        var elem = <HTMLInputElement> rdGroup[i];
        checkCount += (elem.checked)?1:0;
        if(checkCount > 3){
          elem.checked=false;
        }
    }
  }

  /* function for set min height of content */

  setContentHeight(){
    var cont = document.getElementById("content");
    var h = window.innerHeight;
    var contH = (h - 86);
    cont.setAttribute("min-height", contH+"px");
  }

  /* function for show invite people to join section */
  
  startExploring(){
      this.startExploringSection = true;
  }

  public tags = ['Car', 'Bus', 'Train'];
  public autocompleteTags = [];
  public autocompleteItems = [
    'Banana',
    'Orange',
    'Apple',
    'Pear',
    'Grape',
    'Potato',
    'Peach'
  ];
}
