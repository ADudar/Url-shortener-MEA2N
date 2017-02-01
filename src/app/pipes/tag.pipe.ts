import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tags'
})
export class TagPipe implements PipeTransform {

  transform(tags: string[] | string, args?: any): string {
    if (Array.isArray(tags))
      return '#' + tags.join(' #');
    else {
      var tagsArray = tags.split(/[' ,']/).filter(v => v != '');
      tags = "";
      tagsArray.forEach(tag => {
        tags += "#" + tag + " ";
      });
      return tags;
    }
  }
}
