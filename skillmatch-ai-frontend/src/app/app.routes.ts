import { Routes } from '@angular/router';
import { LandingPageComponent } from './features/landing-page/landing-page.component';
import { RegistrationComponent } from './features/auth/registration/registration.component';
import { LoginComponent } from './features/auth/login/login.component';
import { JobSeekerLayoutComponent } from './layouts/job-seeker-layout/job-seeker-layout.component';
import { DashboardComponent } from './features/job-seeker/dashboard/dashboard.component';
import { MyJobsComponent } from './features/job-seeker/my-jobs/my-jobs.component';
import { CareerComponent } from './features/job-seeker/career/career.component';

export const routes: Routes = [
  { path: '', component: LandingPageComponent },
  { path: 'register', component: RegistrationComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'job-seeker',
    component: JobSeekerLayoutComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'jobs', component: MyJobsComponent },
      { path: 'career', component: CareerComponent },
      // Other job seeker routes will be added here
    ]
  },
  { path: '**', redirectTo: '' }
];
