<template lang="pug">
  nav.navbar.is-transparent.is-fixed-top
    .container
      .navbar-brand
        .navbar-item.has-text-weight-bold DMM History
      .navbar-menu
        .navbar-start
          .navbar-item
            .field
              .control
                f-search-input
</template>

<script>
import { mapGetters } from 'vuex';

import FSearchInput from '@/vue/components/FSearchInput.vue';

export default {
  name: 'FNavBar',

  components: {
    FSearchInput
  },

  computed: {
    ...mapGetters(['numberOfItems'])
  }
};
</script>
