import {
  Component,
  OnInit,
  Input
} from '@angular/core';
import { AuthenticationService, LanguagePickerService} from '../_services/index';
import { AppState } from '../app.service';
// import { XLargeDirective } from './x-large';
import { Http, URLSearchParams, Headers, Response, BaseRequestOptions, RequestOptions, RequestOptionsArgs } from '@angular/http';
import { AppConfig } from '../app.config';
import { CookieService } from 'angular2-cookie/core';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';

//import { Profile } from './interfaces/profile.interface';

@Component({
  selector: 'workshop',
  // We need to tell Angular's Dependency Injection which providers are in our app.
  providers: [],
  // Our list of styles in our component. We may add more to compose many styles together
  styleUrls: [ './workshop.component.scss' ],
  // Every Angular template is first compiled by the browser before Angular runs it's compiler
  templateUrl: './workshop.component.html'
})
export class WorkshopComponent implements OnInit {
 public step = 0;
 public workshop: FormGroup;
 public languages: any[];

 constructor(
    public appState: AppState,
    public authenticationService: AuthenticationService,
    private http: Http, private config: AppConfig,
    private languagePickerService: LanguagePickerService,
    private _cookieService: CookieService,
    private _fb: FormBuilder
    ) {
        this.languagePickerService.getLanguages().subscribe(languages => this.languages = languages);
        console.log("Languages: "+this.languages);
    }

 public ngOnInit(){
  this.workshop = this._fb.group({
    languages:[]
  })
 }

continueToStep(s){
  this.step=s;
}
 submitWorkshop(){
  console.log(this.workshop.value);
 }

}
