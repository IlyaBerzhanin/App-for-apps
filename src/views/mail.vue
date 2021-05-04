<template lang="pug">
h1 mail brother
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

<style lang="scss"></style>
