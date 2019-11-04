<template>
  <div class="px-4 py-3 flex items-center bg-white">
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
  </div>
</template>

<script>

export default {
  name: 'chat-navbar',
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

  data: () => ({
  }),

}
</script>

<style lang="scss" scoped>
</style>
