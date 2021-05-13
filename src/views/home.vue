<template lang="pug">
template(v-if="user.loggedIn")
  h1(class="greeting") Welcome dear {{ user.data.displayName }} !
</template>

<script>

import { mapGetters } from "vuex";

export default {
  data() {
    return {};
  },

  computed: {
    ...mapGetters(["user"]),
  },

  created() {
    // let source = new EventSource("http://localhost:3000/");
    
    //  source.addEventListener('message', (e) => {
    //    console.log(e.data)
    //    source.close()
    //    })
    
  },
};
</script>

<style lang="scss">

.greeting {
  text-shadow: 6px 6px 0px rgba(175, 40, 40, 0.2);
  color: white;
  text-transform: capitalize;
  padding: 1rem;
}
</style>
