<template>
  <div
    class="chat__contact flex items-center px-2 py-3"
    :class="{'bg-primary-gradient text-white shadow-lg': isActiveChatUser}"
  >
    <div class="mr-3">
      <vs-avatar
        :src="'https://avatars2.githubusercontent.com/u/31676496?s=460&v=4'"
        size="42px"
      ></vs-avatar>
    </div>
    <div class="w-full flex items-center justify-between overflow-hidden">
      <div class="contact__info flex flex-col truncate w-5/6">
        <h5
          class="font-semibold"
          :class="{'text-white': isActiveChatUser}"
        >{{ contact.nickname }}</h5>
        <span class="truncate">{{ 'contact.about' }}</span>
      </div>

      <span class="whitespace-no-wrap text-sm">{{ '2019-12-11' }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'chat-contact',
  props: {
    contact: {
      type: Object,
      required: true,
    },
    lastMessaged: {
      type: String,
      default: '',
    },
    unseenMsg: {
      type: Number,
      default: 0,
    },
    isActiveChatUser: {
      type: Boolean,
    },
  },
}
</script>
