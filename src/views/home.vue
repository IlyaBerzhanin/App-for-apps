<template lang="pug">
h1 home page
template(v-if="user.loggedIn")
  h1(class="greeting") Welcome dear {{ user.data.displayName }} !
h2.apps-title applications:
ul(
    class=" collapse-block"
    )
    li(
        v-for="piece in appsData"
        :key="piece.name"
    )
        div(           
            class=" app-title-block"
            ) 
            p.app-title {{ piece.name }}
            router-link(:to="piece.link")
              button(
                  class="btn  purple lighten-3 app-button"
                  type="submit"
                  name="action"
                    ) try it now
                  i(class="material-icons right") send
        div(class="blue lighten-4 app-description-block")
            p.app-description {{ piece.description }}
</template>

<script>
import generalAppInfo from "@/store/generalAppInfo";
import { mapGetters } from "vuex";

export default {
  data() {
    return {};
  },

  computed: {
    ...mapGetters(["user"]),

    appsData() {
      return [...generalAppInfo];
    },
  },

  created() {
    let source = new EventSource("http://localhost:3000/");
    
     source.addEventListener('message', (e) => {
       console.log(e.data)
       source.close()
       })
  },
};
</script>

<style lang="scss">
.apps-title {
  margin-top: 3rem;
  padding: 2rem;
}

.collapse-block {
  width: 70%;
  margin: 7rem auto 0rem;
}

.app-title-block {
  display: flex;
  justify-content: space-between;
  align-items: center;

  & .app-title {
    font-size: 2rem;
    text-transform: uppercase;
  }
}

.app-description {
  font-size: 1.5rem;
  text-transform: uppercase;
}
</style>
