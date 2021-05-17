<template lang="pug">
li(    
    class="message-block"
) 
        a(href="##").message-block-item
            p.message-topic(
                @click="isActiveBlock = !isActiveBlock, isCheckedBlock = true"
                :class="{'checked-block': isCheckedBlock}"
            ) {{ messageData.topic }}
              growingButton(
                @click="removeMessage"
                :buttonInfo="{title: growingButtonTitle, iconTitle: growingButtonIconTitle}"
                )
            .message(
                :class="{'active-block': isActiveBlock}"
            )
              p.message-sub-heading.author-name author: 
                  span.message-data {{ messageData.name}}
              p.message-sub-heading.author-email from: 
                  span.message-data {{ messageData.email }}
              p.message-sub-heading.post-date date: 
                  span.message-data {{ messageData.date }}
              p.message-sub-heading.message-itself message: 
                  span.message-data {{ messageData.message }}
              router-link(:to="{name: 'sendacard', params: {topic: messageData.topic, email: messageData.email}}")
                Subbutton(
                :buttonInfo="{title: submitButtonName, iconTitle: submitButtonIconName}"
              )
</template>

<script>
import { mapGetters } from "vuex";
import firebase from "firebase/app";

import Subbutton from "@/components/small/Subbutton";
import growingButton from "@/components/small/growingButton";

export default {
  components: {
    Subbutton,
    growingButton,
  },

  props: {
    messageData: Object,
  },

  data() {
    return {
      isActiveBlock: false,
      isCheckedBlock: false,

      growingButtonTitle: "delete",
      growingButtonIconTitle: "delete",

      submitButtonName: "reply",
      submitButtonIconName: "mail",
    };
  },

  computed: {
    ...mapGetters(["user"]),
  },

  methods: {
   async removeMessage() {
    await firebase.database().ref('users').child(this.user.data.uid).child("messages").child(this.messageData.messageUid).remove()
    this.$el.parentNode.removeChild(this.$el)
    }
  }
};
</script>

<style lang="scss">

.message-block {
  border-bottom: 2px solid rgb(171, 197, 53);

  &-item {
    color: black;
    overflow: hidden;

    & .message-topic {
      display: flex;
      justify-content: space-between;
      background-color: #5f5f8c12;
      font-size: 2rem;
      text-transform: capitalize;
      padding: 1rem;
      transition: all 0.3s ease;

      &:hover {
        background-color: rgb(206, 222, 223);
      }
    }

    & .message {
      background-color: rgb(233, 229, 221);
      padding: 0rem;
      color: whitesmoke;
      transition: all 0.3s ease;
      max-height: 0;
      overflow: hidden;

      &-sub-heading {
        padding: 0.5rem;
        font-size: 1.5rem;
        text-transform: uppercase;
        color: rgb(167, 60, 177);

        & .message-data {
          color: rgb(49, 11, 11);
          text-transform: none;
        }
      }
    }
  }

  .active-block {
    max-height: 23rem;
    opacity: 1;
    padding: 2rem;
  }

  .checked-block {
    background-color: rgb(174, 177, 177);
  }
}
</style>
