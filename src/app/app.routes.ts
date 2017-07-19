import { Routes } from '@angular/router';
import { LoginComponent } from './login/index';
import { HomeComponent } from './home/index';
import { OnboardingComponent } from './onboarding/index';
import { AboutComponent } from './about/index';
import { RegisterComponent } from './register/index';
import { ProfileComponent } from './profile/index';
import { NoContentComponent } from './no-content';
import { AuthGuard } from './_guards/index';
import { LearnerOnboarding } from "./onboarding-learner/index";
import { WorkshopOnboardingComponent } from "./onboarding-workshop/index";

import { DataResolver } from './app.resolver';
import { ReviewAndPayComponent } from './review-and-pay/review-and-pay.component';
import { TeachingComponent } from "./teaching/teaching.component";
import { SessionsDetailsComponent } from './teaching/teaching-sessions/sessions-details.component';
import { CancelSessionComponent } from "./cancel-session/cancel-session.component";

export const ROUTES: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'onboarding', component: OnboardingComponent, canActivate: [AuthGuard] },
    { path: 'about', component: AboutComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'onboarding-learner', component: LearnerOnboarding },
    { path: 'onboarding-workshop', component: WorkshopOnboardingComponent },
    { path: 'profile', component: ProfileComponent },
    { path: 'review-and-pay', component: ReviewAndPayComponent },
    { path: 'teaching', component: TeachingComponent },
    { path: 'sessions-details', component: SessionsDetailsComponent },
    { path: 'cancel-session', component: CancelSessionComponent },
    { path: 'detail', loadChildren: './+detail#DetailModule' },
    { path: 'barrel', loadChildren: './+barrel#BarrelModule' },
    { path: '**', component: NoContentComponent }
];
