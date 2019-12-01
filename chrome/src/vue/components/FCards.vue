<template lang="pug">
  .columns.is-multiline
    .column(:class="[cardSize]" v-for="(item, itemIndex) in items", :key="itemIndex")
      f-card(:item="item", :itemIndex="itemIndex")
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

import { Histories } from '../../models/history';
import FCard from '@/vue/components/FCard.vue';

@Component({
  components: {
    FCard
  }
})
export default class FCards extends Vue {
  @Prop({ default: '' }) readonly cardSize!: string;

  @Prop({ default: [] }) readonly items!: Histories;
}
</script>

<style lang="scss" scoped>
.column {
  padding: 1rem 0.6rem 0.6rem 0.6rem;
}

.column.is-one-eighth {
  flex: none;
  width: 12.5%;
}
</style>
