import { Component, Input, OnInit } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import {
    Http, URLSearchParams, Headers, Response, BaseRequestOptions
    , RequestOptions, RequestOptionsArgs
} from '@angular/http';
import { AppConfig } from '../../app.config';
import {
    AuthenticationService, CountryPickerService
    , LanguagePickerService
} from '../../_services/index';


@Component({
    selector: 'workshop-content',
    // We need to tell Angular's Dependency Injection which providers are in our app.
    providers: [],
    // Every Angular template is first compiled by the browser before Angular runs it's compiler
    templateUrl: './workshop-content.component.html'
})

export class WorkshopContentComponent implements OnInit {
    @Input() workshopId: string;
    @Input() calendar: FormGroup;

    public content: FormGroup;
    public schedule: FormGroup;
    public

    constructor(
        public authenticationService: AuthenticationService,
        private http: Http, private config: AppConfig,
    ) {

    }

    public ngOnInit() {

    }

    /**
     * submitContent
     */
    public submitContent() {
        let body = this.content.value;
        let learner_Type;
        let languages;
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Accept', 'application/json');
        let options = new RequestOptions({ headers: headers, withCredentials: true });
        this.http.post(this.config.apiUrl + '/api/collection/' + this.workshopId + '/contents', body, options)
            .map((response: Response) => {
                console.log(response);
            })
            .subscribe();

    }

    /**
     * submitSchedule
     */
    public submitSchedule() {

    }


}