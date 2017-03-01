import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tags'
})
export class TagPipe implements PipeTransform {

  transform(tags: string[] | string, args?: string): string {
    if (Array.isArray(tags) ) {
      return '#' + tags.join(' #');
    }
    if ( typeof(tags) === 'string' ) {
      const arraysTags = tags.split(/[\-_#,\s]/).filter(tag => tag !== '');
      return  '#' + arraysTags.join(' #');
    }
  }
}
