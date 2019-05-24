<template lang="pug">
  .card.card-equal-height
    .card-image
      button.delete.card-delete-button(@click="handleDeleteClick(item.id)")
      figure.image
        a(:href="item.href", target="_blank")
          img(:src="item.imageUrl")

    .card-content
      p.card-content-title
        a(:href="item.href", target="_blank") {{ item.title }}
      p.card-content-price(:class="{ 'is-sale': isSale }") {{ price }}
        span.tag.is-danger(v-if="isSale") {{ percent }}%OFF
</template>

<script>
import isAfter from 'date-fns/is_after';

export default {
  name: 'Card',

  props: {
    item: {
      type: Object,
      default: () => {}
    },
    itemIndex: {
      type: Number,
      default: 0
    }
  },

  computed: {
    percent() {
      return this.isSale
        ? Math.floor((1 - this.item.salePrices[0] / this.item.prices[0]) * 100)
        : 0;
    },
    price() {
      const prices = this.isSale ? this.item.salePrices : this.item.prices;
      // 価格に3桁ずつカンマをつける
      const formattedPrices = prices.map(price => this.formatWithComma(price));
      const maxIndex = formattedPrices.length - 1;

      return formattedPrices.length > 1
        ? `¥${formattedPrices[0]}〜¥${formattedPrices[maxIndex]}`
        : `¥${formattedPrices[0]}`;
    },
    isSale() {
      return (
        this.item.salePrices &&
        this.item.saleLimitTime &&
        // 現在日時がセール期間を過ぎているかどうかをチェック
        !isAfter(new Date().toString(), this.item.saleLimitTime)
      );
    }
  },

  methods: {
    formatWithComma(number) {
      return number.toString().replace(/(\d)(?=(\d{3})+$)/g, '$1,');
    },
    handleDeleteClick(itemId) {
      this.$store.dispatch('removeItem', itemId);
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
