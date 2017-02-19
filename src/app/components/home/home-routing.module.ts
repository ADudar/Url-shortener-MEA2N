import { NgModule } from '@angular/core';
import { HomeComponent } from './home.component';
import { Routes, RouterModule } from '@angular/router';
import { ChangeComponent } from '../change/change.component';

const HOME_ROUTES: Routes = [
  { path: '', component: HomeComponent },
  { path: 'change/:_id', component: ChangeComponent }
];

@NgModule({
  imports: [RouterModule.forChild(HOME_ROUTES)],
  exports: [RouterModule],
  providers: []
})
export class HomeRoutingModule { }
