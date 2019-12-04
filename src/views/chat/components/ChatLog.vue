<template>
  <div
    id="component-chat-log"
    class="m-8"
    v-if="chatData"
  >
    <div
      v-for="(msg, index) in chatData.msg"
      :key="index"
    >
      <div
        class="flex items-start"
        :class="[{'flex-row-reverse' : msg.is_sent}]"
      >
        <vs-avatar
          size="40px"
          class="mx-0 flex-no-shrink"
          :class="msg.is_sent ? 'sm:ml-5 ml-3' : 'sm:mr-5 mr-3'"
          :src="setAvatar(msg.is_sent)"
        />

        <div
          class="msg break-words relative shadow-md rounded py-3 px-4 mb-2 rounded-lg max-w-sm"
          :class="{'bg-primary-gradient text-white': msg.is_sent,
           'border border-solid border-grey-light bg-white': !msg.is_sent}"
        >
          <span class="text-sm">{{ msg.msg }}</span>
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
    avatar: {
      type: String,
      required: true,
    },
  },

  computed: {
    chatData() {
      return this.$store.getters['chat/chatDataOfUser'](this.contactId)
    },
  },

  methods: {
    setAvatar(isSent) {
      if (isSent) {
        return `${this.$store.state.user.info.avatar_url}?imageView2/2/w/60`
      }
      return `${this.avatar}?imageView2/2/w/60`
    },
  },
}
</script>
