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
    selector: 'cancel-session',
    providers: [],
    templateUrl: 'cancel-session.component.html',
    styleUrls: ['cancel-session.component.scss']
})
export class CancelSessionComponent implements OnInit {
    public localState = { value: '' };
    public key = 'access_token';

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
}
