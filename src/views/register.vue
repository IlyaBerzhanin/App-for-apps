<template lang="pug">
form(
    @submit.prevent="submitHandler"
    class="col s12 form"
    )
    div(class="row")
        div(class="input-field col s12")       
            input(
                v-model.trim="username"
                id="username" type="text" 
                :class="{invalid: v$.username.$error}"
                )
            label(for="username") Username
        div(class="input-field col s12")       
            input(
                v-model.trim="email"
                id="email" type="text" 
                :class="{invalid: v$.email.$error}"
                )
            label(for="email") Email
        div(class="input-field col s12")       
            input(
                v-model.trim="password"
                id="password" type="password" 
                :class="{invalid: v$.password.$error}"
                )
            label(for="password") Password
    Subbutton(:buttonInfo="{title: submitButtonName, iconTitle: submitButtonIconName}")
</template>

<script>
import useVuelidate from "@vuelidate/core";
import { required, email, minLength } from "@vuelidate/validators";
import Subbutton from "@/components/small/Subbutton";

import firebaseActions from '@/store/firebaseActions'
import toastActions from '@/store/toastActions'

export default {
  components: {
    Subbutton,
  },

  setup() {
    return { v$: useVuelidate() };
  },

  data() {
    return {
      username: "",
      email: "",
      password: "",
      submitButtonName: 'register',
      submitButtonIconName: 'how_to_reg',
      successfulRegistrationMessage: 'Congrats, you have been successfully registrated at the platform!'
    };
  },

  validations() {
    return {
      username: { required, minLength: minLength(3) },
      email: { email, required },
      password: { required, minLength: minLength(5) },
    };
  },

  methods: {
    async submitHandler() {
      this.v$.$touch();
      if (this.v$.$error) {
        toastActions.showLogAndRegErrors(this.v$.$errors)
        return
      }
      
     await firebaseActions.registerUser(this.username, this.email, this.password, () => {this.$router.push({name: 'login'})})
     toastActions.showSuccessMessage(this.successfulRegistrationMessage)
    },
  },
};
</script>

<style lang="scss">
.form {
  display: flex;
  background-color: azure;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  border: 2px solid #d1c4e9;
  width: 30rem;
  margin: 12rem auto 0rem;
  padding: 5rem;

  &.row {
    height: 100%;
  }
}
</style>
