<template lang="pug">
  input.input.is-small(
  :placeholder="placeholder",
  ref="input"
  :disabled="!itemsExits"
  :value="searchInput",
  @input="handleInput")
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'FSearchInput',

  data() {
    return {
      searchInput: ''
    };
  },

  computed: {
    ...mapGetters(['itemsExits']),
    placeholder() {
      return this.itemsExits ? '検索' : '履歴が存在しません';
    }
  },

  methods: {
    handleInput($event) {
      this.searchInput = $event.target.value.replace(/\u3000/g, ' ');
      this.$store.dispatch('setKeywords', this.searchInput);
      this.setSearchInput();
    },
    setSearchInput() {
      if (this.$refs.input.value === this.searchInput) return;
      this.$refs.input.value = this.searchInput;
    }
  }
};
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
