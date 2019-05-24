<template lang="pug">
  section.section
    #histories.container
      histories-nav
      cards(
      :items="items",
      :cardSize="'is-2'")
</template>

<script>
import { mapGetters } from 'vuex';

import HistoriesNav from '@/vue/components/HistoriesNav.vue';
import Cards from '@/vue/components/Cards.vue';

export default {
  name: 'Histories',

  components: {
    Cards,
    HistoriesNav
  },

  computed: {
    ...mapGetters(['items', 'allItems'])
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
