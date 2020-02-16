<template>
  <div
    class="px-4 py-3 flex items-center bg-white"
    style="height: 64px; box-shadow: 5px 0 10px 0 rgba(0,0,0,0.1)"
  >
    <i
      class="el-icon-d-arrow-right mr-4 text-xl cursor-pointer"
      v-if="isSidebarCollapsed"
      @click.stop="$emit('openContactsSidebar')"
    ></i>
    <div class="text-xl text-gray-600">{{ nickname }}</div>
    <i
      class="el-icon-close ml-auto mr-2 text-2xl cursor-pointer"
      @click.stop="$store.commit('chat/SET_CHAT_CLOSE')"
    ></i>
  </div>
</template>

<script>
export default {
  name: 'ChatNavbar',
  props: {
    nickname: {
      type: String,
      default: '',
    },
    isSidebarCollapsed: {
      type: Boolean,
      required: true,
    },
  },

}
</script>
