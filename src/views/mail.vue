<template lang="pug">
h1.messages-title incoming messages:
ul
    messageBlock(
        v-for="(message, name) in messages"
        :key="message.date"
        :messageData="{messageUid: name ,topic: message.topic, name: message.senderName, email: message.senderEmail, date: message.date, message: message.message}"
    )
</template>

<script>
import { mapGetters } from "vuex";
import messageBlock from "@/components/small/messageBlock";

export default {
  components: { messageBlock },
  data() {
    return {
      messages: null,
    };
  },
  computed: {
    ...mapGetters(["user"]),
  },

  created() {
    this.messages = this.user.data.messages
  },
};
</script>

<style lang="scss">
.messages-title {
  text-transform: uppercase;
  font-size: 2rem;
  margin-left: 4rem;
  color: burlywood;
}
</style>
