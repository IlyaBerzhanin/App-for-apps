<template lang="pug">
button(class="btn waves-effect waves-light deep-purple lighten-2 submit-button" type="submit" name="action") {{ buttonInfo.title }}
    i(class="material-icons right") {{ buttonInfo.iconTitle }}
</template>

<script>

export default {
    props: {
        buttonInfo: Object
    }
}
</script>

<style lang="scss">

.submit-button {
    width: 14rem;
    height: 3rem;
    margin-top: 3rem;
    transition: all 0.4s ease;
    
    &:hover {
        background-color: rgb(85, 247, 247) !important;
    }
}
</style>
