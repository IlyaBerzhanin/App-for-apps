<template lang="pug">
h1.apps-title available applications:
ul(
    class=" apps-block"
    )
    li(
        class="app-item"
        v-for="piece in appsData"
        :key="piece.name"
    )
        router-link(:to="piece.link")
            img(
                :src="piece.imageLink" :alt="piece.name"
                class="image-block")
            p.app-title {{ piece.name }}        
            p.app-description {{ piece.description }}
</template>

<script>
import generalAppInfo from "@/store/generalAppInfo";
export default {
  data() {
    return {};
  },

  computed: {
    appsData() {
      return [...generalAppInfo];
    },
  },
};
</script>

<style lang="scss">
.apps-title {
  text-transform: uppercase;
  color: burlywood;
  font-size: 3rem;
  padding: 3rem;
}

.apps-block {
  width: 100%;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  padding: 0rem 6rem 6rem !important;

  & .app-item {
    background-color: #7e8da0ce;
    width: 30%;
    padding-bottom: 2rem;
    transition: all 0.3s ease;
    border-radius: 1rem;

    & .image-block {
      width: 100%;
      height: 20vw;
    }

    & .app-title {
      font-size: 2rem;
      text-transform: uppercase;
      color: wheat;
      padding: 1rem;
    }

    & .app-description {
        font-size: 1.5rem;
        color: white;
        padding: 1rem;
    }

    &:hover {
        box-shadow: 0px 5px 47px 6px rgba(14, 33, 47, 0.86);
        transform: translateY(2rem);
    }
  }
}
</style>
