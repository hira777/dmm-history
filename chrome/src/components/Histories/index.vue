<template lang="pug">
  section.section
    #histories.container
      histories-nav
      cards(
      :items="items",
      :cardSize="'is-2'")
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import HistoriesNav from './Nav.vue';
import Cards from './Cards.vue';

export default {
  name: 'Histories',

  components: { Cards, HistoriesNav },

  computed: {
    ...mapGetters(['items']),
  },

  created() {
    this.initItems();
  },

  methods: {
    ...mapActions(['initItems']),
  },
};
</script>
