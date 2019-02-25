import { every } from 'lodash-es';

/**
 * 全てのキーワードが検索対象に含まれているかどうか（and検索）
 * @param keywords {Array} キーワード
 * @param target {String} 検索対象
 * @return {boolean}
 */
export const isExactMatch = ({ keywords, target }) =>
  keywords
    ? every(keywords, keyword => new RegExp(`.*${keyword}.*`, 'i').test(target))
    : false;
