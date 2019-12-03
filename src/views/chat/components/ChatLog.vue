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
        <template v-if="chatData.msg[index-1]">
          <template v-if="(!hasSentPreviousMsg(chatData.msg[index-1].is_sent,
          msg.is_sent) || !isSameDay(msg.time, chatData.msg[index-1].time))">
            <vs-avatar
              size="40px"
              class="mx-0 flex-no-shrink"
              :class="msg.is_sent ? 'sm:ml-5 ml-3' : 'sm:mr-5 mr-3'"
              :src="'https://avatars2.githubusercontent.com/u/31676496?s=460&v=4'"
            />
          </template>
        </template>

        <template v-if="index === 0">
          <vs-avatar
            size="40px"
            class="mx-0 flex-no-shrink"
            :class="msg.is_sent ? 'sm:ml-5 ml-3' : 'sm:mr-5 mr-3'"
            :src="`${$store.state.user.info.avatar_url}?imageView2/2/w/60`"
          />
        </template>

        <template v-if="chatData.msg[index-1]">
          <div
            style="margin-right: 3.75rem;"
            v-if="!(!hasSentPreviousMsg(chatData.msg[index-1].is_sent, msg.is_sent)
            || !isSameDay(msg.time, chatData.msg[index-1].time))"
          ></div>
        </template>

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
  },

  computed: {
    chatData() {
      return this.$store.getters['chat/chatDataOfUser'](this.contactId)
    },

    hasSentPreviousMsg() {
      return (lastSender, currentSender) => lastSender === currentSender
    },
  },

  methods: {
    isSameDay(timeTo, timeFrom) {
      const dateTimeTo = new Date(Date.parse(timeTo))
      const dateTimeFrom = new Date(Date.parse(timeFrom))
      return dateTimeTo.getFullYear() === dateTimeFrom.getFullYear()
                && dateTimeTo.getMonth() === dateTimeFrom.getMonth()
                && dateTimeTo.getDate() === dateTimeFrom.getDate()
    },
  },
}
</script>
