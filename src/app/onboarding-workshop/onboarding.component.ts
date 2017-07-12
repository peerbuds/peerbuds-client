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
import { FormGroup, FormArray, FormBuilder, FormControl, AbstractControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';

// import { Profile } from './interfaces/profile.interface';

@Component({
  selector: 'workshop-onboarding',
  // We need to tell Angular's Dependency Injection which providers are in our app.
  providers: [],
  // Our list of styles in our component. We may add more to compose many styles together
  styleUrls: ['./onboarding.component.scss'],
  // Every Angular template is first compiled by the browser before Angular runs it's compiler
  templateUrl: './onboarding.component.html'
})
export class WorkshopOnboardingComponent implements OnInit {
  // Set our default values
  public localState = { value: '' };
  public countries: any[];
  public languagesArray: any[];
  public placeholderStringTopic = 'Search for a topic or enter a new one';
  // public profile: Profile;
  public userId: string;
  public profile: FormGroup;
  public interest1: FormGroup;
  public workshop: FormGroup;
  public selectedTopic: FormGroup;
  public workshopId: string;
  public calendar: FormGroup;
  public key = 'access_token';

  public contentGroup: FormGroup;

  public difficulties = []

  public contentComplete = false;

  public step = 1;
  public max = 17;
  public learnerType_array = {
    learner_type: [{ id: 'auditory', display: 'Auditory' }
      , { id: 'visual', display: 'Visual' }
      , { id: 'read-write', display: 'Read & Write' }
      , { id: 'kinesthetic', display: 'Kinesthetic' }]
  };
  public selectedLanguages = [];

  public suggestedTopics = [];
  public interests = [];

  // TypeScript public modifiers
  constructor(
    public appState: AppState,
    public authenticationService: AuthenticationService,
    private http: Http, private config: AppConfig,
    private languagePickerService: LanguagePickerService,
    private _cookieService: CookieService,
    private _fb: FormBuilder,
    private countryPickerService: CountryPickerService,
  ) {
    this.getCookieValue('userId');
    this.countryPickerService.getCountries()
      .subscribe((countries) => this.countries = countries);
    this.languagePickerService.getLanguages()
      .subscribe((languages) => this.languagesArray = languages);
    // this.getProfile();
    this.getTopics();

  }

  public selected(event) {
    this.selectedLanguages = event;
  }

  public ngOnInit() {

    this.profile = new FormGroup({
      first_name: new FormControl(''),
      last_name: new FormControl(''),
      picture_url: new FormControl(''),
      headline: new FormControl(''),
      languages: new FormArray([
        new FormControl('')
      ]),
      location: new FormControl(''),
      experience_type: new FormControl(''),
      // learner_type: new FormControl(''),
      learner_type: new FormArray([]),
      // this.learnerType_array.learner_type.map(type => new FormControl(type))
      portfolio_url: new FormControl(''),
      is_teacher: new FormControl('false'),
      description: new FormControl(''),
      education: new FormControl(''),
      work_experience: new FormControl(''),
      custom_url: new FormControl(''),
      profile_video: new FormControl(''),
      // id: new FormControl(''),
    });

    this.interest1 = new FormGroup({

    });

    this.workshop = new FormGroup({
      languages: new FormControl(''),
      stage: new FormControl(''),
      title: new FormControl(''),
      headline: new FormControl(''),
      description: new FormControl(''),
      difficultyLevel: new FormControl(''),
      notes: new FormControl(''),
      maxSpots: new FormControl(''),
      imageUrls: this._fb.array([]),
      videoUrl: new FormControl('')
    });

    this.calendar = new FormGroup({
      startDate: new FormControl(''),
      endDate: new FormControl('')
    });

    this.selectedTopic = new FormGroup({});

    this.difficulties = ["Beginner", "Intermediate", "Advanced"];


    this.createWorkshop();
  }

  initAddress() {
    // initialize our address
    return this._fb.group({
      street: ['', Validators.required],
      postcode: ['']
    });
  }
  public workshopStepUpdate() {
    this.workshop.patchValue({
      "stage": this.step
    });
  }

  public imageUploaded(event) {
    let file = event.src;
    let fileName = event.file.name;
    let fileType = event.file.type;
    let formData = new FormData();

    formData.append('file', event.file);

    this.http.post(this.config.apiUrl + '/api/media/upload?container=peerbuds-dev1290', formData)
      .map((response: Response) => {
        let mediaResponse = response.json();
        this.profile.controls['picture_url'].setValue(mediaResponse.url);
      })
      .subscribe(); // data => console.log('response', data)
  }

  public addUrl(value: String) {
    const control = <FormArray>this.workshop.controls['imageUrls'];
    // push the value from stepTextArea to array
    control.push(new FormControl(value));
  }

  public workshopImageUploaded(event) {
    let file = event.src;
    let fileName = event.file.name;
    let fileType = event.file.type;
    let formData = new FormData();
    formData.append('file', event.file);
    this.http.post(this.config.apiUrl + '/api/media/upload?container=peerbuds-dev1290', formData)
      .map((response: Response) => {
        let mediaResponse = response.json();
        this.addUrl(mediaResponse.url);
      })
      .subscribe(); // data => console.log('response', data)
  }
  public workshopVideoUploaded(event) {
    let file = event.src;
    let fileName = event.file.name;
    let fileType = event.file.type;
    let formData = new FormData();
    formData.append('file', event.file);
    this.http.post(this.config.apiUrl + '/api/media/upload?container=peerbuds-dev1290', formData)
      .map((response: Response) => {
        let mediaResponse = response.json();
        this.profile.controls['videoUrl'].setValue(mediaResponse.url);
      })
      .subscribe(); // data => console.log('response', data)
  }


  public changeLearnerType(type: any) {
    let currentTypeControls: FormArray = this.profile.get('learner_type') as FormArray;
    let index = currentTypeControls.value.indexOf(type);
    if (index > -1) {
      currentTypeControls.removeAt(index);
    } else {
      currentTypeControls.push(new FormControl(type));
    } // Otherwise add this type.
  }

  public changeInterests(topic: any) {
    let index = this.interests.indexOf(topic);
    if (index > -1) {
      this.interests.splice(index, 1); // If the user currently uses this topic, remove it.
    } else {
      this.interests.push(topic); // Otherwise add this topic.
    }
  }

  // languages = this.profile._value.languages.split(',');
  public submitProfile(event) {
    let body = this.profile._value;
    let learner_Type;
    let languages;
    learner_Type = this.profile._value.learner_type.map((type) => type.id);
    // body.languages = languages;
    body.languages = this.selectedLanguages;
    body.learner_type = learner_Type;
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    let options = new RequestOptions({ headers: headers, withCredentials: true });
    if (this.step < 3) {
      this.http.patch(this.config.apiUrl + '/api/peers/' + this.userId + '/profile', body, options)
        .map((response: Response) => {
          this.step++;
          this.workshopStepUpdate()
        })
        .subscribe();
    }
  }



  /**
   * createWorkshop
   */
  public createWorkshop() {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    let options = new RequestOptions({ headers: headers, withCredentials: true });
    var body = {};
    this.http.post(this.config.apiUrl + '/api/peers/' + this.userId + '/collections', body, options)
      .map((response: Response) => {
        this.workshopId = response.json().id;
      })
      .subscribe();

  }

  public submitWorkshop(data) {
    var body = data.value;
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    let options = new RequestOptions({ headers: headers, withCredentials: true });
    this.http.patch(this.config.apiUrl + '/api/collections/' + this.workshopId, body, options)
      .map((response: Response) => {
        this.step++;
        this.workshopStepUpdate()
      })
      .subscribe();
  }


  public submitCalendar(data) {
    var body = data.value;
    console.log(body);
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    let options = new RequestOptions({ headers: headers, withCredentials: true });
    this.http.patch(this.config.apiUrl + '/api/collections/' + this.workshopId + '/calendar', body, options)
      .map((response: Response) => {
        this.step++;
        this.workshopStepUpdate()
      })
      .subscribe();
  }

  public submitInterests(interests) {
    let topicArray = [];
    this.interests.forEach((topic) => {
      /* this.http.put(this.config.apiUrl +  '/api/peers/'
          + this.userId + '/topics/rel/' + topic.id)
                .map((response: Response) => {} ).subscribe();*/
      topicArray.push(topic.id);
    });
    if (topicArray.length !== 0) {
      this.http.put(this.config.apiUrl + '/api/peers/' + this.userId
        + '/topics/rel/' + topicArray)
        .map((response: Response) => { }).subscribe();
    }
    this.step++;

  }

  private getCookieValue(key: string) {
    let cookieValue = this._cookieService.get(key).split(/[ \:.]+/);
    this.userId = cookieValue[1];
    return this.userId;
  }

  private getProfile() {
    let reqObject = { where: { userId: this.getCookieValue('userId') } };
    return this.http.get(this.config.apiUrl + '/api/profiles?filter='
      + encodeURIComponent(JSON.stringify(reqObject)))
      .map((response: Response) => {
        this.profile.controls['id'].setValue(response.json()[0].id);
      }).subscribe(); // data => console.log('response', data)
  }

  private getTopics() {
    return this.http.get(this.config.apiUrl + '/api/topics')
      .map((response: Response) => {
        this.suggestedTopics = response.json();
      }).subscribe(); // data => console.log('response', data)

  }

}
