<template lang="pug">
  #app
    nav-bar
    histories
</template>

<script>
import NavBar from './components/NavBar.vue';
import Histories from './components/Histories.vue';

export default {
  name: 'App',
  components: {
    NavBar,
    Histories,
  },
};
</script>

<style lang="scss">
@import '~bulma/sass/utilities/initial-variables';
@import '~bulma/sass/utilities/functions';

// リンクの色を変更
$blue: #005fc0;
$family-sans-serif: -apple-system, Segoe UI, Helvetica Neue,
  Hiragino Kaku Gothic ProN, 'メイリオ', meiryo, sans-serif;

// Breakpointsを無効にする
$widescreen-enabled: false;
$fullhd-enabled: false;

// navBarのスタイル変更
$navbar-background-color: $grey-darker;
$navbar-item-color: $white;

// inputのスタイル変更
$input-color: $black;
$input-background-color: $white;
$input-shadow: none;
$input-border-color: $white;
$input-hover-border-color: $white;
$input-focus-border-color: $grey-lighter;
$input-focus-box-shadow-size: none;

@import '~bulma/sass/utilities/derived-variables';
@import '~bulma/sass/utilities/mixins';
@import '~bulma/sass/utilities/controls';
@import '~bulma/sass/base/_all';
@import '~bulma/sass/layout/section';
@import '~bulma/sass/grid/columns';
@import '~bulma/sass/components/card';
@import '~bulma/sass/components/navbar';
@import '~bulma/sass/components/level';
@import '~bulma/sass/elements/container';
@import '~bulma/sass/elements/form';
@import '~bulma/sass/elements/tag';
@import '~bulma/sass/elements/title';
@import '~bulma/sass/elements/other';
</style>
