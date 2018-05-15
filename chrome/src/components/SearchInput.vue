<template lang="pug">
  .field
    .control
      input.input.is-small(
      placeholder="検索",
      :value="currentValue",
      @input="handleInput($event.target.value)")
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'SearchInput',

  data() {
    return {
      currentValue: '',
    };
  },

  created() {
    this.$store.watch(
      state => state.keywords,
      keywords => {
        const value = keywords.join(' ');
        if (this.currentValue === value) return;
        this.setCurrentValue(value);
      },
      { deep: true }
    );
  },

  methods: {
    ...mapActions(['setKeywords']),

    handleInput(value) {
      this.setCurrentValue(value);
      this.setKeywords(value);
    },

    setCurrentValue(value) {
      if (value === this.currentValue) return;
      this.currentValue = value;
    },
  },
};
</script>
