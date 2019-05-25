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
import { mapState, mapGetters } from 'vuex';

export default {
  name: 'FHistoriesNav',

  computed: {
    ...mapState({
      // 作品1,作品2 => 作品1 作品2
      keywords: state => state.keywords.join(',').replace(',', ' ')
    }),
    ...mapGetters(['allItems', 'itemsExits', 'numberOfItems'])
  }
};
</script>
