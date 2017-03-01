import { TestBed, async } from '@angular/core/testing';
import { UrlPipe } from './url.pipe';

describe('UrlPipe', () => {
  it('create an instance', () => {
    const pipe = new UrlPipe();
    expect(pipe).toBeTruthy();
  });

    it('should return correct value', () => {
    const pipe = new UrlPipe();
    const transformed = pipe.transform('qwerty');
    expect(transformed).toMatch('^http.+qwerty$');
});
