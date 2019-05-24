<template lang="pug">
  .columns.is-multiline
    .column(:class="[cardSize]" v-for="(item, itemIndex) in items", :key="itemIndex")
      card(:item="item", :itemIndex="itemIndex")
</template>

<script>
import Card from '@/vue/components/Card.vue';

export default {
  name: 'Cards',

  components: {
    Card
  },

  props: {
    items: {
      type: Array,
      default: () => []
    },
    cardSize: {
      type: String,
      default: ''
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
