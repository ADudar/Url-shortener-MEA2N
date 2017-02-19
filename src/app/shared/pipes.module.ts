import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UrlPipe } from '../pipes/url.pipe';
import { TagPipe } from '../pipes/tag.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [UrlPipe, TagPipe],
  exports: [
    UrlPipe, TagPipe
  ]
})
export class PipesModule { }
