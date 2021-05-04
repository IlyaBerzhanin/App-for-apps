<template lang="pug">
h1 login page

form(
    @submit.prevent="submitHandler"
    class="col s12 form"
    )
    div(class="row")
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
    p(class="register-text") If haven't registered yet, baby go
      a(href="/register" class="register-link") here!
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
      email: "",
      password: "",
      submitButtonName: "Log In",
      submitButtonIconName: "login",
      loginMessage: 'You have been logged in!',
    };
  },

  validations() {
    return {
      email: { email, required },
      password: { required, minLength: minLength(3) },
    };
  },

  methods: {
    async submitHandler() {
      this.v$.$touch();
      if (this.v$.$error) {
        toastActions.showLogAndRegErrors(this.v$.$errors)
        return
      }

     await firebaseActions.loginUser(this.email, this.password, () => {this.$router.push("/")})
     toastActions.showSuccessMessage(this.loginMessage)
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
  margin: 0 auto;
  padding: 5rem;

  &.row {
    height: 100%;
  }

  .register-text {
    margin-top: 2rem;

    & .register-link {
      color: rgb(197, 58, 231);
      text-transform: uppercase;
      padding: 0.4rem;
      letter-spacing: 0.3rem;
      position: relative;
      transition: all 0.3s ease;

      &::after {
        content: "";
        position: absolute;
        display: block;
        left: 0;
        top: 100%;
        width: 0;
        height: 0.2rem;
        background-color: chartreuse;
        transition: all 0.3s ease;
      }

      &:hover {
        color: cyan;
        &::after {
          width: 100%;
        }
      }
    }
  }
}
</style>
