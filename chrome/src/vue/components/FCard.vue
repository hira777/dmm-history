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
  name: 'FCard',

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
.card {
  box-shadow: none;
  padding-bottom: 10px;
  border-bottom: 1px solid rgba(10, 10, 10, 0.1);

  &.card-equal-height {
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  .card-image {
    position: relative;
    .image {
      img {
        object-fit: contain;
        display: block;

        &:hover {
          opacity: 0.8;
        }
      }
    }
  }

  .card-delete-button {
    position: absolute;
    z-index: 2;
    top: -10px;
    right: -7px;
  }

  .card-content {
    padding: 5px;
    .card-content-title {
      overflow: hidden;
      height: 2.1rem;
      font-size: 12px;
      font-weight: normal;
      line-height: 1.1rem;
      a {
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
      }
      &:not(:last-child) {
        margin-bottom: 0.6rem;
      }
    }
    .card-content-price {
      font-size: 12px;
      font-weight: bold;
      color: #2d2d2d;

      &.is-sale {
        color: #c00;
      }
    }
    .tag:not(body) {
      font-size: 10px;
      padding-left: 0.3em;
      padding-right: 0.3em;
      margin-left: 0.3em;
      height: 1.5em;
      background: #c00;
    }
  }
}
</style>