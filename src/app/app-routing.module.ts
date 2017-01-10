import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { HomeComponent } from './components/home/home.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '',       component: LoginComponent  },
  { path: 'login',  component: LoginComponent  },
  { path: 'signup', component: SignupComponent },
  { path: 'home',   component: HomeComponent
  // , canActivate : [AuthGuard]   
},
  { path: '**',     component: LoginComponent  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }