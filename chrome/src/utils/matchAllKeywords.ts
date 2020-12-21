interface Props {
  keywords: string;
  target: string;
}

/**
 * 全てのキーワードが検索対象に含まれているかどうか（and検索）
 * @param keywords キーワード
 * @param target 検索対象
 */
const matchAllKeywords = ({ keywords, target }: Props): boolean => {
  const keywordsSplit = keywords.split(' ').filter((keyword) => keyword !== '');

  if (
    keywordsSplit === undefined ||
    keywordsSplit.length === 0 ||
    keywordsSplit[0] === ''
  ) {
    return false;
  }

  return keywordsSplit.every((keyword) => {
    const re = new RegExp(`.*${keyword}.*`, 'i');
    return re.test(target);
  });
};

export default matchAllKeywords;
