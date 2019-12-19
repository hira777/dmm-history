<template lang="pug">
  nav.level
    .level-left
      .level-item
        p.subtitle.is-5
          strong(v-show="!itemsExits") 履歴が存在しません
          strong(v-show="itemsExits && keywords === ''") {{ numberOfItems }} タイトル
          strong(v-show="itemsExits && keywords !== ''") 「{{ keywords }}」に対して{{ numberOfItems }} タイトルが見つかりました
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

import { Histories } from "@/models/history";
import { history } from "@/vue/store/modules/history";

@Component
export default class FHistoriesNav extends Vue {
  private history = history;

  get allItems(): Histories {
    return this.history.allItems;
  }

  get itemsExits(): boolean {
    return this.history.itemsExits;
  }

  get numberOfItems(): number {
    return this.history.numberOfItems;
  }

  get keywords(): string {
    return this.history.keywords.join(",").replace(",", " ");
  }
}
</script>
