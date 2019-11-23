import matchAllKeywords from '@/utils/matchAllKeywords';

export default {
  // 全ての商品履歴
  allItems: state => state.items,

  // 商品履歴が存在するかどうか
  itemsExits: state => state.items.length > 0,

  // 検索に該当した商品履歴
  searchedItems: (state, getters) => {
    if (!getters.keywordsExists) return undefined;

    return state.items.filter(({ title }) =>
      matchAllKeywords({
        keywords: state.keywords,
        target: title
      })
    );
  },

  // 表示させる商品履歴
  items: (state, getters) =>
    getters.searchedItems !== undefined
      ? getters.searchedItems
      : getters.allItems,

  // 表示させる商品履歴数
  numberOfItems: (state, getters) => getters.items.length,

  // 検索中のキーワードが存在するかどうか
  keywordsExists: state =>
    state.keywords[0] !== undefined && state.keywords[0] !== ''
};
