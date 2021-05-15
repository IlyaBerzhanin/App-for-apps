<template lang="pug">
.info-header
router-view
.app-overview-block
    p.overview-title Our application was estimated by {{ nubmerOfUsersFeedbacks }} users.
    StarRating(
        :rating="rating"
        :increment="0.1"
        :read-only="true"
        :star-size="70"
        :padding="10"
        text-class="rating-value"
    )
</template>

<script>import StarRating from "vue-star-rating";
import firebaseActions from "@/store/firebaseActions";

export default {
    components: {
        StarRating
    },

    data() {
        return {
            nubmerOfUsersFeedbacks: 0,
            rating: 0,
        }
    },

    async created() {
      this.ratingData = await firebaseActions.getAverageRating()
      this.rating = this.ratingData.rating
      this.nubmerOfUsersFeedbacks = this.ratingData.numberOfUsers
    }
}
</script>

<style lang="scss">
.info-header {
    position: absolute;
    background-color: cadetblue;
    width: 100%;
    height: 40vh;
    z-index: -1;
    top: 0;
}

.app-overview-block {
padding: 3rem;

    & .overview-title {
        padding: 2rem;
        font-size: 2rem;
        color: darkseagreen;
    }

    & .rating-value {
        color: rgb(131, 119, 207);
        font-size: 2rem;
        padding: 1rem;
        letter-spacing: 0.4rem;
    }
}

</style>