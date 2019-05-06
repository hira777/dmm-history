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
import { ROOT_KEY, HISTORIES_KEY } from '../config';
import HistoriesNav from './HistoriesNav.vue';
import Cards from './Cards.vue';

export default {
  name: 'Histories',

  components: { Cards, HistoriesNav },

  computed: {
    ...mapGetters(['items'])
  },

  created() {
    this.update();
    this.$store.watch(state => state.items, this.onUpdatedItems, {
      deep: true
    });
  },

  methods: {
    ...mapActions(['setItems']),

    onUpdatedItems(items) {
      const entity = {};

      entity[ROOT_KEY] = {};
      entity[ROOT_KEY][HISTORIES_KEY] = items;
      chrome.storage.local.set(entity);
    },

    update() {
      chrome.storage.local.get(ROOT_KEY, obj => {
        const items =
          obj[ROOT_KEY] && obj[ROOT_KEY][HISTORIES_KEY]
            ? obj[ROOT_KEY][HISTORIES_KEY]
            : [];

        if (items.length > 0) {
          this.setItems(items);
        }
      });
    }
  }
};
</script>
