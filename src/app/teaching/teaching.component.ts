import {
    Component,
    OnInit,
    Input
} from '@angular/core';
import {
    AuthenticationService, CountryPickerService
    , LanguagePickerService
} from '../_services/index';
import { AppState } from '../app.service';
import { XLargeDirective } from './x-large';
import {
    Http, URLSearchParams, Headers, Response, BaseRequestOptions
    , RequestOptions, RequestOptionsArgs
} from '@angular/http';
import { AppConfig } from '../app.config';
import { CookieService } from 'angular2-cookie/core';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';

@Component({
    selector: 'teaching',
    providers: [],
    templateUrl: 'teaching.component.html',
    styleUrls: ['teaching.component.scss']
})
export class TeachingComponent implements OnInit {
    public localState = { value: '' };
    public key = 'access_token';
    public max: number = 5;
    public rate: number = 4;
    public isReadonly: boolean = true;
    public teachingTab = "sessions";

    constructor(
        public appState: AppState,
        public authenticationService: AuthenticationService,
        private http: Http, private config: AppConfig,
        private countryPickerService: CountryPickerService,
        private languagePickerService: LanguagePickerService,
        private _cookieService: CookieService,
        private _fb: FormBuilder
    ) {

    }

    public ngOnInit() {
        
    }
    selectTab(tabName){
        this.teachingTab = tabName;
    }
}
