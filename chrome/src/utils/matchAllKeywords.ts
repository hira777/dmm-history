interface Props {
  keywords: string[];
  target: string;
}

/**
 * 全てのキーワードが検索対象に含まれているかどうか（and検索）
 * @param keywords キーワード
 * @param target 検索対象
 */
const matchAllKeywords = ({ keywords, target }: Props): boolean => {
  if (keywords === undefined || keywords.length === 0 || keywords[0] === '')
    return false;

  return keywords.every(keyword => {
    const re = new RegExp(`.*${keyword}.*`, 'i');
    return re.test(target);
  });
};

export default matchAllKeywords;
