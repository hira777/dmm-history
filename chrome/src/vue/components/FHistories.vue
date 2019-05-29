<template lang="pug">
  section.section
    #histories.container
      f-histories-nav
      f-cards(
      :items="items",
      :cardSize="'is-2'")
</template>

<script>
import { mapGetters } from 'vuex';

import FCards from '@/vue/components/FCards.vue';
import FHistoriesNav from '@/vue/components/FHistoriesNav.vue';

export default {
  name: 'FHistories',

  components: {
    FCards,
    FHistoriesNav
  },

  computed: {
    ...mapGetters(['allItems', 'items'])
  },

  watch: {
    allItems: {
      deep: true,
      handler(value) {
        this.$store.dispatch('save', { items: value });
      }
    }
  },

  created() {
    this.$store.dispatch('restore');
  }
};
</script>
