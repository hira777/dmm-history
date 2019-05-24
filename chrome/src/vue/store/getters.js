import matchAllKeywords from '@/utils/matchAllKeywords';

export default {
  // 全ての商品
  allItems: state => state.items,

  // 検索に該当した商品
  searchedItems: (state, getters) => {
    if (!getters.keywordsExists) return undefined;

    return state.items.filter(({ title }) =>
      matchAllKeywords({
        keywords: state.keywords,
        target: title
      })
    );
  },

  // 表示させる商品
  items: (state, getters) =>
    getters.searchedItems !== undefined
      ? getters.searchedItems
      : getters.allItems,

  // 表示させる商品数
  numberOfItems: (state, getters) => getters.items.length,

  // 検索中のキーワードが存在するかどうか
  keywordsExists: state =>
    state.keywords[0] !== undefined && state.keywords[0] !== ''
};
