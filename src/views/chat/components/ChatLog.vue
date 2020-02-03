<template>
  <div
    v-if="chatData"
    class="my-8 mx-4"
  >
    <div
      v-for="(msg, index) in chatData.msg"
      :key="index"
    >
      <div
        class="flex items-start"
        :class="[{'flex-row-reverse' : msg.is_sent}]"
      >
        <div
          class="msg break-words relative py-2 px-4 mb-2"
          :class="{'right bg-primary-gradient text-white': msg.is_sent,
           'left border border-solid border-grey-light bg-white': !msg.is_sent}"
        >
          <span class="text-sm break-words break-all">{{ msg.msg }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'ChatLog',
  props: {
    contactId: {
      type: String,
      required: true,
    },
  },

  computed: {
    chatData() {
      return this.$store.getters['chat/chatDataOfUser'](this.contactId)
    },
  },
}
</script>

<style lang="scss" scoped>
.msg {
  max-width: 18rem;
  &.left {
    border-radius: 1rem 1em 1rem 0.3rem;
  }
  &.right {
    border-radius: 1rem 1em 0.3rem 1rem;
    background: rgba(var(--vs-primary), 0.9);
  }
}
</style>
