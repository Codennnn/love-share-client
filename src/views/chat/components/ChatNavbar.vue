<template>
  <div
    class="px-4 py-3 flex items-center bg-white"
    style="box-shadow: 5px 0 10px 0 rgba(0,0,0,0.1)"
  >
    <i
      class="el-icon-d-arrow-right mr-4 text-xl text-gray-700 cursor-pointer"
      v-if="isSidebarCollapsed"
      @click.stop="$emit('openContactsSidebar')"
    ></i>
    <vs-avatar
      class="m-0"
      size="40px"
      :src="'https://avatars2.githubusercontent.com/u/31676496?s=460&v=4'"
    />
    <i
      class="el-icon-close ml-auto mr-2 text-2xl text-gray-700 cursor-pointer"
      @click.stop="$store.commit('chat/SET_CHAT_CLOSE')"
    ></i>
  </div>
</template>

<script>
export default {
  name: 'ChatNavbar',
  props: {
    userId: {
      type: String,
      required: true,
    },
    isPinnedProp: {
      type: Boolean,
      required: true,
    },
    isSidebarCollapsed: {
      type: Boolean,
      required: true,
    },
  },

}
</script>
