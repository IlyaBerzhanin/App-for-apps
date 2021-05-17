<template lang="pug">
nav(class="navbar deep-purple lighten-3")
    .nav-wrapper
        ul(class='nav-links')
          li(v-for="link in links" :key="link.name" class="nav-link")
            router-link(
              :to='{name: link.name}'
              class="link-anchor"
              ) {{ link.name }}
          li(class="nav-link")
            a(
              @click.prevent="logout"
              class="link-anchor"
            ) Log Out

</template>

<script>

import store from "@/store/index";
import toastActions from "@/store/toastActions";

export default {
  data() {
    return {
      logoutMessage: "You have been logged out!",
      links: [
        { name: "apps", adress: "/apps" },
        { name: "home", adress: "/home" },
        { name: "mail", adress: "/mail" },
      ],
    };
  },

  methods: {
    async logout() {
      await store.dispatch("logoutUser");
      this.$router.push("/login");
      toastActions.showSuccessMessage(this.logoutMessage);
    },
  },
};
</script>

<style lang="scss">
@import "@/assets/mixins.scss";

.router-link-active {
  background-color: rgb(255, 255, 255);
  color: darksalmon;
}

.navbar {
  @include flex(row, space-around, center);
  height: 9rem;

  & .nav-wrapper {
    width: 100%;

    & .nav-links {
      width: 100%;
      height: 100%;
      @include flex(row, space-around, center);

      & .nav-link {
        padding: 5rem;
        letter-spacing: 0.3rem;

        & .link-anchor {
          border-radius: 0.5rem;
          text-transform: uppercase;
          font-size: 1.5rem;
        }

        &:hover {
          & .link-anchor {
            background-color: rgb(255, 255, 255);
            color: darksalmon;
          }
        }
      }
    }
  }
}
</style>
