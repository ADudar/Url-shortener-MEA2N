import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { HomeComponent } from './components/home/home.component';
import { AuthGuard } from './guards/auth.guard';
import { ChangeComponent } from './components/change/change.component';
import { DetailsComponent } from './components/details/details.component';

const routes: Routes = [
  { path: '',       component: LoginComponent  },
  { path: 'signup', component: SignupComponent },
  { path: 'login',  component: LoginComponent  },
  { path: 'home',   component: HomeComponent },
  { path: 'change/:_id', component: ChangeComponent },
  { path: 'details/:_id',   component: DetailsComponent }
  // ,   { path: ':id', redirectTo: 'api/:id' }
  ,  { path: '**',     component: LoginComponent  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
