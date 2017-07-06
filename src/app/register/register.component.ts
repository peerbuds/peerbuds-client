import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute  } from '@angular/router';

import { AlertService, AuthenticationService } from '../_services/index';

@Component({

    templateUrl: 'register.component.html'
})

export class RegisterComponent {
    public model: any = {};
    public loading = false;
    public returnUrl: string;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        public authenticationService: AuthenticationService,
        private alertService: AlertService) { }

    public ngOnInit() {
      // reset login status
      // get return url from route parameters or default to '/'
      this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/learner-onboarding';
    }

    public register() {
        this.loading = true;
        this.authenticationService.register(this.model.username
            , this.model.password, this.model.email, this.returnUrl)
            .subscribe(
                (data) => {
                    console.log(this.returnUrl);
                    //this.router.navigate([this.returnUrl]);
                },
                (error) => {
                    this.alertService.error(error._body);
                    this.loading = false;
                });
    }

    public submit() {
      form.submit();
    }
}
