import {
  Module,
  VuexModule,
  Mutation,
  Action,
  getModule
} from 'vuex-module-decorators';

import store from '@/vue/store';
import types from '@/vue/store/mutation-types';
import { Histories } from '@/models/history';
import { KEYS } from '@/enums';
import matchAllKeywords from '@/utils/matchAllKeywords';
import chromeStorage from '@/utils/chromeStorage';

@Module({
  name: 'history',
  store: store,
  dynamic: true
})
export default class History extends VuexModule {
  private _items: Histories = [];
  private _keywords: string[] = [];

  /**
   * 全ての商品履歴
   */
  get allItems(): Histories {
    return this._items;
  }

  /**
   * 商品履歴が存在するかどうか
   */
  get itemsExits(): boolean {
    return this._items.length > 0;
  }

  /**
   * 検索に該当した商品履歴
   */
  get searchedItems(): Histories | undefined {
    if (!this.keywordsExists) return undefined;

    return this._items.filter(({ title }) =>
      matchAllKeywords({
        keywords: this._keywords,
        target: title
      })
    );
  }

  /**
   * 表示させる商品履歴
   */
  get items(): Histories {
    return this.searchedItems !== undefined
      ? this.searchedItems
      : this.allItems;
  }

  /**
   * 表示させる商品履歴数
   */
  get numberOfItems(): number {
    return this.items.length;
  }

  /**
   * 検索中のキーワード
   */
  get keywords(): string[] {
    return this._keywords;
  }

  /**
   * 検索中のキーワードが存在するかどうか
   */
  get keywordsExists(): boolean {
    return this._keywords[0] !== undefined && this._keywords[0] !== '';
  }

  @Action({ commit: types.SET_ITEMS })
  setItems(items: Histories): { items: Histories } {
    return { items };
  }

  @Action({ commit: types.SET_ITEMS })
  async restore(): Promise<{ items: Histories } | void> {
    const obj = await chromeStorage.get({ keys: KEYS.DMM_HISTORY });
    const items =
      obj[KEYS.DMM_HISTORY] && obj[KEYS.DMM_HISTORY][KEYS.HISTORIES]
        ? obj[KEYS.DMM_HISTORY][KEYS.HISTORIES]
        : [];

    if (items.length > 0) return { items };
  }

  @Action({ commit: types.REMOVE_ITEM })
  removeItem(itemId: string): { itemId: string } {
    return { itemId };
  }

  @Action({ commit: types.SET_KEYWORDS })
  setKeywords(keywords: string): { keywords: string[] } {
    const newKeywords = keywords.split(' ').filter(keyword => keyword !== '');
    return { keywords: newKeywords };
  }

  @Action({})
  save(items: Histories): void {
    const entity = {
      [KEYS.DMM_HISTORY]: {
        [KEYS.HISTORIES]: items
      }
    };

    chromeStorage.set({ obj: entity });
  }

  @Mutation
  [types.SET_ITEMS]({ items }: { items: Histories }): void {
    this._items = items;
  }

  @Mutation
  [types.REMOVE_ITEM]({ itemId }: { itemId: string }): void {
    this._items = this._items.filter(item => item.id !== itemId);
  }

  @Mutation
  [types.SET_KEYWORDS]({ keywords }: { keywords: string[] }): void {
    this._keywords = keywords;
  }
}

export const history = getModule(History);
