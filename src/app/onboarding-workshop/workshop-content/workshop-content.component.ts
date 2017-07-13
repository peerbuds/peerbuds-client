import { Component, Input, OnInit } from "@angular/core";
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { Customer } from './customer.interface';

import {
    Http, URLSearchParams, Headers, Response, BaseRequestOptions
    , RequestOptions, RequestOptionsArgs
} from '@angular/http';
import { AppConfig } from '../../app.config';
import { AuthenticationService } from '../../_services/index';


@Component({
    selector: 'workshop-content',
    // We need to tell Angular's Dependency Injection which providers are in our app.
    providers: [],
    // Every Angular template is first compiled by the browser before Angular runs it's compiler
    templateUrl: './workshop-content.component.html'
})

export class WorkshopContentComponent implements OnInit {
    public myForm: FormGroup;
    constructor(
        public authenticationService: AuthenticationService,
        private http: Http, private config: AppConfig,
        private _fb: FormBuilder
    ) {

    }

    ngOnInit() {
        this.myForm = this._fb.group({
            itenary: this._fb.array([
                this.initItenary(),
            ])
        });
    }
    initItenary() {
        return this._fb.group({
            date: [''],
            contents: this._fb.array([])
        });
    }

    addItenary() {
        const control = <FormArray>this.myForm.controls['itenary'];
        control.push(this.initItenary());
    }

    removeItenary(i: number) {
        const control = <FormArray>this.myForm.controls['itenary'];
        control.removeAt(i);
    }

    save(model: Customer) {
        // call API to save
        // ...
        console.log("Save Triggered");
    }

}