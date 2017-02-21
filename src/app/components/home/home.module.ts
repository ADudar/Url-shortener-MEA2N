import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { ChangeComponent } from '../change/change.component';
import { LinkFormComponent } from './links/link-form.component';
import { LinksComponent } from './links/links.component';
import { ClipboardModule } from 'ngx-clipboard';
import { Ng2PaginationModule } from 'ng2-pagination';
import { FormsModule } from '@angular/forms';
import { PipesModule } from '../../shared/pipes.module';

@NgModule({
  imports: [
    CommonModule,
    HomeRoutingModule,
    ClipboardModule,
    Ng2PaginationModule,
    FormsModule,
    PipesModule
  ],

  declarations: [
    HomeComponent,
    LinkFormComponent,
    LinksComponent,
    ChangeComponent
  ]
})
export class HomeModule { }
