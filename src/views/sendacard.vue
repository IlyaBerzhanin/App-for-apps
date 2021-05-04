<template lang="pug">
.send-content
  .envelope-container(:class="{'active-and-opened': isLetterReady}")
        .envelope
          form.letter
            label(class="letter-field-block") Topic:
                input(
                  type="text"
                  id="topic"
                  v-model.trim="receiver.theMessage.topic"
                  ref="topic"
                  )
            label(
              class="letter-field-block"
              ) Receiver email:
                input(
                  type="email" 
                  id="email"
                  v-model.trim="receiver.email"
                  ref="email"
                  )
            label(class="letter-field-block") 
                p Message: {{ messageCurrentLength }} / {{ messageMaxLength }}
                textarea(rows="5"
                id="message"
                  :maxlength="messageMaxLength" 
                  class="message" 
                  v-model.trim="receiver.theMessage.currentMessage")
            Subbutton(
              @click.prevent="sendTheMessage"
              :buttonInfo="{title: submitButtonName, iconTitle: submitButtonIconName}"
              class="sub-button"
              )
        .opened-part
transition(name="fade")
  .modal-background(
    v-if="isLetterReady"
  )
    .actions-modal
      p.actions-proposal choose one of the following actions:
      router-link(
        v-for="item in modalInfo"
        :key="item.name"
        :to="{name: item.linkName}"
      )
        Subbutton(
          :buttonInfo="{title: item.name, iconTitle: item.iconName}"
          class="action-button"
          @click="reportOnDeliveryAndRestartForm"
        )
</template>

<script>
import Subbutton from "@/components/small/Subbutton";

import useVuelidate from "@vuelidate/core";
import { required, email } from "@vuelidate/validators";

import firebaseActions from '@/store/firebaseActions'
import { mapGetters } from "vuex";
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
      messageMaxLength: 120,
      isLetterReady: false,

      submitButtonName: "send",
      submitButtonIconName: "send",

      deliveryMessage: 'Your message has been delivered!',

      receiver: {
        email: "",
        theMessage: {
          topic: "",
          currentMessage: "",
        },
      },

      modalInfo: [
        { name: "send again", iconName: "send", linkName: 'sendacard' },
        { name: "go home", iconName: "home", linkName: 'home' },
        { name: "go to mail", iconName: "mail", linkName: 'mail' },
      ],
    };
  },

  validations: {
   receiver: {
     email: { email, required },
     theMessage: {
       topic: { required },
       currentMessage: { required }
     }
   }
  },

  computed: {
    ...mapGetters(["user"]),

    messageCurrentLength() {
      return this.receiver.theMessage.currentMessage.length;
    },
  },

  methods: {

    sendTheMessage() {
      this.v$.$touch();
      if (this.v$.$error) {
        toastActions.showErrorMessage('Please, check the fields')
        return
      }
      firebaseActions.sendTheMessage(this.receiver, this.user, () => {this.isLetterReady = true})
    },

    reportOnDeliveryAndRestartForm() {
      toastActions.showSuccessMessage(this.deliveryMessage)
      this.isLetterReady = false
    },
    
  },

  mounted() {
    if (Object.keys(this.$route.params).length > 0) {
      this.$refs.topic.value = this.$route.params.topic;
      this.$refs.email.value = this.$route.params.email;

      this.receiver.email = this.$route.params.email;
      this.receiver.theMessage.topic = this.$route.params.topic;
    }
  },
};
</script>

<style lang="scss">
.send-content {
  width: 100%;
  overflow: hidden;
  height: 100vh;
  position: relative;
}

.envelope-container {
  position: relative;
  width: fit-content;
  height: fit-content;
  margin-top: 35vh;
  margin-left: 70%;
  transition: 0.6s ease all;
}

@keyframes close-envelope {
  100% {
    transform: rotateX(0deg);
    z-index: 10000;
  }
}

