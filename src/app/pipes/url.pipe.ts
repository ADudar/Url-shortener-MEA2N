import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'url'
})
export class UrlPipe implements PipeTransform {

  transform(value: string, args?: any): string {
    return 'http://' + window.location.hostname + ':' + window.location.port + '/' + value;
  }
}
