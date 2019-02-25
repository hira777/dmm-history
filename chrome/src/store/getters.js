import { isExactMatch } from '../utils/util';

export default {
  /**
   * 全ての商品
   */
  allItems: state => state.items,

  /**
   * 検索に該当した商品
   */
  searchedItems: state =>
    state.keywords
      ? state.items.filter(item =>
          isExactMatch({
            keywords: state.keywords,
            target: item.title,
          })
        )
      : [],

  /**
   * 表示させる商品
   */
  items: (state, getters) =>
    getters.searchedItems ? getters.searchedItems : getters.allItems,

  /**
   * 表示させる商品数
   */
  numberOfItems: (state, getters) => getters.items.length,
};
