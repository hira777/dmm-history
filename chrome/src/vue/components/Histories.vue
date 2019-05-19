<template lang="pug">
  section.section
    #histories.container
      histories-nav
      cards(
      :items="items",
      :cardSize="'is-2'")
</template>

<script>
import HistoriesNav from '@/vue/components/HistoriesNav.vue';
import Cards from '@/vue/components/Cards.vue';

export default {
  name: 'Histories',

  components: { Cards, HistoriesNav },

  computed: {
    items() {
      return this.$store.getters.items;
    }
  },

  watch: {
    items: {
      deep: true,
      handler(value) {
        this.$store.dispatch('save', value);
      }
    }
  },

  created() {
    this.$store.dispatch('restore');
  }
};
</script>
