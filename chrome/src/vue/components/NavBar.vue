<template lang="pug">
  nav.navbar.is-transparent.is-fixed-top
    .container
      .navbar-brand
        .navbar-item.has-text-weight-bold DMM History
        .navbar-item.is-expanded.is-hidden-desktop
          .field.is-grouped.is-fullwidth
            .control.is-grow-1
              search-input
      .navbar-menu
        .navbar-start
          .navbar-item
            .field.is-grouped.is-fullwidth
              .control.is-grow-1
                search-input
</template>

<script>
import { mapGetters } from 'vuex';
import SearchInput from '@/vue/components/SearchInput.vue';

export default {
  name: 'NavBar',

  components: {
    SearchInput
  },

  computed: {
    ...mapGetters(['numberOfItems'])
  }
};
</script>

<style lang="scss">
.navbar {
  box-shadow: none;
}

.is-fullwidth {
  width: 100%;
}

.is-flex {
  display: flex;
}

.is-align-items-center {
  align-items: center;
}

.is-grow-1 {
  flex-grow: 1;
}
</style>
