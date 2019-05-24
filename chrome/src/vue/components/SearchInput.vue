<template lang="pug">
  .field
    .control
      input.input.is-small(
      placeholder="検索",
      ref="input"
      :value="searchInput",
      @input="handleInput")
</template>

<script>
export default {
  name: 'SearchInput',

  data() {
    return {
      searchInput: ''
    };
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
