<template lang="pug">
  #app
    nav-bar
    histories
</template>

<script>
import NavBar from '@/vue/components/NavBar.vue';
import Histories from '@/vue/components/Histories.vue';

export default {
  name: 'App',
  components: {
    NavBar,
    Histories
  }
};
</script>
