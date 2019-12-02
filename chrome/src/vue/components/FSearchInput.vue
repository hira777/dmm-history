<template lang="pug">
  input.input.is-small(
  :placeholder="placeholder",
  ref="input"
  :disabled="!itemsExits"
  :value="searchInput",
  @input="handleInput")
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { history } from '@/vue/store/modules/history';

@Component
export default class FSearchInput extends Vue {
  private searchInput = '';

  private history = history;

  get itemsExits(): boolean {
    return this.history.itemsExits;
  }

  get placeholder(): string {
    return this.itemsExits ? '検索' : '履歴が存在しません';
  }

  handleInput($event: InputEvent): void {
    this.searchInput = ($event.target as HTMLInputElement).value.replace(
      /\u3000/g,
      ' '
    );
    history.setKeywords(this.searchInput);
    this.setSearchInput();
  }

  setSearchInput(): void {
    const $input = this.$refs.input as HTMLInputElement;
    if ($input.value === this.searchInput) return;
    $input.value = this.searchInput;
  }
}
</script>

<style lang="scss" scoped>
.input {
  border-radius: 3px;
  height: 28px;

  &:disabled {
    background: #e9ecef;
  }
}
</style>
