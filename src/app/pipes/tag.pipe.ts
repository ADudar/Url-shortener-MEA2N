import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tags'
})
export class TagPipe implements PipeTransform {

  transform(tags: string[] | string, args?: string): string {
    if (Array.isArray(tags)) {
      return '#' + tags.join(' #');
    }
  }
}
