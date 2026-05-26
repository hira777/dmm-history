import { describe, expect, it } from 'vitest';

import { normalizeKeywords } from './keyword';

describe('normalizeKeywords', () => {
  it('半角スペースで区切られたキーワードを配列に変換する', () => {
    expect(normalizeKeywords('foo bar baz')).toEqual(['foo', 'bar', 'baz']);
  });

  it('全角スペースを半角スペースと同じ区切りとして扱う', () => {
    expect(normalizeKeywords('foo　bar')).toEqual(['foo', 'bar']);
  });

  it('連続したスペースと空文字のキーワードを除外する', () => {
    expect(normalizeKeywords(' foo  bar　　baz ')).toEqual([
      'foo',
      'bar',
      'baz'
    ]);
  });
});
