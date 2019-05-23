/**
 * 全てのキーワードが検索対象に含まれているかどうか（and検索）
 * @param keywords {Array} キーワード
 * @param target {String} 検索対象
 * @return {boolean}
 */
const matchAllKeywords = ({ keywords, target }) => {
  if (keywords === undefined || keywords.length === 0 || keywords[0] === '')
    return false;

  let matchCount = 0;

  for (let i = 0; i < keywords.length; i += 1) {
    const re = new RegExp(`.*${keywords[i]}.*`, 'i');
    if (re.test(target)) matchCount += 1;
    if (matchCount !== i + 1) break;
  }

  return matchCount === keywords.length;
};

export default matchAllKeywords;
