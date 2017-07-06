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

export const ROUTES: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'onboarding', component: OnboardingComponent, canActivate: [AuthGuard] },
    { path: 'about', component: AboutComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'onboarding-learner', component: LearnerOnboarding },
    { path: 'onboarding-workshop', component: WorkshopOnboardingComponent },
    { path: 'detail', loadChildren: './+detail#DetailModule' },
    { path: 'barrel', loadChildren: './+barrel#BarrelModule' },
    { path: '**', component: NoContentComponent }
];
