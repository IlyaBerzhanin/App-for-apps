<template lang="pug">
.user-rating-block
    h2.rating-title Estimate my app, please!
    StarRating(
    class="star-rating"
    :rating="rating"
    v-model:rating="rating"
    @update:rating ="setRating"
    :increment="0.5"
    :star-size="90"
    :padding="20"
    :glow="5"
    text-class="current-rating"
    )
    Subbutton(
        :buttonInfo="{title: submitButtonName, iconTitle: submitButtonIconName}"
        @click="sendMark"
        )
</template>

<script>
import StarRating from "vue-star-rating";
import Subbutton from '@/components/small/Subbutton'

import store from "@/store/index";
import { mapGetters } from "vuex";

import toastActions from '@/store/toastActions'
import firebaseActions from '@/store/firebaseActions'

export default {
  components: {
    StarRating,
    Subbutton
  },

  data() {
    return {
      rating: null,
      submitButtonName: "send a mark",
      submitButtonIconName: "grade",
      deliveryMessage: 'Your mark has been received, thanks!',
    };
  },

  created() {
      if(this.user.data.appRating) {
          this.rating = this.user.data.appRating
      }
  },

   computed: {
    ...mapGetters(["user"]),
  },

  methods: {

      setRating(rating) {
          store.dispatch('fetchUserAppRating', rating)
      },

   async sendMark() {
        await firebaseActions.addUserRating(this.user)
        toastActions.showSuccessMessage(this.deliveryMessage)
    }
  }
};
</script>


<style lang="scss">
.user-rating-block {
    background-color: rgba(57, 84, 136, 0.041);
    padding: 5rem;

    & .rating-title {
        letter-spacing: 2px;
        color: rgba(184, 135, 11, 0.589);
    }

    & .star-rating {
        margin-top: 2rem;
    }

    .current-rating {
        font-size: 4rem;
        color: darkorchid;
        margin-left: 3rem;
    }
}
</style>