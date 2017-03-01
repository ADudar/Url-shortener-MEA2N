import { TestBed, async } from '@angular/core/testing';
import { TagPipe } from './tag.pipe';

describe('TagPipe', () => {
  it('create an instance', () => {
    const pipe = new TagPipe();
    expect(pipe).toBeTruthy();
  });

    it('process array of tags correct', () => {
    const pipe = new TagPipe();
    const tags = ['first', 'second', 'third', 'tag'];
    const transformed = pipe.transform(tags);
    expect(transformed).toEqual('#first #second #third #tag');
  });

      it('process string of tags correct', () => {
    const pipe = new TagPipe();
    const tags = 'first second third tag';
    const transformed = pipe.transform(tags);
    expect(transformed).toEqual('#first #second #third #tag');
  });

});


