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

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

import { history } from '@/vue/store/modules/history';
import FSearchInput from '@/vue/components/FSearchInput.vue';

@Component({
  components: {
    FSearchInput
  }
})
export default class FNavBar extends Vue {
  private history = history;

  get numberOfItems(): number {
    return this.history.numberOfItems;
  }
}
</script>
