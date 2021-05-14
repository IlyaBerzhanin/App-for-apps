<template lang="pug">
.info-header
router-view
.app-overview-block
    p.overview-title Our application was estimated by {{ nubmerOfUsersFeedbacks }} users.
    p.overview-subtitle Our current rating is: {{ rating }}
    StarRating
</template>

<script>import StarRating from "vue-star-rating";

export default {
    components: {
        StarRating
    },

    data() {
        return {
            nubmerOfUsersFeedbacks: 0,
            rating: 0,
        }
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
background-color: chartreuse;
}

</style>