<template lang="pug">
  section.section
    #histories.container
      f-histories-nav
      f-cards(
       :items="items",
       :cardSize="'is-2'")
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator';

import { Histories } from '@/models/history';
import { history } from '@/vue/store/modules/history';
import FCards from '@/vue/components/FCards.vue';
import FHistoriesNav from '@/vue/components/FHistoriesNav.vue';

@Component({
  components: {
    FCards,
    FHistoriesNav
  }
})
export default class FHistories extends Vue {
  private history = history;

  get items(): Histories {
    return this.history.items;
  }

  get allItems(): Histories {
    return this.history.allItems;
  }

  @Watch('allItems', { deep: true })
  onAllItemsChanged(value: Histories): void {
    history.save(value);
  }

  created(): void {
    history.restore();
  }
}
</script>
