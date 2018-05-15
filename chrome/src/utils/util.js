/**
 * 全てのキーワードが検索対象に含まれているかどうか（and検索）
 * @param keywords {Array} キーワード
 * @param target {String} 検索対象
 * @return {boolean}
 */
export const matchAllKeywordsFromTarget = ({ keywords, target }) => {
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

/**
 * 全てのキーワードが複数の検索対象に含まれているかどうか（and検索）
 * @param keywords {Array} キーワード
 * @param targets {Array} 複数の検索対象
 * @return {boolean}
 */
export const matchAllKeywordsFromTargets = ({ keywords, targets }) => {
  if (keywords === undefined || keywords.length === 0 || keywords[0] === '')
    return false;
  if (targets === undefined || targets.length === 0) return false;

  let matchCount = 0;

  for (let i = 0; i < keywords.length; i += 1) {
    for (let j = 0; j < targets.length; j += 1) {
      const re = new RegExp(keywords[i], 'i');

      if (re.test(targets[j])) {
        matchCount += 1;
        break;
      }
    }

    if (matchCount !== i + 1) break;
  }

  return matchCount === keywords.length;
};
