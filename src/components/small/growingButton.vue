<template lang="pug">
a(  
    class="growing-button"
    href="##"
) 
    i(class="material-icons button-icon") {{ buttonInfo.iconTitle }}
    span.button-title {{ buttonInfo.title }} 
</template>

<script>
export default {
     props: {
         buttonInfo: Object
        },
    data() {
       return {

       }
    },
}
</script>

<style lang="scss">
.growing-button {
    overflow: hidden;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-radius: 5px;
    transition: all 0.3s ease;
    color: black;

    & .button-icon {
        display: block;
        padding: 1rem;
        font-size: 2rem;
    }

     & .button-title {
        display: block;
        padding: 0rem;
        max-width: 0;
        transition: all 0.3s ease;
        font-size: 1.2rem;
    }

    &:hover {
        background-color: rgb(173, 252, 186);

        & .button-title {
            padding: 1rem;
            max-width: 6rem;
        }
    }
}
</style>