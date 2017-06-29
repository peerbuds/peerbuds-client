import {
  Component,
  OnInit,
  Input
} from '@angular/core';
import { AuthenticationService, CountryPickerService, LanguagePickerService} from '../_services/index';
import { AppState } from '../app.service';
import { XLargeDirective } from './x-large';
import { Http, URLSearchParams, Headers, Response, BaseRequestOptions, RequestOptions, RequestOptionsArgs } from '@angular/http';
import { AppConfig } from '../app.config';
import { CookieService } from 'angular2-cookie/core';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';

//import { Profile } from './interfaces/profile.interface';

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
  public countries: any[];
  public languages: any[];
  //public profile: Profile;
  public userId : string;
  public profile: FormGroup;
  public interest1: FormGroup;

  public key = 'access_token';

  public step = 1;
  public learner_type_array =  {
    learner_type: [{id: 'auditory', display: 'Auditory'}
                  , {id: 'visual', display: 'Visual'}
                  , {id: 'read-write', display: 'Read & Write'}
                  , {id: 'kinesthetic', display: 'Kinesthetic'}
  };

  public suggested_topics = [];
  public interests = [];

  getCookieValue(key: string){
    let cookieValue = this._cookieService.get(key).split(/[ \:.]+/);
    this.userId = cookieValue[1]
    return this.userId;
  }

  getProfile()
  {

    let reqObject = {
                    "where" : {
                                "userId" : this.getCookieValue('userId')
                              }
                    }
    return this.http.get(this.config.apiUrl + '/api/profiles?filter=' + encodeURIComponent(JSON.stringify(reqObject)))
    //return this.http.get(this.config.apiUrl + '/api/profiles?filter=%7B%22where%22%3A%7B%22userId%22%3A%2291c434e3-10fc-4f0e-afb5-ff1b90bdd841%22%7D%7D&access_token=a43affa6-5d03-4135-81f4-72229436b686')
                .map((response: Response) => {
                  console.log(response.json());
                  this.profile.controls['id'].setValue(response.json()[0].id);
                }).subscribe(data => console.log('response', data));
  }

  getTopics()
  {
    return this.http.get(this.config.searchUrl + '/api/search/topics')
                    .map((response: Response) => {
                      this.suggested_topics = response.json();
                    }).subscribe(data => console.log('response', data));

  }

  // TypeScript public modifiers
  constructor(
    public appState: AppState,
    public authenticationService: AuthenticationService,
    private http: Http, private config: AppConfig,
    private countryPickerService: CountryPickerService,
    private languagePickerService: LanguagePickerService,
    private _cookieService: CookieService,
    private _fb: FormBuilder
    ) {
        this.countryPickerService.getCountries().subscribe(countries => this.countries = countries);
        this.languagePickerService.getLanguages().subscribe(languages => this.languages = languages);

        this.getProfile();
        this.getTopics();

    }

  public ngOnInit() {

    this.profile = new FormGroup({
      first_name: new FormControl(''),
      last_name: new FormControl(''),
      picture_url: new FormControl(''),
      headline: new FormControl(''),
      languages: new FormControl(''),
      location: new FormControl(''),
      experience_type: new FormControl(''),
      //learner_type: new FormControl(''),
      learner_type: new FormArray([]), //this.learner_type_array.learner_type.map(type => new FormControl(type))
      portfolio_url: new FormControl(''),
      is_teacher: new FormControl('false'),
      description: new FormControl(''),
      education: new FormControl(''),
      work_experience: new FormControl(''),
      custom_url: new FormControl(''),
      profile_video: new FormControl(''),
      id: new FormControl(''),
    });

    this.interest1 = new FormGroup({

    });

  }

  /*public readUrl(input) {
    console.log("Upload clicked");
    if (input.files && input.files[0]) {
          var reader = new FileReader();
          reader.onload = function (e) {
              //$('#blah').attr('src', e.target.result);
          }
          reader.readAsDataURL(input.files[0]);
      }
  }*/

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
        .subscribe(data => console.log('response', data));
    }

    /*public function upload() {
      const files: FileList = this.fileInput.nativeElement.files;
      if (files.length === 0) {
        return;
      };
      console.log(files[0]);
      const formData = new FormData();
      formData.append(files[0].name, files[0]);

      console.log(files)

      this.http
        .post(this.config.apiUrl + '/api/media/upload?container=peerbuds-dev1290', formData)
        .subscribe();

  }*/

  public changeLearnerType(type: any) {
    var currentTypeControls: FormArray = this.profile.get('learner_type') as FormArray;
    var index = currentTypeControls.value.indexOf(type);
    if(index > -1) currentTypeControls.removeAt(index) //If the user currently uses this type, remove it.
    else currentTypeControls.push(new FormControl(type)); //Otherwise add this type.
  }

  public changeInterests(topic: any) {
  debugger;
    var index = this.interests.indexOf(topic);
    if(index > -1) this.interests.splice(index,1); //If the user currently uses this topic, remove it.
    else this.interests.push(topic); //Otherwise add this topic.
  }

  public submitProfile(event)
  {
    //console.log(this.profile);
    let body = this.profile._value;
    let learner_type, languages;
    learner_type = this.profile._value.learner_type.map(type=>type.id);
    languages = this.profile._value.languages.split(',');
    body.languages = languages;
    body.learner_type = learner_type;
    console.log(body);
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    let options = new RequestOptions({ headers: headers, withCredentials: true });
    if(this.step <5)
      this.http.patch(this.config.apiUrl + '/api/peers/' + this.userId + '/profile', body, options)
          .map((response: Response) => {
              //console.log(response.json());
              this.step++;
          })
          .subscribe();
  }

  public submitInterests(interests)
  {
    this.interests.forEach((topic) =>
    {
      console.log(topic);
      this.http.put(this.config.apiUrl +  '/api/peers/' + this.userId + '/topics/rel/' + topic.id)
                .map((response: Response) =>{}).subscribe();
    });
    this.step++;

  }

}