@keyframes send-envelope {
  50% {
    transform: perspective(800px) rotateY(-15deg) translateX(-20rem)
      translateY(-5rem) rotateX(10deg) scale(2);
  }

  100% {
    transform: perspective(800px) rotateY(-15deg) translateX(400rem)
      translateY(-5rem) rotateX(10deg) scale(2);
  }
}

.active-and-opened {
  transform: perspective(800px) rotateY(-15deg) translateY(-5rem) rotateX(10deg)
    scale(2);
  animation: send-envelope 1.5s ease 2.5s forwards;

  & .envelope {
    & .letter {
      animation: ready-letter 1.5s linear forwards;
    }
  }

  & .opened-part {
    transform: rotateX(180deg);
    z-index: 0;
    animation: close-envelope 1s ease 1.5s forwards;
  }
}

.envelope {
  background: #ca336d;
  width: 10rem;
  height: 8rem;
  position: relative;
  transition: 0.6s ease all;
  box-shadow: 1px 1px 0 1px #bd4d85, -1px 0 28px 0 rgba(34, 33, 81, 0.01),
    28px 28px 28px 0 rgba(34, 33, 81, 0.25);
  z-index: 1;

  &::before,
  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    display: block;
  }

  &::before {
    right: 0;
    border-bottom: 0px solid transparent;
    border-top: 8rem solid transparent;
    border-right: 10rem solid #dc447f;
    z-index: 2;
  }

  &::after {
    left: 0;
    border-bottom: 0px solid transparent;
    border-top: 8rem solid transparent;
    border-left: 10rem solid #ea4c89;
    z-index: 1;
  }
}

.opened-part {
  border-right: 5rem solid transparent;
  border-top: 4rem solid #ce3871;
  border-left: 5rem solid transparent;
  position: absolute;
  z-index: 9999;
  left: 0;
  top: 0;
  transform-origin: 0% 0%;
  transition: all 0.5s ease;
}

@keyframes ready-letter {
  25% {
    transform: rotate(90deg) scale(0.2);
    top: -350%;
    left: -30vw;
    z-index: 2;
  }

  50% {
    transform: rotate(90deg) scale(0.2);
    top: -320%;
    left: -100%;
    z-index: 2;
  }

  75% {
    transform: rotate(90deg) scale(0.2);
    top: -250%;
    left: -100%;
    z-index: 1;
  }

  100% {
    transform: rotate(90deg) scale(0.2);
    top: -200%;
    left: -100%;
    z-index: 1;
  }
}

.letter {
  top: -215%;
  left: -60vw;
  position: absolute;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  background: #fffdee;
  border: 10px solid transparent;
  z-index: 1;
  border-image: 10
    repeating-linear-gradient(
      135deg,
      #c42061,
      #c42061 10px,
      transparent 10px,
      transparent 20px,
      #fbcfdf 20px,
      #fbcfdf 30px,
      transparent 30px,
      #9c268400 40px
    );

  & .letter-field-block {
    padding: 1rem;
    font-size: 1.5rem;

    & .message {
      height: 10rem;
      border: 0.3rem solid rgb(107, 107, 173);
      outline: none;
      transition: all 0.7s ease;
      border-radius: 5px;
      resize: none;
      margin-top: 1rem;
      font-size: 1.4rem;
      width: 25rem;

      &:focus {
        border: 0.3rem dashed greenyellow;
      }
    }
  }

  & .sub-button {
    align-self: center;
  }
}

@keyframes modal-open {
  
}

.modal-background {
  background-color: rgba(43, 44, 44, 0.808);
  width: 100%;
  height: 100vh;
  position: absolute;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 20000;

  & .actions-modal {
    box-shadow: 0 0 10px #ffffff, 0 0 40px #ffffff, 0 0 80px #ffffff;
    background-color: #ffffff;
    border-radius: 1rem;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    width: fit-content;
    padding: 5rem;

    & .actions-proposal {
      font-size: 1.5rem;
      text-transform: uppercase;
      letter-spacing: .1rem;
    }
  }
}

.fade-enter-active {
  transition: opacity 0.5s ease;
  transition-delay: 4s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
