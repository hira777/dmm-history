import matchAllKeywords from '@/utils/matchAllKeywords';

describe('matchAllKeywords', () => {
  const target = '新 センズリ見てたら興奮しちゃった素人娘 VOL.16';
  it('キーワードが一致する', () => {
    expect(matchAllKeywords({ keywords: ['素人'], target })).toBe(true);
    expect(matchAllKeywords({ keywords: ['素人', 'センズリ'], target })).toBe(
      true
    );
  });

  it('キーワードが一致しない', () => {
    expect(matchAllKeywords({ keywords: [], target })).toBe(false);
    expect(matchAllKeywords({ keywords: ['手コキ'], target })).toBe(false);
    expect(matchAllKeywords({ keywords: ['素人', '手コキ'], target })).toBe(
      false
    );
  });
});
