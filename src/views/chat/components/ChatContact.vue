<template>
  <div
    class="chat__contact flex items-center px-2 py-3"
    :class="{'bg-primary-gradient shadow-lg': isActiveChatUser}"
  >
    <div class="mr-3 flex items-center">
      <vs-avatar
        :src="`${contact.avatar_url}?imageView2/2/w/60`"
        size="42px"
      ></vs-avatar>
    </div>
    <div class="w-full flex items-center justify-between overflow-hidden">
      <div class="contact__info flex flex-col truncate w-5/6">
        <div
          class="text-base"
          :class="{'text-white': isActiveChatUser, 'text-gray-700': !isActiveChatUser}"
        >{{ contact.nickname }}</div>
        <span
          class="truncate text-sm"
          :class="{'text-white': isActiveChatUser, 'text-gray-500': !isActiveChatUser}"
        >{{ lastMessaged.msg || '' }}</span>
      </div>

      <span
        class="whitespace-no-wrap text-xs"
        :class="{'text-white': isActiveChatUser, 'text-gray-600': !isActiveChatUser}"
      >{{ $dayjs(lastMessaged.time).format('YYYY-MM-DD') || '' }}</span>
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
      type: Object,
      default: () => ({}),
    },
    isActiveChatUser: {
      type: Boolean,
    },
  },
}
</script>
