<template lang="pug">
component(:is="layout")
</template>

<script>

import empty from "@/layouts/empty";
import main from "@/layouts/main";
export default {
  computed: {
    layout() { 
      return this.$route.meta.layout;
    },
  },
  components: {
    empty,
    main,
  },
};
</script>

<style lang="scss">
@import "~materialize-css/dist/css/materialize.min.css";
@import '@/assets/base.scss';

</style>
