<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',

  created() {
    this.$store.dispatch('getCategoryList')
    if (this.$login()) {
      this.$store.dispatch('user/getAddressList')
      this.$store.dispatch('user/getUserInfo')
    }
  },

  mounted() {
    window.addEventListener('offline', () => {
      this.$vs.notify({
        title: '网络不可用',
        text: '请检测您的网络配置(点击关闭)',
        icon: 'rss_feed',
        color: 'danger',
        position: 'top-left',
        fixed: true,
      })
    })
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
