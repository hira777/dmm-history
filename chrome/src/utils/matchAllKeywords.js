/**
 * 全てのキーワードが検索対象に含まれているかどうか（and検索）
 * @param keywords {String[]} キーワード
 * @param target {String} 検索対象
 * @return {boolean}
 */
const matchAllKeywords = ({ keywords, target }) => {
  if (keywords === undefined || keywords.length === 0 || keywords[0] === '')
    return false;

  return keywords.every(keyword => {
    const re = new RegExp(`.*${keyword}.*`, 'i');
    return re.test(target);
  });
};

export default matchAllKeywords;
