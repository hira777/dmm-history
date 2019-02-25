<template lang="pug">
  nav.level
    .level-left
      .level-item
        p.subtitle.is-5
          strong(v-show="!itemsExits") 履歴が存在しません
          strong(v-show="itemsExits && keywords === ''") {{ numberOfItems }} タイトル
          strong(v-show="itemsExits && keywords !== ''") 「{{ keywords }}」に対して{{ numberOfItems }} タイトルが見つかりました
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'HistoriesNav',

  computed: {
    ...mapGetters(['allItems', 'numberOfItems']),

    keywords() {
      // ["作品1", "作品2"] -> "作品1" "作品2"
      return this.$store.state.keywords.join(',').replace(',', ' ');
    },

    itemsExits() {
      return this.$store.state.items.length > 0;
    },
  },
};
</script>
