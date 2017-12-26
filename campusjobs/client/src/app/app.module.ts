import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import {RouterModule, Routes} from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import {ValidationService} from './service/validation.service';
import {AuthService} from './service/auth.service';
import { ControlmessagesComponent } from './components/controlmessages/controlmessages.component';
import {AuthGuard} from './guard/auth.guard';
import {FeedService} from './service/feed.service';
import { ProfileComponent } from './components/profile/profile.component';
import { JobsComponent } from './components/jobs/jobs.component';
import { MynetworkComponent } from './components/mynetwork/mynetwork.component';
import { MiniProfileComponent } from './components/mini-profile/mini-profile.component';
import { EducationComponent , EdicationContentDialog} from './components/edit/education/education.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatDialogModule} from '@angular/material';

const appRoutes : Routes = [
  {path : '', component : RegisterComponent},
  {path : 'login', component : LoginComponent},
  {path : 'home', component : HomeComponent, canActivate : [AuthGuard]},
  {path : 'profile', component : ProfileComponent, canActivate : [AuthGuard]}
]

@NgModule({
  exports:[
    MatDialogModule
  ],
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    HomeComponent,
    NavbarComponent,
    ControlmessagesComponent,
    ProfileComponent,
    JobsComponent,
    MynetworkComponent,
    MiniProfileComponent,
    EducationComponent,
    EdicationContentDialog
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [ValidationService,AuthService, AuthGuard, FeedService],
  bootstrap: [AppComponent],
  entryComponents: [EdicationContentDialog]
})
export class AppModule { }
