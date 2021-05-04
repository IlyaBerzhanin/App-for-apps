<template lang="pug">
.content
    Navigation
    router-view
</template>

<script>
import Navigation from "@/components/large/Navigation";
export default {
  components: {
    Navigation,
  },
};
</script>

<style lang="scss">
.scale-enter-active,
.scale-leave-active {
  transition: all 0.5s ease;
}


.scale-enter-from,
.scale-leave-to {
  opacity: 0;
  transform: scale(0.9);
}
</style>
