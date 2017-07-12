import { BrowserModule } from '@angular/platform-browser';
import { NgModel, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { CookieService } from 'angular2-cookie/services/cookies.service';

import {
  NgModule,
  ApplicationRef
} from '@angular/core';
import {
  removeNgStyles,
  createNewHosts,
  createInputTransfer
} from '@angularclass/hmr';
import {
  RouterModule,
  PreloadAllModules
} from '@angular/router';

import { ImageUploadModule } from 'angular2-image-upload';

/*
 * Platform and Environment providers/directives/pipes
 */
import { ENV_PROVIDERS } from './environment';
import { ROUTES } from './app.routes';
// App is our top level component
import { AppComponent } from './app.component';
import { APP_RESOLVER_PROVIDERS } from './app.resolver';
import { AppState, InternalStateType } from './app.service';
import { AppConfig } from './app.config';
import { AlertComponent } from './_directives/index';
import { AuthGuard } from './_guards/index';
import {
  AlertService
  , AuthenticationService
  , CountryPickerService
  , LanguagePickerService
} from './_services/index';

import { LoginComponent } from './login/index';
import { HomeComponent } from './home/index';
import { OnboardingComponent } from './onboarding/index';
import { AboutComponent } from './about/index';
import { RegisterComponent } from './register/index';
import { ProfileComponent } from './profile/index';
import { NoContentComponent } from './no-content/index';
import { XLargeDirective } from './home/x-large';
import { MultiselectAutocompleteModule } from './utilityComponent/multiselect-autocomplete/module';
import { LearnerOnboarding } from "./onboarding-learner/index";
import { WorkshopOnboardingComponent } from "./onboarding-workshop/index";
import { ProgressbarModule } from 'ngx-bootstrap';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { WorkshopContentComponent } from "./onboarding-workshop/workshop-content";
import '../styles/styles.scss';
import '../styles/headings.css';
import { InPersonContentsComponent } from "./onboarding-workshop/workshop-content/content-view/content-view.component";

import { ModalModule, RatingModule } from 'ngx-bootstrap';
// import { PerfectScrollbarModule, PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';

// Application wide providers
const APP_PROVIDERS = [
  ...APP_RESOLVER_PROVIDERS,
  AppState
];

type StoreType = {
  state: InternalStateType,
  restoreInputValues: () => void,
  disposeOldHosts: () => void
};
/* const PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};*/

/* let providers = {
    "google": {
      "clientId": "GOOGLE_CLIENT_ID"
    },
    "linkedin": {
      "clientId": "LINKEDIN_CLIENT_ID"
    },
    "facebook": {
      "clientId": "FACEBOOK_CLIENT_ID",
      "apiVersion": "v2.4"
    },
    "twitter": {
      "clientId": "twitter client id",
      "apiVersion": "v2.4"
    }
  };*/

/**
 * `AppModule` is the main entry point into Angular2's bootstrapping process
 */
@NgModule({
  bootstrap: [AppComponent],
  declarations: [
    AppComponent,
    AlertComponent,
    AboutComponent,
    LoginComponent,
    HomeComponent,
    OnboardingComponent,
    RegisterComponent,
    ProfileComponent,
    NoContentComponent,
    XLargeDirective,
    LearnerOnboarding,
    WorkshopOnboardingComponent,
    WorkshopContentComponent,
    InPersonContentsComponent
  ],
  imports: [ // import Angular's modules
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule.forRoot(ROUTES, { useHash: true, preloadingStrategy: PreloadAllModules }),
    ImageUploadModule.forRoot(),
    MultiselectAutocompleteModule,
    ProgressbarModule.forRoot(),
    ModalModule.forRoot(),
    RatingModule.forRoot(),
    TabsModule.forRoot()
  ],
  providers: [ // expose our Services and Providers into Angular's dependency injection
    ENV_PROVIDERS,
    APP_PROVIDERS,
    AppConfig,
    AuthGuard,
    AlertService,
    CookieService,
    AuthenticationService,
    CountryPickerService,
    LanguagePickerService
  ]
})
export class AppModule {

  constructor(
    public appRef: ApplicationRef,
    public appState: AppState
  ) { }

  public hmrOnInit(store: StoreType) {
    if (!store || !store.state) {
      return;
    }
    console.log('HMR store', JSON.stringify(store, null, 2));
    // set state
    this.appState._state = store.state;
    // set input values
    if ('restoreInputValues' in store) {
      let restoreInputValues = store.restoreInputValues;
      setTimeout(restoreInputValues);
    }

    this.appRef.tick();
    delete store.state;
    delete store.restoreInputValues;
  }

  public hmrOnDestroy(store: StoreType) {
    const cmpLocation = this.appRef.components.map((cmp) => cmp.location.nativeElement);
    // save state
    const state = this.appState._state;
    store.state = state;
    // recreate root elements
    store.disposeOldHosts = createNewHosts(cmpLocation);
    // save input values
    store.restoreInputValues = createInputTransfer();
    // remove styles
    removeNgStyles();
  }

  public hmrAfterDestroy(store: StoreType) {
    // display new elements
    store.disposeOldHosts();
    delete store.disposeOldHosts;
  }

}

// Angular2SocialLoginModule.loadProvidersScripts(providers);
