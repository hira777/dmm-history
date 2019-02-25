<template lang="pug">
  .field
    .control
      input.input.is-small(
      placeholder="検索",
      @input="setKeywords($event.target.value)")
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'SearchInput',

  methods: {
    ...mapActions(['setKeywords']),
  },
};
</script>
