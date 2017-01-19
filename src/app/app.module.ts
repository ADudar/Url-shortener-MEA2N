import 'rxjs/Rx';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, Http, BaseRequestOptions, Response, ResponseOptions, RequestMethod } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { AUTH_PROVIDERS } from 'angular2-jwt';
import { ClipboardModule } from 'ngx-clipboard';
// import { fakeBackendProvider } from './helpers/fake-backend';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { AuthenticationService } from './services/authentication.service';
import { UserService } from './services/user.service';
import { AuthGuard } from './guards/auth.guard';
import { ChangeComponent } from './components/change/change.component';
import { LinkService } from './services/link.service';
import { DetailsComponent } from './components/details/details.component';
import { LinksComponent } from './components/links/links.component';
import { LinkFormComponent } from './components/links/link-form.component';

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LoginComponent,
    HomeComponent,
    ChangeComponent,
    DetailsComponent,
    LinksComponent,
    LinkFormComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    ClipboardModule
  ],
  providers: [
    // AUTH_PROVIDERS
        MockBackend,
        BaseRequestOptions,
        AuthenticationService,
        UserService,
        LinkService
        // ,
        // AuthGuard,
        // {
        //     provide: Http,
        //     useFactory: fakeBackendProvider,
        //     deps: [MockBackend, BaseRequestOptions]
        // }
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
