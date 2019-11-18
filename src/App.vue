<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import { getToken } from '@/utils/token'

export default {
  name: 'App',

  mounted() {
    this.init()
  },

  methods: {
    async init() {
      const token = getToken()
      if (token) {
        await this.$store.dispatch('user/getUserInfo')
      }
    },
  },
}
</script>

<style lang="scss">
#app {
  height: 100%;
  background-color: rgb(245, 245, 245);
}

// 重设跳转进度条的颜色
#nprogress .bar {
  background: $primary !important;
}
</style>
