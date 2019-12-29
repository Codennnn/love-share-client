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
